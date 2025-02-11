<?php

namespace apiCours\application\actions\lesson;

use apiCours\application\actions\AbstractAction;
use apiCours\core\domain\entities\lesson\Content;
use apiCours\core\dto\lesson\LessonDTO;
use apiCours\core\services\lesson\LessonServiceInterface;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

class PutLessonByIdAction extends AbstractAction
{
    private LessonServiceInterface $lessonService;

    public function __construct(LessonServiceInterface $lessonService)
    {
        $this->lessonService = $lessonService;
    }

    public function __invoke(ServerRequestInterface $rq, ResponseInterface $rs, array $args): ResponseInterface
    {
        $id = $args['id_lesson'];
        $body = $rq->getParsedBody();

        $contents = [];
        foreach ($body['content'] as $content) {
            $content = new Content(
                $content['type'],
                $content['text'],
                $content['link']
            );
            $contents[] = $content;
        }

        $lessonDTO = new LessonDTO(
            $id,
            $body['title'],
            $body['description'],
            $contents
        );

        $lessonDTO->setId($id);

        $lesson = $this->lessonService->updateLesson($lessonDTO);

        $res = [
            'type' => 'resource',
            'lesson' => $lesson
        ];

        $rs->getBody()->write(json_encode($res));
        return $rs->withStatus(200)->withHeader('Content-Type', 'application/json');
    }
}