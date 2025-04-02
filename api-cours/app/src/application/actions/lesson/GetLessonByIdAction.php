<?php

namespace apiCours\application\actions\lesson;

use apiCours\application\actions\AbstractAction;
use apiCours\core\dto\lesson\UneLessonDTO;
use apiCours\core\services\lesson\LessonServiceInterface;
use apiCours\core\services\module\ModuleServiceInterface;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Respect\Validation\Validator;
use Slim\Exception\HttpBadRequestException;

class GetLessonByIdAction extends AbstractAction
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
        $query = $rq->getQueryParams();
        $connecte = $query["connecte"] ?? '';

        if (!Validator::uuid()->validate($args['id_lesson'])) {
            throw new HttpBadRequestException($rq, 'id de la leçon invalide');
        }

        $dto = new UneLessonDTO($args['id_lesson']);
        if($connecte === "oui"){
            try{
                preg_match('/Bearer\s(\S+)/', $rq->getHeaderLine('Authorization'), $matches);
                $token = $matches[1];
                $dto->token = $token;
            }catch (\Exception $e) {
                throw new HttpBadRequestException($rq, "Il manque le token");
            }
        }

        try{
            $lesson = $this->lessonService->getLessonById($dto);
            $module = $this->moduleService->getModuleByLesson($args['id_lesson']);
        }catch (\Exception $e) {
            throw new HttpBadRequestException($rq, $e->getMessage());
        }

        $res = [
            'type' => 'resource',
            'lesson' => $lesson,
            'id_module' => $module->id,
        ];

        $rs->getBody()->write(json_encode($res));
        return $rs->withStatus(200)->withHeader('Content-Type', 'application/json');
    }
}