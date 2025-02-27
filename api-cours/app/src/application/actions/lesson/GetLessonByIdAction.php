<?php

namespace apiCours\application\actions\lesson;

use apiCours\application\actions\AbstractAction;
use apiCours\core\dto\lesson\UneLessonDTO;
use apiCours\core\services\lesson\LessonServiceInterface;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Slim\Exception\HttpBadRequestException;

class GetLessonByIdAction extends AbstractAction
{
    private LessonServiceInterface $lessonService;

    public function __construct(LessonServiceInterface $lessonService)
    {
        $this->lessonService = $lessonService;
    }

    public function __invoke(ServerRequestInterface $rq, ResponseInterface $rs, array $args): ResponseInterface
    {
        $query = $rq->getQueryParams();
        $connecte = $query["connecte"] ?? '';


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

        $lesson = $this->lessonService->getLessonById($dto);
        $res = [
            'type' => 'resource',
            'lesson' => $lesson
        ];

        $rs->getBody()->write(json_encode($res));
        return $rs->withStatus(200)->withHeader('Content-Type', 'application/json');
    }
}