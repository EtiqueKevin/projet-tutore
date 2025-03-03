<?php

namespace apiCours\application\actions\lesson;

use apiCours\application\actions\AbstractAction;
use apiCours\core\services\lesson\LessonServiceInterface;
use apiCours\core\services\module\ModuleService;
use apiCours\core\services\module\ModuleServiceInterface;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Respect\Validation\Validator;
use Slim\Exception\HttpBadRequestException;

class DeleteLessonByIdAction extends AbstractAction
{
    private LessonServiceInterface $lessonService;
    private ModuleServiceInterface $moduleService;

    public function __construct(LessonServiceInterface $lessonService, ModuleServiceInterface $moduleService)
    {
        $this->lessonService = $lessonService;
        $this->moduleService = $moduleService;
    }

    public function __invoke(ServerRequestInterface $rq, ResponseInterface $rs, array $args): ResponseInterface
    {
        $idl = $args['id_lesson'];
        $idm = $args['id_module'];

        if (!Validator::uuid()->validate($idl)) {
            throw new HttpBadRequestException($rq, 'id de la leçon invalide');
        } elseif (!Validator::uuid()->validate($idm)) {
            throw new HttpBadRequestException($rq, 'id du module invalide');
        }

        try{
            $this->lessonService->deleteLesson($idl);
            $this->moduleService->decrementationModuleLesson($idm);

        }catch (\Exception $e){
            throw new HttpBadRequestException($rq, $e->getMessage());
        }
        return $rs->withStatus(200)->withHeader('Content-Type', 'application/json');
    }
}