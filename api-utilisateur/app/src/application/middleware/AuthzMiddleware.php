<?php

namespace apiUtilisateur\application\middleware;

use apiUtilisateur\core\services\auth\AuthServiceInterface;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Server\RequestHandlerInterface;
use Slim\Exception\HttpUnauthorizedException;
use Slim\Routing\RouteContext;

class AuthzMiddleware
{
    private AuthServiceInterface $authService;

    public function __construct(AuthServiceInterface $authService){
        $this->authService = $authService;
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

            case 'deleteUtilisateur':
                if (!$this->authService->adminVerification($id) && !$this->authService->himselfVerification($args['ID-USER'], $id)) {
                    throw new HttpUnauthorizedException($rq, 'Vous n\'avez pas les droits pour accéder à cette ressource');
                }
                break;
            case 'getDemandes':
            case 'validerDemande':
            case 'deleteDemande':
            case 'getUtilisateurs':
                if (!$this->authService->adminVerification($id)) {
                    throw new HttpUnauthorizedException($rq, 'Vous n\'avez pas les droits pour accéder à cette ressource');
                }
                break;
            case 'postDemande':
                if (!$this->authService->isStudent($id)) {
                    throw new HttpUnauthorizedException($rq, 'Vous n\'avez pas les droits pour accéder à cette ressource');
                }
                break;
            default:
                throw new HttpUnauthorizedException($rq, 'Route non autorisée');
        }
        $response = $next->handle($rq);
        return $response;
    }
}