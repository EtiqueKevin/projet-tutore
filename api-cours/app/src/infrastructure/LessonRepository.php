<?php

namespace apiCours\infrastructure;

use apiCours\core\domain\entities\lesson\Content;
use apiCours\core\domain\entities\lesson\Erreur;
use apiCours\core\domain\entities\lesson\File;
use apiCours\core\domain\entities\lesson\Lesson;
use apiCours\core\domain\entities\lesson\Question;
use apiCours\core\dto\lesson\LessonDTO;
use apiCours\core\repositoryInterface\LessonRepositoryException;
use apiCours\core\repositoryInterface\LessonRepositoryInterface;
use apiCours\core\services\UUIDConverter\UUIDConverter;
use DateTime;
use MongoDB\BSON\UTCDateTime;
use MongoDB\Collection;
use MongoDB\Database;
use MongoDB\Model\BSONArray;
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
            $content = new Content($c->type, $c->content, $c->index);
            if ($c->type == "code") {
                $files = [];
                foreach ($c->files as $f) {
                    $file = new File($f->type, $f->filename, $f->language, $f->content);
                    $files[] = $file;
                }
                $content->setFiles($files);
            }
            if ($c->type == "quizz") {
                $content = new Content($c->type, $c->content, $c->index);
                $questions = [];
                foreach ($c->questions as $q) {
                    $optionsArray = (array)$q->options;
                    $question = new Question($q->question, $optionsArray, $q->correctAnswer);
                    $questions[] = $question;
                }
                $content->setQuestion($questions);
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
        try {
            $lesson['_id'] = UUIDConverter::toUUID($lesson['id']);
            $lesson['date_update'] = new UTCDateTime((new DateTime())->getTimestamp() * 1000);
            unset($lesson['id']);
            //var_dump($lesson);
            //echo $lesson;
            $res = $this->lessonCollection->insertOne($lesson);
            return UUIDConverter::fromUUID($res->getInsertedId());
        } catch (Exception $e) {
            throw new LessonRepositoryException($e->getMessage());
        }
    }

    public function updateLesson(array $lesson): void
    {
        try {
            $idUUID = UUIDConverter::toUUID($lesson['id']);
            unset($lesson['id']);
            $lesson['date_update'] = new UTCDateTime((new DateTime())->getTimestamp() * 1000);
            $this->lessonCollection->updateOne(['_id' => $idUUID], ['$set' => $lesson]);
        } catch (Exception $e) {
            throw new LessonRepositoryException("erreur lors de l'update : " . $e->getMessage());
        }
    }

    public function deleteLesson(string $id): void
    {
        try {
            $this->lessonCollection->deleteOne(['_id' => UUIDConverter::toUUID($id)]);
            $this->modulelessonCollection->deleteOne(['id_lesson' => UUIDConverter::toUUID($id)]);
        } catch (Exception $e) {
            throw new LessonRepositoryException("erreur lors de la suppression : " . $e->getMessage());
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
            $lessonsDB = $this->lessonCollection->findOne(['_id' => $lessonId]);
            $contentTab = [];
            foreach ($lessonsDB->content as $c) {
                $content = new Content($c->type, $c->content, $c->index);
                if ($c->type == "code") {
                    $files = [];
                    foreach ($c->files as $f) {
                        $file = new File($f->type, $f->filename, $f->language, $f->content);
                        $files[] = $file;
                    }
                    $content->setFiles($files);
                }
                if ($c->type == "quizz") {
                    $content = new Content($c->type, $c->content, $c->index);
                    $questions = [];
                    foreach ($c->questions as $q) {
                        $optionsArray = (array)$q->options;
                        $question = new Question($q->question, $optionsArray, $q->correctAnswer);
                        $questions[] = $question;
                    }
                    $content->setQuestion($questions);
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
        try {
            $lessonsDB = $this->lessonCollection->findOne(['_id' => $idUUID]);
            foreach ($lessonsDB->content as $c) {

                if ($c->type == "code" && $c->index == $intIndex) {
                    $content = new Content($c->type, $c->content, $c->index);
                    $files = [];
                    foreach ($c->files as $f) {
                        $file = new File($f->type, $f->filename, $f->language, $f->content);
                        $files[] = $file;
                    }
                    $content->setFiles($files);
                    break;
                }
            }

        } catch (\Exception $exception) {
            throw new Exception($exception->getMessage());
        }

        return $content;
    }

    public function getLessonErreurs(string $idLesson): array
    {
        try {
            $lessonErreur = $this->lessonErreurCollection->findOne(['id_lesson' => UUIDConverter::toUUID($idLesson)]);
        } catch (Exception $e) {
            throw new Exception($e->getMessage());
        }

        if ($lessonErreur == null) {
            return [];
        }
        return iterator_to_array($lessonErreur['errors']);
    }


    /* NOTE
     *
     * La function postLessonErreurs est vraiment complexe du fait que la forme d'enregistrement des données mongoDB vraiment pas optimisé
     * , j'ai du la diviser en plusieurs fonctions :
     *
     * postLessonErreur est la fonction principale : enregistre de nouvelles erreurs pour une leçon, elle coordonne et utilise les autres fonctions
     * fusionErrorArrays : fusionne deux tableaux d'erreurs (dans le cas ou il y a déjà des données, fusionne les données existantes avec les nouvelles)
     * fusionErrorDetails : fusionne les détails des erreurs avec incrémentation (appelé dans un foreach)
     * formatageErrorData : Transforme les données d'erreur entrantes au format plus traitable par MongoDB
     * 
     */
    public function postLessonErreurs(Erreur $erreur): void
    {

        try {

            $insertion['errors'] = $erreur->getErrors();
            $insertion['id_lesson'] = UUIDConverter::toUUID($erreur->id_lesson);

            $processedErrors = $this->formatageErrorData($insertion);

            $existingDocument = $this->lessonErreurCollection->findOne([
                'id_lesson' => $insertion['id_lesson']
            ]);

            if ($existingDocument && !empty($existingDocument['errors'])) {

                $existingErrors = $existingDocument['errors'];

                $mergedErrors = $this->fusionErrorArrays($existingErrors, $processedErrors);

                $this->lessonErreurCollection->updateOne(
                    ['id_lesson' => $insertion['id_lesson']],
                    ['$set' => ['errors' => $mergedErrors]]
                );

            } else {
                $this->lessonErreurCollection->updateOne(
                    ['id_lesson' => $insertion['id_lesson']],
                    ['$set' => ['errors' => $processedErrors]],
                    ['upsert' => true]
                );

            }

        } catch (Exception $e) {
            throw new Exception($e->getMessage());
        }

    }

    private function fusionErrorArrays($existingErrors, $newErrors)
    {
        $errorMap = [];

        foreach ($existingErrors as $existingError) {
            $errorMap[$existingError['index']] = $existingError;
        }

        foreach ($newErrors as $newError) {
            $index = $newError['index'];

            if (!isset($errorMap[$index])) {
                $errorMap[$index] = $newError;
            } else {
                $errorMap[$index]['errors'] = $this->fusionErrorDetails(
                    $errorMap[$index]['errors'],
                    $newError['errors']
                );
            }
        }
        return array_values($errorMap);
    }

    private function fusionErrorDetails($existingDetails, $newDetails)
    {
        foreach ($newDetails as $testName => $functions) {
            if (!isset($existingDetails[$testName])) {
                $existingDetails[$testName] = array_reduce(
                    array_keys($functions),
                    function ($carry, $function) {
                        $carry[$function] = 1;
                        return $carry;
                    },
                    []
                );
            } else {
                foreach ($functions as $functionName => $errorValue) {
                    if (!isset($existingDetails[$testName][$functionName])) {
                        $existingDetails[$testName][$functionName] = 1;
                    } else {
                        $existingDetails[$testName][$functionName]++;
                    }
                }
            }
        }

        return $existingDetails;
    }

    private function formatageErrorData($errorData)
    {
        $processedErrors = [];

        foreach ($errorData['errors'] as $errorEntry) {
            $processedEntry = [
                'index' => $errorEntry['index'],
                'errors' => []
            ];

            foreach ($errorEntry['errors'] as $testName => $functions) {
                $processedEntry['errors'][$testName] = array_reduce($functions, function ($carry, $function) {
                    $carry[$function] = 1;
                    return $carry;
                }, []);
            }

            $processedErrors[] = $processedEntry;
        }

        return $processedErrors;
    }


}