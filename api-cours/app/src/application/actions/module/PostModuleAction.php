<?php

namespace apiCours\application\actions\module;

use apiCours\application\actions\AbstractAction;
use apiCours\core\dto\module\ModuleDTO;
use apiCours\core\services\module\ModuleServiceInterface;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Slim\Exception\HttpBadRequestException;

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

        if(!isset($body['name']) ) {
            throw new HttpBadRequestException($rq, "Le nom du module est obligatoire.");
        }else if(!isset($body['idCreator']) ) {
            throw new HttpBadRequestException($rq, "L'id du créateur du module est obligatoire.");
        }else if(!isset($body['description']) ) {
            throw new HttpBadRequestException($rq, "La description du module est obligatoire.");
        }else if(!isset($body['nblesson']) ) {
            throw new HttpBadRequestException($rq, "Le nombre de leçon du module est obligatoire.");
        }else if(!isset($body['dateupdate']) ) {
            throw new HttpBadRequestException($rq, "La date de mise à jour du module est obligatoire.");
        }

        $moduleDTO = new ModuleDTO(
            null,
            $body['name'],
            $body['idCreator'],
            $body['description'],
            $body['nblesson'],
            $body['dateupdate']
        );

        try {
            $module = $this->moduleService->createModule($moduleDTO);
        }catch (\Exception $e) {
            throw new HttpBadRequestException($rq, $e->getMessage());
        }

        $res = [
            'type' => 'ressource',
            'module' => $module
        ];

        $rs->getBody()->write(json_encode($res));
        return $rs->withStatus(201)->withHeader('Content-Type', 'application/json');
    }
}