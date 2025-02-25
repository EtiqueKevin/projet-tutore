<?php

namespace apiCours\application\actions\module;

use apiCours\application\actions\AbstractAction;
use apiCours\core\dto\module\ModuleDTO;
use apiCours\core\services\module\ModuleServiceInterface;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Respect\Validation\Validator;
use Slim\Exception\HttpBadRequestException;

class PutModuleByIdAction extends AbstractAction
{
    private ModuleServiceInterface $moduleService;

    public function __construct(ModuleServiceInterface $moduleService)
    {
        $this->moduleService = $moduleService;
    }

    public function __invoke(ServerRequestInterface $rq, ResponseInterface $rs, array $args): ResponseInterface
    {
        $id = $args['id'];
        $body = $rq->getParsedBody();

        if(!isset($body['name']) ) {
            throw new HttpBadRequestException($rq, "Le nom du module est obligatoire.");
        }else if(!isset($body['description']) ) {
            throw new HttpBadRequestException($rq, "La description du module est obligatoire.");
        }else if(!isset($body['nblesson']) ) {
            throw new HttpBadRequestException($rq, "Le nombre de leçon du module est obligatoire.");
        }

        if (!(Validator::uuid()->validate($id))) {
            throw new HttpBadRequestException($rq, "l'UUID du module n'est pas valide.");
        }

        $id_creator = $rq->getAttribute('idUser');

        $moduleDTO = new ModuleDTO(
            $id,
            $body['name'],
            $id_creator,
            $body['description'],
            $body['nblesson'],
            null
        );

        $this->moduleService->updateModule($moduleDTO);


        return $rs->withStatus(200)->withHeader('Content-Type', 'application/json');
    }
}