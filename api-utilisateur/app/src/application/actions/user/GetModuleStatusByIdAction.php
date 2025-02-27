<?php

namespace apiUtilisateur\application\actions\user;

use apiUtilisateur\application\actions\AbstractAction;
use apiUtilisateur\core\services\user\UsersServiceInterface;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Slim\Exception\HttpBadRequestException;

class GetModuleStatusByIdAction extends AbstractAction
{
    private UsersServiceInterface $userService;

    public function __construct(UsersServiceInterface $userService)
    {
        $this->userService = $userService;
    }

    public function __invoke(ServerRequestInterface $rq, ResponseInterface $rs, array $args): ResponseInterface
    {
        $id = $args['ID-MODULE'];
        try {
            $module_status = $this->userService->getModuleStatusById($id);
        }catch (\Exception $e){
            throw new HttpBadRequestException($rq, $e->getMessage());
        }

        $res = [
            'type' => 'ressource',
            'status' => $module_status
        ];

        $rs->getBody()->write(json_encode($res));
        return $rs->withStatus(200)->withHeader('Content-Type', 'application/json');
    }
}