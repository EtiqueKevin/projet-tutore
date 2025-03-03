<?php

namespace apiCours\application\actions\lesson;

use apiCours\application\actions\AbstractAction;
use apiCours\core\dto\lesson\LessonExeciseDTO;
use apiCours\core\services\lesson\LessonServiceInterface;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Respect\Validation\Validator;
use Slim\Exception\HttpBadRequestException;

class GetExerciseByIndexByIdLesson extends AbstractAction
{

    private LessonServiceInterface $lessonService;

    public function __construct(LessonServiceInterface $lessonService)
    {
        $this->lessonService = $lessonService;
    }

    public function __invoke(ServerRequestInterface $rq, ResponseInterface $rs, array $args): ResponseInterface
    {

        if (!Validator::uuid()->validate($args['id_lesson'])) {
            throw new HttpBadRequestException($rq, 'id de la leçon invalide');
        } elseif (!Validator::intVal()->validate($args['index'])) {
            throw new HttpBadRequestException($rq, 'index invalide');
        }


        $exercise = $this->lessonService->getExerciseLesson(new LessonExeciseDTO($args['id_lesson'], $args['index']));

        $res = [
            'type' => 'resource',
            'exercise' => $exercise
        ];

        $rs->getBody()->write(json_encode($res));
        return $rs->withStatus(201)->withHeader('Content-Type', 'application/json');
    }
}