<?php

namespace apiAuth\application\actions;

use apiAuth\core\services\user\UserServiceInterface;
use apiUtilisateur\core\services\user\UsersServiceInterface;
use Exception;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Respect\Validation\Validator;
use Slim\Exception\HttpBadRequestException;

class DeleteUserByIdAction extends AbstractAction
{
    private UserServiceInterface $userService;

    public function __construct(UserServiceInterface $serviceUtilisateur)
    {
        $this->userService = $serviceUtilisateur;
    }

    public function __invoke(ServerRequestInterface $rq, ResponseInterface $rs, array $args): ResponseInterface
    {
        $id = $args['id'];

        if (!isset($id)) {
            throw new HttpBadRequestException($rq, "L'identifiant de l'utilisateur est obligatoire.");
        }

        if (!(Validator::uuid()->validate($id))) {
            throw new HttpBadRequestException($rq, "L'identifiant de l'utilisateur n'est pas valide.");
        }

        try {
            $this->userService->deleteUser($id);
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