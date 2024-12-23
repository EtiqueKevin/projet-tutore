<?php

namespace apiGestion\application\actions\lesson;

use apiGestion\application\actions\AbstractAction;
use apiGestion\core\services\lesson\LessonServiceInterface;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

class GetLessonAction extends AbstractAction
{

    private LessonServiceInterface $lessonService;


    public function __construct(LessonServiceInterface $ls)
    {
        $this->lessonService = $ls;
    }
    public function __invoke(ServerRequestInterface $rq, ResponseInterface $rs, array $args): ResponseInterface
    {
        $lessons = $this->lessonService->getALlLessons();
        $res = [
            'type' => 'resource',
            'lessons' => $lessons
        ];

        $rs->getBody()->write(json_encode($res));
        return $rs->withStatus(200)->withHeader('Content-Type', 'application/json');
    }
}