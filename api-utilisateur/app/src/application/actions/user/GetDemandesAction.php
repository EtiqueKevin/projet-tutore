<?php

namespace apiUtilisateur\application\actions\user;

use apiUtilisateur\core\services\user\UsersServiceInterface;
use apiUtilisateur\application\actions\AbstractAction;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

class GetDemandesAction extends AbstractAction
{
    private UsersServiceInterface $userService;

    public function __construct(UsersServiceInterface $userService)
    {
        $this->userService = $userService;
    }

    public function __invoke(ServerRequestInterface $rq, ResponseInterface $rs, array $args): ResponseInterface
    {
        try {
            $demandes = $this->userService->getDemandes();
            $res = [
                'type' => 'collection',
                'data' => $demandes
            ];
        }catch (\Exception $e){
            throw new \Exception($e->getMessage());
        }

        $rs->getBody()->write(json_encode($res));
        return $rs->withStatus(200)->withHeader('Content-Type', 'application/json');
    }
}