<?php

namespace apiUtilisateur\application\actions\user;

use apiUtilisateur\application\actions\AbstractAction;
use Exception;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Slim\Exception\HttpBadRequestException;
use Slim\Exception\HttpUnauthorizedException;

class RefreshAction extends AbstractAction
{
    private AuthProviderInterface $authProvider;

    public function __construct(AuthProviderInterface $authProvider) {
        $this->authProvider = $authProvider;
    }

    public function __invoke(ServerRequestInterface $rq, ResponseInterface $rs, array $args): ResponseInterface{

        try {
            $headers = $rq->getHeader('Authorization');
            if (empty($headers) || !isset($headers[0])) {
                throw new HttpBadRequestException($rq, "Authorization header not found");
            }
            $tokenstring = sscanf($headers[0], "Bearer %s")[0];
        } catch (Exception $e) {
            throw new HttpBadRequestException($rq, "Error retrieving the token: " . $e->getMessage());
        }

        try {
            $authRes = $this->authProvider->refresh($tokenstring);
        }catch (Exception $e){
            throw new HttpUnauthorizedException($rq, 'Identifiants incorrects ' . $e->getMessage());
        }

        $response = [
            'type' => 'ressource',
            'atoken' => $authRes,
        ];

        $rs->getBody()->write(json_encode($response));

        return $rs->withStatus(200)->withHeader('Content-Type', 'application/json');
    }
}