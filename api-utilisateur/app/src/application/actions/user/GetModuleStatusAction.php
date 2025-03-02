<?php

namespace apiUtilisateur\application\actions\user;

use apiUtilisateur\application\actions\AbstractAction;
use apiUtilisateur\core\services\user\UsersServiceInterface;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Slim\Exception\HttpBadRequestException;

class GetModuleStatusAction extends AbstractAction
{
    private UsersServiceInterface $usersService;

    public function __construct(UsersServiceInterface $usersService){
        $this->usersService = $usersService;
    }

    public function __invoke(ServerRequestInterface $rq, ResponseInterface $rs, array $args): ResponseInterface
    {
        $id = $rq->getAttribute('idUser');

        try {
            $r = $this->usersService->getModuleStatusByUser($id);

        }catch (\Exception $e){
            throw new HttpBadRequestException($rq," ". $e->getMessage());
        }

        $res = [
            'type' => 'collection',
            'modules' => $r
        ];

        $rs->getBody()->write(json_encode($res));
        return $rs->withStatus(200)->withHeader('Content-Type', 'application/json');
    }
}