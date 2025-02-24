<?php

namespace apiCours\application\middleware;

use apiCours\core\services\auth\AuthServiceInterface;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Server\RequestHandlerInterface;
use Slim\Exception\HttpForbiddenException;
use Slim\Exception\HttpUnauthorizedException;
use Slim\Routing\RouteContext;
use Exception;

class AuthMiddleware
{
    protected AuthServiceInterface $authService;

    public function __construct(AuthServiceInterface $authService){
        $this->authService = $authService;
    }

    public function __invoke(ServerRequestInterface $rq, RequestHandlerInterface $next): ResponseInterface{
        $routeContext = RouteContext::fromRequest($rq);
        $route = $routeContext->getRoute();

        if (! $rq->hasHeader('Origin'))
            New HttpUnauthorizedException ($rq, "missing Origin Header (auth)");
        if (! $rq->hasHeader("Authorization")){
            New HttpUnauthorizedException ($rq, "missing Authorization Header (auth)");
        }
        if(!isset($rq->getHeader('Authorization')[0])){
            throw new HttpUnauthorizedException($rq,"no auth, try /signin[/] or /register[/]");
        }
        if(strlen($rq->getHeader('Authorization')[0]) == 6){
            throw new HttpUnauthorizedException($rq,"no auth, try /signin[/] or /register[/]");
        }

        try{
            $h = $rq->getHeader('Authorization')[0];
            $tokenstring = sscanf($h, "Bearer %s")[0];
        }catch (Exception $e){
            throw new HttpUnauthorizedException($rq,"token invalide");
        }

        try {
            $utilisateurID = $this->authService->getUtilisateurId($tokenstring);
            $rq = $rq->withAttribute('idUser',$utilisateurID);
        }catch (Exception $e){
            throw new HttpForbiddenException($rq,"Problème d'authentification" . $e->getMessage());
        }

        return $next->handle($rq);
    }

}