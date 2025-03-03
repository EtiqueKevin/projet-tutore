<?php

namespace apiCours\application\actions\lesson;

use apiCours\application\actions\AbstractAction;
use apiCours\core\services\lesson\LessonServiceInterface;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Respect\Validation\Validator;
use Slim\Exception\HttpBadRequestException;

class GetLessonErreursAction extends AbstractAction
{

    private LessonServiceInterface $lessonService;

    public function __construct(LessonServiceInterface $lessonService){
        $this->lessonService = $lessonService;
    }

    public function __invoke(ServerRequestInterface $rq, ResponseInterface $rs, array $args): ResponseInterface
    {
        $id = $args['id'];

        if (!Validator::uuid()->validate($id)) {
            throw new HttpBadRequestException($rq, 'id de la leçon invalide');
        }

        try {

            $erreur = $this->lessonService->getLessonErreurs($id);
        }catch (\Exception $e){
            throw new HttpBadRequestException($rq,$e->getMessage());
        }

        $res = [
            'type' => 'resource',
            'erreur' => $erreur
        ];

        $rs->getBody()->write(json_encode($res));
        return $rs->withStatus(200)->withHeader('Content-Type', 'application/json');
    }
}