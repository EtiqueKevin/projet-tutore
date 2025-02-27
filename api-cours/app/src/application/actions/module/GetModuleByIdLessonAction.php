<?php

namespace apiCours\application\actions\module;

use apiCours\application\actions\AbstractAction;
use apiCours\core\services\module\ModuleServiceInterface;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Slim\Exception\HttpBadRequestException;

class GetModuleByIdLessonAction extends AbstractAction
{
    private ModuleServiceInterface $moduleService;

    public function __construct(ModuleServiceInterface $moduleService)
    {
        $this->moduleService = $moduleService;
    }

    public function __invoke(ServerRequestInterface $rq, ResponseInterface $rs, array $args): ResponseInterface
    {
        try {
            $idLesson = $args['id_lesson'];
            $module = $this->moduleService->getModuleByLesson($idLesson);

            $res = [
                'type' => 'resource',
                'module' => $module
            ];

            $rs->getBody()->write(json_encode($res));
            return $rs->withStatus(200)->withHeader('Content-Type', 'application/json');
        }catch (\Exception $e){
            throw new HttpBadRequestException($rq, $e->getMessage());
        }
    }
}