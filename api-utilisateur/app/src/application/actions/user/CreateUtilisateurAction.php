<?php

namespace apiUtilisateur\application\actions\user;

use apiUtilisateur\application\actions\AbstractAction;
use apiUtilisateur\core\dto\user\InputUserDTO;
use apiUtilisateur\core\services\user\UsersServiceInterface;
use Exception;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Slim\Exception\HttpBadRequestException;

class CreateUtilisateurAction extends AbstractAction
{
    private UsersServiceInterface $utilisateurService;

    public function __construct(UsersServiceInterface $serviceUtilisateur)
    {
        $this->utilisateurService = $serviceUtilisateur;
    }

    /**
     * @throws Exception
     */
    public function __invoke(ServerRequestInterface $rq, ResponseInterface $rs, array $args): ResponseInterface
    {
        $params = $rq->getParsedBody() ?? null;

        $fileNameNew = null;

        if (isset($_FILES['image']) || $_FILES['image']['size'] != 0 || $_FILES['image']['type'] != "") {
            $file = $_FILES['image'];
            $fileName = $file['name'];
            $fileTmpName = $file['tmp_name'];
            $fileSize = $file['size'];
            $fileError = $file['error'];
            $fileType = $file['type'];

            $allowed = ['image/jpg', 'image/jpeg', 'image/png'];

            if(in_array($fileType, $allowed)){
                //générer un nom unique pour l'image
                $fileNameNew = uniqid('', true).".".explode("/",$fileType)[1];
                $fileDestination = './assets/'.$fileNameNew;
                move_uploaded_file($fileTmpName, $fileDestination);
            }else{
                throw new HttpBadRequestException($rq, "Le type de fichier n'est pas autorisé.");
            }
        }

        try{
            $this->utilisateurService->save(new InputUserDTO($params['id'],$params['name'],$params['surname'],$params['linkpic'], $params['pseudo']));
        }catch (Exception $e){
            throw new HttpBadRequestException($rq, $e->getMessage());
        }
        return $rs->withStatus(201);
    }
}