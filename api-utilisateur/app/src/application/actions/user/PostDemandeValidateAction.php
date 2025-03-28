<?php

namespace apiUtilisateur\application\actions\user;

use apiUtilisateur\application\actions\AbstractAction;
use apiUtilisateur\core\services\user\UsersServiceInterface;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Respect\Validation\Validator;
use Slim\Exception\HttpBadRequestException;

class PostDemandeValidateAction extends AbstractAction
{
    private UsersServiceInterface $userService;

    public function __construct(UsersServiceInterface $userService)
    {
        $this->userService = $userService;
    }

    public function __invoke(ServerRequestInterface $rq, ResponseInterface $rs, array $args): ResponseInterface
    {
        try {
            $idDemande = $args['ID-DEMANDE'];

            if (!Validator::uuid()->validate($idDemande)) {
                throw new HttpBadRequestException('id de la demande invalide');
            }

            preg_match('/Bearer\s(\S+)/', $rq->getHeaderLine('Authorization'), $matches);
            $token = $matches[1];
            $this->userService->validerDemande($idDemande, $token);
        }catch (\Exception $e){
            throw new \Exception($e->getMessage());
        }

        return $rs->withStatus(200)->withHeader('Content-Type', 'application/json');
    }
}