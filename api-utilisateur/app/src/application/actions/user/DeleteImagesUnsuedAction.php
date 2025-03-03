<?php

namespace apiUtilisateur\application\actions\user;

use apiAuth\core\services\user\UserServiceInterface;
use apiUtilisateur\application\actions\AbstractAction;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

class DeleteImagesUnsuedAction extends AbstractAction
{
    private UserServiceInterface $userService;

    public function __construct(UserServiceInterface $userService)
    {
        $this->userService = $userService;
    }

    public function __invoke(ServerRequestInterface $rq, ResponseInterface $rs, array $args): ResponseInterface
    {
        try {
            $this->userService->deleteImagesUnused();
        }catch (\Exception $e){
            return $rs->withStatus(400)->withHeader('Content-Type', 'application/json');
        }

        return $rs->withStatus(200)->withHeader('Content-Type', 'application/json');
    }
}