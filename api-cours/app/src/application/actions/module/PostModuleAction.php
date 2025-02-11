<?php

namespace apiCours\application\actions\module;

use apiCours\application\actions\AbstractAction;
use apiCours\core\dto\module\ModuleDTO;
use apiCours\core\services\module\ModuleServiceInterface;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

class PostModuleAction  extends AbstractAction
{

    private ModuleServiceInterface $moduleService;

    public function __construct(ModuleServiceInterface $moduleService)
    {
        $this->moduleService = $moduleService;
    }

    public function __invoke(ServerRequestInterface $rq, ResponseInterface $rs, array $args): ResponseInterface
    {
        $body = $rq->getParsedBody();
        $moduleDTO = new ModuleDTO(
            null,
            $body['name'],
            $body['idCreator'],
            $body['description'],
            $body['nblesson'],
            $body['dateupdate']
        );

        $module = $this->moduleService->createModule($moduleDTO);

        $res = [
            'type' => 'ressource',
            'module' => $module
        ];

        $rs->getBody()->write(json_encode($res));
        return $rs->withStatus(201)->withHeader('Content-Type', 'application/json');
    }
}