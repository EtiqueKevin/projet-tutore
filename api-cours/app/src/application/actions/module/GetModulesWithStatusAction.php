<?php

namespace apiCours\application\actions\module;

use apiCours\application\actions\AbstractAction;
use apiCours\core\dto\module\searchModuleDTO;
use apiCours\core\services\module\ModuleServiceInterface;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Slim\Exception\HttpBadRequestException;

class GetModulesWithStatusAction extends AbstractAction
{
    private ModuleServiceInterface $service;

    public function __construct(ModuleServiceInterface $service){
        $this->service = $service;
    }

    public function __invoke(ServerRequestInterface $rq, ResponseInterface $rs, array $args): ResponseInterface
    {
        $query = $rq->getQueryParams();
        $nameS = $query["name"] ?? '';
        $descS = $query["description"] ?? '';

        preg_match('/Bearer\s(\S+)/', $rq->getHeaderLine('Authorization'), $matches);
        $token = $matches[1];

        try {
            $modules = $this->service->getAllModulesUtilisateur(new SearchModuleDTO($nameS, $descS,$token));
        }catch (\Exception $e) {
            throw new HttpBadRequestException($rq, $e->getMessage());
        }
        $res = [
            'type' => 'resource',
            'modules' => $modules
        ];

        $rs->getBody()->write(json_encode($res));
        return $rs->withStatus(200)->withHeader('Content-Type', 'application/json');
    }
}