<?php

namespace apiCours\application\actions\lesson;

use apiCours\application\actions\AbstractAction;
use apiCours\core\domain\entities\lesson\Content;
use apiCours\core\dto\lesson\ContentDTO;
use apiCours\core\dto\lesson\FileDTO;
use apiCours\core\dto\lesson\LessonDTO;
use apiCours\core\services\lesson\LessonServiceInterface;
use Exception;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Slim\Exception\HttpBadRequestException;

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

        $index = 0;

        try{
            foreach ($body['content'] as $c) {
                $content = null;
                if($c['type']=="code"){
                    $files = [];
                    foreach ($c['files'] as $f) {
                        $file = new FileDTO($f['type'],$f['filename'],$f['language'],$f['content']);
                        $files[] = $file;
                    }
                    $content = new ContentDTO($c['type'], $c['content'],$index,$files);
                }else{
                    $content = new ContentDTO($c['type'],$c['content'],$index);
                }
                $contents[] = $content;
                $index ++;
            }
        }catch (Exception $e){
            throw new HttpBadRequestException($rq, "erreur lors du chargment des données : " . $e->getMessage());
        }
        try{
            $lessonDTO = new LessonDTO($id,$body['name'], $body['type'],$contents, $body['description']);
            $this->lessonService->updateLesson($lessonDTO);
        }catch (Exception $e){
            throw new HttpBadRequestException($rq, "erreur lors de l'update de la lesson : ". $e->getMessage());
        }

        return $rs->withStatus(200)->withHeader('Content-Type', 'application/json');
    }
}