<?php

namespace apiCours\application\actions\lesson;

use apiCours\application\actions\AbstractAction;
use apiCours\core\domain\entities\lesson\Content;
use apiCours\core\domain\entities\lesson\File;
use apiCours\core\dto\lesson\ContentDTO;
use apiCours\core\dto\lesson\FileDTO;
use apiCours\core\dto\lesson\LessonDTO;
use apiCours\core\dto\lesson\QuestionDTO;
use apiCours\core\services\lesson\LessonServiceInterface;
use apiCours\core\services\module\ModuleServiceInterface;
use DateTime;
use DateTimeZone;
use Exception;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Slim\Exception\HttpBadRequestException;

class PostLessonAction extends AbstractAction
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
        $body = $rq->getParsedBody();

        if (!isset($body['name']) || !isset($body['type']) || !isset($body['content']) || !isset($body['description'])) {
            throw new HttpBadRequestException($rq, 'il manque des paramètres');
        }


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
                }else if($c['type']=="quizz"){

                    $content = new ContentDTO($c['type'],$c['content'],$index);

                    $questions = [];
                    foreach($c['questions'] as $q){
                        $question = new QuestionDTO($q['question'], $q['options'], $q['correctAnswer']);
                        $questions[] = $question;
                    }
                    $content->setQuestions($questions);
                }else{
                    $content = new ContentDTO($c['type'],$c['content'],$index);
                }
                $contents[] = $content;
                $index ++;
            }
        }catch (\Exception $e){
            throw new HttpBadRequestException($rq, "erreur lors du chargment des données : " . $e->getMessage());
        }

        try {
            $lessonDTO = new LessonDTO(null,$body['name'], $body['type'],$contents, $body['description']);
            $res = $this->lessonService->createLesson($lessonDTO);
            $this->moduleService->liaisonModuleLesson($res, $args['id']);
        }catch (Exception $e){
            throw new HttpBadRequestException($rq, "erreur lors de l'enregistrement de la lesson : ". $e->getMessage());
        }

        return $rs->withStatus(201)->withHeader('Content-Type', 'application/json');
    }
}