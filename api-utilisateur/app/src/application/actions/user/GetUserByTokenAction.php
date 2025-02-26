<?php

namespace apiUtilisateur\application\actions\user;

use apiUtilisateur\application\actions\AbstractAction;
use apiUtilisateur\core\services\user\UsersServiceInterface;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

class GetUserByTokenAction extends AbstractAction
{
    private UsersServiceInterface $userService;

    public function __construct(UsersServiceInterface $userService)
    {
        $this->userService = $userService;
    }

    public function __invoke(ServerRequestInterface $rq, ResponseInterface $rs, array $args): ResponseInterface
    {
        $idUser = $rq->getAttribute('idUser');

        $user = $this->userService->getUsersId($idUser);

        $res = [
            'type' => 'ressource',
            'user' => $user
        ];

        $rs->getBody()->write(json_encode($res));
        return $rs->withStatus(200)->withHeader('Content-Type', 'application/json');
    }
}