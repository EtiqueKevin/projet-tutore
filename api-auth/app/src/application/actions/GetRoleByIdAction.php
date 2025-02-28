<?php

namespace apiAuth\application\actions;

use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Slim\Exception\HttpBadRequestException;
use TheSeer\Tokenizer\Exception;

class GetRoleByIdAction extends AbstractAction
{
    private $usersService;

    public function __construct($usersService)
    {
        $this->usersService = $usersService;
    }

    public function __invoke(ServerRequestInterface $rq, ResponseInterface $rs, array $args): ResponseInterface
    {
        try {
            $id = $args['id'];
            $role = $this->usersService->getRoleById($id);

            $res = [
                'type' => 'ressource',
                'role' => $role
            ];
        }catch (Exception $e){
            throw new HttpBadRequestException($rq, $e->getMessage());
        }

        $rs->getBody()->write(json_encode($res));
        return $rs->withStatus(200)->withHeader('Content-Type', 'application/json');
    }
}