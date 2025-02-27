<?php

namespace apiUtilisateur\application\actions\user;

use apiUtilisateur\application\actions\AbstractAction;
use apiUtilisateur\core\services\user\UsersServiceInterface;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Slim\Exception\HttpBadRequestException;

class PostRateOfModuleAction extends AbstractAction
{
    private UsersServiceInterface $userService;

    public function __construct(UsersServiceInterface $userService)
    {
        $this->userService = $userService;
    }

    public function __invoke(ServerRequestInterface $rq, ResponseInterface $rs, array $args): ResponseInterface
    {
        if (!isset($rq->getQueryParams()['rate'])) {
            throw new HttpBadRequestException($rq, "Le paramètre rate est manquant.");
        }

        try {
            $idUser = $rq->getAttribute('idUser');
            $idModule = $args['ID-MODULE'];
            $rate = $rq->getQueryParams()['rate'];
            $this->userService->rateModule($idUser, $idModule, $rate);
        }catch (\Exception $e){
            throw new HttpBadRequestException($rq, $e->getMessage());
        }
        return $rs->withStatus(200)->withHeader('Content-Type', 'application/json');

    }
}