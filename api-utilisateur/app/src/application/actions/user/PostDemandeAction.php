<?php

namespace apiUtilisateur\application\actions\user;

use apiUtilisateur\application\actions\AbstractAction;
use apiUtilisateur\core\services\user\UsersServiceInterface;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Slim\Exception\HttpBadRequestException;

class PostDemandeAction extends AbstractAction
{
    private UsersServiceInterface $userService;

    public function __construct(UsersServiceInterface $userService)
    {
        $this->userService = $userService;
    }

    public function __invoke(ServerRequestInterface $rq, ResponseInterface $rs, array $args): ResponseInterface
    {
        try {
            $idUser = $rq->getAttribute('idUser');
            $this->userService->ajouterDemande($idUser);
        }catch (\Exception $e){
            throw new HttpBadRequestException($rq, $e->getMessage());
        }

        return $rs->withStatus(200)->withHeader('Content-Type', 'application/json');
    }
}