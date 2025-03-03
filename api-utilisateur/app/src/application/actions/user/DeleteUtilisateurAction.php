<?php

namespace apiUtilisateur\application\actions\user;

use apiUtilisateur\application\actions\AbstractAction;
use apiUtilisateur\core\services\user\UsersServiceInterface;
use Exception;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Respect\Validation\Validator;
use Slim\Exception\HttpBadRequestException;

class DeleteUtilisateurAction extends AbstractAction
{
    private UsersServiceInterface $utilisateurService;

    public function __construct(UsersServiceInterface $serviceUtilisateur)
    {
        $this->utilisateurService = $serviceUtilisateur;
    }

    public function __invoke(ServerRequestInterface $rq, ResponseInterface $rs, array $args): ResponseInterface
    {
        $id = $args['ID-USER'];
        $role = $rq->getAttribute('role');



        if (!isset($id)) {
            throw new HttpBadRequestException($rq, "L'identifiant de l'utilisateur est obligatoire.");
        }

        if (!(Validator::uuid()->validate($id))) {
            throw new HttpBadRequestException($rq, "L'identifiant de l'utilisateur n'est pas valide.");
        }

        try {
            $this->utilisateurService->deleteUser($id);
            if ($role == 100) {
                $this->utilisateurService->changeToJohnDoe($id);
            }
        }catch (Exception $e) {
            throw new HttpBadRequestException($rq, $e->getMessage());
        }

        $res = [
            'type' => 'ressource',
            'message' => 'Utilisateur supprimé'
        ];



        $rs->getBody()->write(json_encode($res));
        return $rs->withStatus(200)->withHeader('Content-Type', 'application/json');

    }
}