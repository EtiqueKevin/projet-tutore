<?php

namespace apiAuth\application\actions;

use apiAuth\core\services\auth\AuthServiceInterface;
use apiUtilisateur\core\repositoryInterface\AuthRepositoryInterface;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Slim\Exception\HttpBadRequestException;

class PutRoleUtilisateurAction extends AbstractAction
{
    private AuthServiceInterface $authService;

    public function __construct(AuthServiceInterface $authService)
    {
        $this->authService = $authService;
    }


    public function __invoke(ServerRequestInterface $rq, ResponseInterface $rs, array $args): ResponseInterface
    {
        $id = $args['ID-USER'];
        $role = $rq->getQueryParams()['role'];

        try {
            $this->authService->updateRole($id, $role);
        }catch (\Exception $e){
            throw new HttpBadRequestException($rq, $e->getMessage());
        }
        return $rs->withStatus(200)->withHeader('Content-Type', 'application/json');
    }
}