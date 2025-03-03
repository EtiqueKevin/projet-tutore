<?php

namespace apiUtilisateur\application\actions\user;

use apiUtilisateur\application\actions\AbstractAction;
use apiUtilisateur\core\services\user\UsersServiceInterface;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Respect\Validation\Validator;
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

        if (!Validator::digit()->between(1, 5)->validate($rq->getQueryParams()['rate'])) {
            throw new HttpBadRequestException($rq, "Le paramètre rate doit être un entier entre 1 et 5.");
        }elseif (!Validator::uuid()->validate($args['ID-MODULE'])) {
            throw new HttpBadRequestException($rq, "L'ID du module est invalide.");
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