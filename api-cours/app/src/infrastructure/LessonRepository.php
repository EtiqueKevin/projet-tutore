<?php

namespace apiCours\infrastructure;

use apiCours\core\domain\entities\lesson\Content;
use apiCours\core\domain\entities\lesson\File;
use apiCours\core\domain\entities\lesson\Lesson;
use apiCours\core\dto\lesson\LessonDTO;
use apiCours\core\repositoryInterface\LessonRepositoryInterface;
use apiCours\core\services\UUIDConverter\UUIDConverter;
use MongoDB\Collection;
use MongoDB\Database;
use PHPUnit\Framework\Exception;

class LessonRepository implements LessonRepositoryInterface
{

    private Database $db;

    private Collection $lessonCollection;
    private Collection $modulelessonCollection;

    public function __construct(Database $db)
    {
        $this->db = $db;
        $this->lessonCollection = $this->db->selectCollection("lessons");
        $this->modulelessonCollection = $this->db->selectCollection("module_lessons");
    }

    public function getALlLessons(): array
    {
        return [];
    }

    public function getLessonById(string $id): Lesson
    {
        $idUUID = UUIDConverter::toUUID($id);
        $lessonsDB = $this->lessonCollection->findOne(['_id' => $idUUID]);
        $contentTab = [];
        foreach ($lessonsDB->content as $c) {
            $content = new Content($c->type, $c->content,$c->index);
            if($c->type=="code"){
                $files = [];
                foreach ($c->files as $f) {
                    $file = new File($f->type,$f->filename,$f->language,$f->content);
                    $files[] = $file;
                }
                $content->setFiles($files);
            }
            $contentTab[] = $content;
        }
        $date = $lessonsDB->date_update->toDateTime()->getTimestamp();
        $lesson = new Lesson($lessonsDB->name, $lessonsDB->type, $contentTab, $lessonsDB->description, date("d/m/Y", $date));

        $lesson->setId(UUIDConverter::fromUUID($lessonsDB->_id));

        return $lesson;
    }

    public function createLesson(array $lesson): string
    {
        $res = $this->lessonCollection->insertOne($lesson);
        return $res->getInsertedId();
    }

    public function updateLesson(Lesson $lesson): Lesson
    {
        return $lesson;
    }

    public function deleteLesson(string $id): void
    {

    }

    public function getLessonByModuleId(string $moduleId): array
    {

        $idUUID = UUIDConverter::toUUID($moduleId);

        $moduleLessons = $this->modulelessonCollection->find(['id_module' => $idUUID]);
        $lessonIds = [];
        foreach ($moduleLessons as $moduleLesson) {
            $lessonIds[] = $moduleLesson['id_lesson'];
        }

        $lessonsEntity = [];
        foreach ($lessonIds as $lessonId) {
            $lessonsDB= $this->lessonCollection->findOne(['_id' => $lessonId]);
            $contentTab = [];
            foreach ($lessonsDB->content as $c) {
                $content = new Content($c->type, $c->content,$c->index);
                if($c->type=="code"){
                    $files = [];
                    foreach ($c->files as $f) {
                        $file = new File($f->type,$f->filename,$f->language,$f->content);
                        $files[] = $file;
                    }
                    $content->setFiles($files);
                }
                $contentTab[] = $content;
            }

            $date = $lessonsDB->date_update->toDateTime()->getTimestamp();
            $lesson = new Lesson($lessonsDB->name, $lessonsDB->type, $contentTab, $lessonsDB->description, date("d/m/Y", $date));

            $lesson->setId(UUIDConverter::fromUUID($lessonsDB->_id));
            $lessonsEntity[] = $lesson;
        }
        return $lessonsEntity;
    }

    public function getExerciseLesson(string $idLesson, string $indexExercise): Content
    {

        $idUUID = UUIDConverter::toUUID($idLesson);
        $intIndex = intval($indexExercise);
        try{
            $lessonsDB = $this->lessonCollection->findOne(['_id' => $idUUID]);
            foreach ($lessonsDB->content as $c) {

                if($c->type=="code" && $c->index == $intIndex){
                    $content = new Content($c->type, $c->content,$c->index);
                    $files = [];
                    foreach ($c->files as $f) {
                        $file = new File($f->type,$f->filename,$f->language,$f->content);
                        $files[] = $file;
                    }
                    $content->setFiles($files);
                    break;
                }
            }

        }catch (\Exception $exception){
            throw new Exception($exception->getMessage());
        }

        return $content;
    }

    public function postLesson(Lesson $lesson): void{

    }

}