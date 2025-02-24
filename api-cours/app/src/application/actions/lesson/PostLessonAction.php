<?php

namespace apiCours\application\actions\lesson;

use apiCours\application\actions\AbstractAction;
use apiCours\core\domain\entities\lesson\Content;
use apiCours\core\domain\entities\lesson\File;
use apiCours\core\dto\lesson\ContentDTO;
use apiCours\core\dto\lesson\FileDTO;
use apiCours\core\dto\lesson\LessonDTO;
use apiCours\core\services\lesson\LessonServiceInterface;
use DateTime;
use DateTimeZone;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

class PostLessonAction extends AbstractAction
{
    private LessonServiceInterface $lessonService;

    public function __construct(LessonServiceInterface $lessonService)
    {
        $this->lessonService = $lessonService;
    }

    public function __invoke(ServerRequestInterface $rq, ResponseInterface $rs, array $args): ResponseInterface
    {
        $body = $rq->getParsedBody();
        $contents = [];

        $index = 0;

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

        $date = new DateTime();
        $date->setTimezone(new DateTimeZone('UTC'));
        $formattedDate = $date->format('Y-m-d\TH:i:s.v\Z');

        $lessonDTO = new LessonDTO(null,$body['name'], $body['type'],$contents, $body['description'], $formattedDate);
        $res = $this->lessonService->createLesson($lessonDTO);

        return $rs->withStatus(201)->withHeader('Content-Type', 'application/json');
    }
}