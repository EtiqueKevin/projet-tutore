<?php

namespace apiCours\application\actions\module;

use apiCours\application\actions\AbstractAction;
use apiCours\core\services\module\ModuleServiceInterface;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

class GetModuleByIdAction extends AbstractAction
{
    private ModuleServiceInterface $moduleService;

    public function __construct(ModuleServiceInterface $moduleService)
    {
        $this->moduleService = $moduleService;
    }

    public function __invoke(ServerRequestInterface $rq, ResponseInterface $rs, array $args): ResponseInterface
    {
        $id = $args['id'];
        $module = $this->moduleService->getModuleById($id);
        $res = [
            'type' => 'ressource',
            'module' => $module
        ];
        $rs->getBody()->write(json_encode($res));
        return $rs->withStatus(200)->withHeader('Content-Type', 'application/json');
    }
}