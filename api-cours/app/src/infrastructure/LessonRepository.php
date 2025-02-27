<?php

namespace apiCours\infrastructure;

use apiCours\core\domain\entities\lesson\Content;
use apiCours\core\domain\entities\lesson\File;
use apiCours\core\domain\entities\lesson\Lesson;
use apiCours\core\dto\lesson\LessonDTO;
use apiCours\core\repositoryInterface\LessonRepositoryException;
use apiCours\core\repositoryInterface\LessonRepositoryInterface;
use apiCours\core\services\UUIDConverter\UUIDConverter;
use DateTime;
use MongoDB\BSON\UTCDateTime;
use MongoDB\Collection;
use MongoDB\Database;
use PHPUnit\Framework\Exception;

class LessonRepository implements LessonRepositoryInterface
{

    private Database $db;

    private Collection $lessonCollection;
    private Collection $modulelessonCollection;

    private Collection $lessonErreurCollection;

    public function __construct(Database $db)
    {
        $this->db = $db;
        $this->lessonCollection = $this->db->selectCollection("lessons");
        $this->modulelessonCollection = $this->db->selectCollection("module_lessons");
        $this->lessonErreurCollection = $this->db->selectCollection("lesson_erreurs");
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
        try{
            $lesson['_id'] = UUIDConverter::toUUID($lesson['id']);
            $lesson['date_update'] = new UTCDateTime((new DateTime())->getTimestamp() * 1000);
            unset($lesson['id']);
            //var_dump($lesson);
            //echo $lesson;
            $res = $this->lessonCollection->insertOne($lesson);
            return UUIDConverter::fromUUID($res->getInsertedId());
        }catch(Exception $e){
            throw new LessonRepositoryException($e->getMessage());
        }
    }

    public function updateLesson(array $lesson): void
    {
        try{
            $idUUID = UUIDConverter::toUUID($lesson['id']);
            unset($lesson['id']);
            $lesson['date_update'] = new UTCDateTime((new DateTime())->getTimestamp() * 1000);
            $this->lessonCollection->updateOne( ['_id' => $idUUID],['$set' => $lesson]);
        }catch (Exception $e){
            throw new LessonRepositoryException("erreur lors de l'update : ". $e->getMessage());
        }
    }

    public function deleteLesson(string $id): void
    {
        try{
            $this->lessonCollection->deleteOne(['_id' => UUIDConverter::toUUID($id)]);
            $this->modulelessonCollection->deleteOne(['id_lesson' => UUIDConverter::toUUID($id)]);
        }catch (Exception $e){
            throw new LessonRepositoryException("erreur lors de la suppression : ".$e->getMessage());
        }

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

    public function getLessonErreurs(string $idLesson): array{
        try{
            $lessonErreur = $this->lessonErreurCollection->findOne(['id_lesson' => UUIDConverter::toUUID($idLesson)]);
            var_dump($lessonErreur);

        }catch (Exception $e){

        }
        return $lessonErreur;
    }
}