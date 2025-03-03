<?php

namespace apiUtilisateur\application\actions\user;

use apiUtilisateur\application\actions\AbstractAction;
use apiUtilisateur\core\services\user\UsersServiceInterface;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Slim\Exception\HttpBadRequestException;

class GetUserById extends AbstractAction{

    private UsersServiceInterface $usersService;

    public function __construct(UsersServiceInterface $userSI){
        $this->usersService = $userSI;
    }

    public function __invoke(ServerRequestInterface $rq, ResponseInterface $rs, array $args): ResponseInterface{
        $id = $args['ID-USER'];

        if (!Validator::uuid()->validate($id)) {
            throw new HttpBadRequestException('id de l\'utilisateur invalide');
        }

        $user = $this->usersService->getUsersId($id);

        $response = [
            "type"=>"ressource",
            "user"=>$user,
        ];

        $rs->getBody()->write(json_encode($response));
        return $rs->withHeader('Content-Type', 'application/json')->withStatus(200);
    }
}