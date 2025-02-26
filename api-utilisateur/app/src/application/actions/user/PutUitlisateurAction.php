<?php

namespace apiUtilisateur\application\actions\user;

use apiUtilisateur\application\actions\AbstractAction;
use apiUtilisateur\core\dto\user\InputUserDTO;
use apiUtilisateur\core\services\user\UsersServiceInterface;
use Exception;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Slim\Exception\HttpBadRequestException;

class PutUitlisateurAction extends AbstractAction
{
    private UsersServiceInterface $utilisateurService;

    public function __construct(UsersServiceInterface $serviceUtilisateur)
    {
        $this->utilisateurService = $serviceUtilisateur;
    }

    public function __invoke(ServerRequestInterface $rq, ResponseInterface $rs, array $args): ResponseInterface
{
    $params = [];
    
    // Handle multipart form data
    $uploadedFiles = $rq->getUploadedFiles();
    $body = $rq->getParsedBody();

    // Get form fields
    $params['name'] = $body['name'] ?? null;
    $params['surname'] = $body['surname'] ?? null;
    $params['pseudo'] = $body['pseudo'] ?? null;
    
    // Validate required fields
    if(!isset($params['name'])) {
        throw new HttpBadRequestException($rq, "Le nom est obligatoire.");
    }
    if (!isset($params['surname'])) {
        throw new HttpBadRequestException($rq, "Le prénom est obligatoire.");
    }
    if (!isset($params['pseudo'])) {
        throw new HttpBadRequestException($rq, "Le pseudo est obligatoire.");
    }

    $fileNameNew = "default.jpg";

    // Handle image upload if present
    if (isset($uploadedFiles['image'])) {
        $uploadedFile = $uploadedFiles['image'];
        if ($uploadedFile->getError() === UPLOAD_ERR_OK) {
            $fileType = $uploadedFile->getClientMediaType();
            
            $allowed = ['image/jpg', 'image/jpeg', 'image/png'];
            
            if(in_array($fileType, $allowed)) {
                $dir = __DIR__ . '/../../../../public/assets/';

                $extension = pathinfo($uploadedFile->getClientFilename(), PATHINFO_EXTENSION);
                $fileNameNew = uniqid('', true) . '.' . $extension;
                $uploadedFile->moveTo($dir . $fileNameNew);
            } else {
                throw new HttpBadRequestException($rq, "Le type de fichier d'image n'est pas autorisé.");
            }
        }
    }

    $id = $rq->getAttribute('idUser');
    
    $inputDTO = new InputUserDTO($id, $params['name'], $params['surname'], $fileNameNew, $params['pseudo']);

    try {
        $this->utilisateurService->update($inputDTO);
    } catch (Exception $e) {
        throw new HttpBadRequestException($rq, $e->getMessage());
    }

    return $rs->withHeader('Content-Type', 'application/json')->withStatus(201);
}
}