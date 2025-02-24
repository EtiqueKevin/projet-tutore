<?php

namespace apiAuth\application\actions;

use apiAuth\application\providers\auth\AuthProviderInterface;
use Exception;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Slim\Exception\HttpBadRequestException;

class GetUserIdAction extends AbstractAction
{

    private AuthProviderInterface $authProvider;

    public function __construct(AuthProviderInterface $authProvider){
        $this->authProvider = $authProvider;
    }

    public function __invoke(ServerRequestInterface $rq, ResponseInterface $rs, array $args): ResponseInterface
    {
        try{
            $headers = $rq->getHeader('Authorization');
            $tokenstring = sscanf($headers[0], "Bearer %s")[0];
            $userID = $this->authProvider->getUserID($tokenstring);
        }catch (Exception $e){
            throw new HttpBadRequestException($rq,"erreur lors de la récupération de l'id " . $e->getMessage());
        }
        $response = [
            'type' => 'ressource',
            'userID' => $userID,
        ];

        $rs->getBody()->write(json_encode($response));

        return $rs->withStatus(200)->withHeader('Content-Type', 'application/json');
    }
}