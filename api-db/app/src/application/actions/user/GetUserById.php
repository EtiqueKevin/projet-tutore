<?php

namespace apiDB\application\actions\user;

use apiDB\application\actions\AbstractAction;
use apiDB\core\services\user\UsersServiceInterface;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

class GetUserById extends AbstractAction{

    private UsersServiceInterface $usersService;

    public function __construct(UsersServiceInterface $userSI){
        $this->usersService = $userSI;
    }

    public function __invoke(ServerRequestInterface $rq, ResponseInterface $rs, array $args): ResponseInterface{
        $id = $args['ID-USER'];
        $user = $this->usersService->getUsersId($id);

        $response = [
            "type"=>"ressource",
            "user"=>$user,
        ];

        $rs->getBody()->write(json_encode($response));
        return $rs->withHeader('Content-Type', 'application/json')->withStatus(200);
    }
}