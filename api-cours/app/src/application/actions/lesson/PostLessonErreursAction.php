<?php

namespace apiCours\application\actions\lesson;

use apiCours\application\actions\AbstractAction;
use apiCours\core\dto\lesson\ErreurDTO;
use apiCours\core\services\lesson\LessonServiceInterface;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Respect\Validation\Validator;
use Slim\Exception\HttpBadRequestException;

class PostLessonErreursAction extends AbstractAction
{
    private LessonServiceInterface $lessonService;

    public function __construct(LessonServiceInterface $lessonService){
        $this->lessonService = $lessonService;
    }

    public function __invoke(ServerRequestInterface $rq, ResponseInterface $rs, array $args): ResponseInterface
    {
        $id = $args['id'];
        $body = $rq->getParsedBody();

        if(!Validator::uuid()->validate($id)){
            throw new HttpBadRequestException($rq, 'id de la leçon invalide');
        } else

        if (!isset($body['errors'])) {
            throw new HttpBadRequestException($rq, 'il manque des paramètres');
        }

        try{
            $this->lessonService->postLessonErreurs(new ErreurDTO($id, $body['errors']));

        }catch (\Exception $e){
            throw new HttpBadRequestException($rq,$e->getMessage());
        }

        return $rs->withStatus(201)->withHeader('Content-Type', 'application/json');
    }
}