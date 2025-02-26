<?php

namespace apiUtilisateur\application\actions\user;

use apiUtilisateur\application\actions\AbstractAction;
use apiUtilisateur\core\services\user\UsersServiceInterface;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

class GetUsersAction extends AbstractAction
{
    private UsersServiceInterface $utilisateurService;

    public function __construct(UsersServiceInterface $serviceUtilisateur)
    {
        $this->utilisateurService = $serviceUtilisateur;
    }

    public function __invoke(ServerRequestInterface $rq, ResponseInterface $rs, array $args): ResponseInterface
    {
        $users = $this->utilisateurService->getUsers();

        $res = [
            'type' => 'ressource',
            'users' => $users
        ];

        $rs->getBody()->write(json_encode($res));
        return $rs->withStatus(200)->withHeader('Content-Type', 'application/json');
    }
}