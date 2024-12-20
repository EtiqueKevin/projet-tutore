<?php

namespace apiGestion\application\actions\user;

use apiGestion\application\actions\AbstractAction;
use apiGestion\core\services\user\UserServiceInterface;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

class GetUserByIdAction extends AbstractAction
{

    private UserServiceInterface $userService;

    public function __construct(UserServiceInterface $us)
    {
        $this->userService = $us;
    }

    public function __invoke(ServerRequestInterface $rq, ResponseInterface $rs, array $args): ResponseInterface
    {
        $id = $args['id'];
        //faire les verifs
        $user = $this->userService->getUserById($id);
        $res = [
            'type' => 'resource',
            'user' => $user
        ];

        $rs->getBody()->write(json_encode($res));
        return $rs->withStatus(200)->withHeader('Content-Type', 'application/json');
    }
}