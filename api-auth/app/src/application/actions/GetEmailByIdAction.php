<?php

namespace apiAuth\application\actions;

use apiAuth\core\repositoryInterface\AuthRepositoryInterface;
use apiAuth\core\services\user\UserServiceInterface;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

class GetEmailByIdAction extends AbstractAction
{

    private UserServiceInterface $userService;

    public function __construct(UserServiceInterface $userService)
    {
        $this->userService = $userService;
    }

    public function __invoke(ServerRequestInterface $rq, ResponseInterface $rs, array $args): ResponseInterface
    {
        $id = $args['id'];
        $email = $this->userService->getEmailByRole($id);
        $res = ['email' => $email];
        $rs->getBody()->write(json_encode($res));
        return $rs->withHeader('Content-Type', 'application/json');
    }
}