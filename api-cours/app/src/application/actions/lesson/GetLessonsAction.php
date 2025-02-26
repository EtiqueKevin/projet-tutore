<?php

namespace apiCours\application\actions\lesson;

use apiCours\application\actions\AbstractAction;
use apiCours\core\dto\lesson\LessonModuleUtilisateurConnecteDTO;
use apiCours\core\services\lesson\LessonServiceInterface;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Slim\Exception\HttpBadRequestException;

class GetLessonsAction extends AbstractAction
{

    private LessonServiceInterface $lessonService;


    public function __construct(LessonServiceInterface $ls)
    {
        $this->lessonService = $ls;
    }
    public function __invoke(ServerRequestInterface $rq, ResponseInterface $rs, array $args): ResponseInterface
    {
        $idModule = $args['id'];
        $query = $rq->getQueryParams();
        $connecte = $query["connecte"] ?? '';
        $lessons = [];

        if($connecte === "oui"){
            try{
                preg_match('/Bearer\s(\S+)/', $rq->getHeaderLine('Authorization'), $matches);
                $token = $matches[1];
            }catch (\Exception $e) {
                throw new HttpBadRequestException($rq, "Il manque le token");
            }

            try {

                $lessons = $this->lessonService->getLessonByModuleIdUtilisateur(new LessonModuleUtilisateurConnecteDTO($idModule,$token));
            }catch (\Exception $e) {
                throw new HttpBadRequestException($rq, $e->getMessage());
            }

        }else{
            try {

                $lessons = $this->lessonService->getLessonByModuleId($idModule);
            }catch (\Exception $e) {
                throw new HttpBadRequestException($rq, $e->getMessage());
            }
        }

        $res = [
            'type' => 'resource',
            'lessons' => $lessons
        ];

        $rs->getBody()->write(json_encode($res));
        return $rs->withStatus(200)->withHeader('Content-Type', 'application/json');
    }
}