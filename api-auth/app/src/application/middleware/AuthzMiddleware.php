<?php

namespace apiAuth\application\middleware;

use apiAuth\core\services\auth\AuthServiceInterface;
use apiAuth\core\services\user\UserServiceInterface;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Server\RequestHandlerInterface;
use Slim\Exception\HttpUnauthorizedException;
use Slim\Routing\RouteContext;

class AuthzMiddleware
{
    private AuthServiceInterface $authService;
    private UserServiceInterface $userService;

    public function __construct(AuthServiceInterface $authService, UserServiceInterface $userService){
        $this->authService = $authService;
        $this->userService = $userService;
    }

    public function __invoke(ServerRequestInterface $rq, RequestHandlerInterface $next): ResponseInterface{

        $routeContext = RouteContext::fromRequest($rq);
        $route = $routeContext->getRoute();
        $routeName = $route->getName();

        $args = $route->getArguments();

        $parsedBody = $rq->getParsedBody();

        $h = $rq->getHeader('Authorization')[0];
        $tokenstring = sscanf($h, "Bearer %s")[0];
        $id = $rq->getAttribute('idUser') ?? null;

        // Vérification des droits d'accès selon la route
        switch ($routeName) {

            case 'updateRole':
                if (!$this->userService->getRoleById($id) == 100) {
                    throw new HttpUnauthorizedException($rq, 'Vous n\'avez pas les droits pour accéder à cette ressource ');
                }
                break;
            default:
                throw new HttpUnauthorizedException($rq, 'Route non autorisée');
        }
        $response = $next->handle($rq);
        return $response;
    }
}