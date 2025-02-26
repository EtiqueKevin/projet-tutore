<?php

namespace apiCours\core\services\lesson;

use apiCours\core\dto\lesson\ContentDTO;
use apiCours\core\dto\lesson\LessonDTO;
use apiCours\core\dto\lesson\LessonExeciseDTO;
use apiCours\core\repositoryInterface\LessonRepositoryException;
use apiCours\core\repositoryInterface\LessonRepositoryInterface;

class LessonService implements LessonServiceInterface
{

    private LessonRepositoryInterface $lessonRepository;

    public function __construct(LessonRepositoryInterface $lessonRepository)
    {
        $this->lessonRepository = $lessonRepository;
    }

    public function getALlLessons(): array
    {
        $lessons = $this->lessonRepository->getALlLessons();
        $tabLessonDTO = [];

        foreach ($lessons as $lesson) {
          $tabLessonDTO[] = $lesson->toDTO();
        }
        return $tabLessonDTO;
    }

    public function getLessonById(?string $id): LessonDTO
    {
        $lesson = $this->lessonRepository->getLessonById($id);
        return $lesson->toDTO();
    }

    public function createLesson(LessonDTO $lessonDTO): string
    {
        try{
            $res =$this->lessonRepository->createLesson($lessonDTO->jsonSerialize());
            return $res;
        }catch (\Exception $e){
            throw new LessonRepositoryException($e->getMessage());
        }

    }

    public function updateLesson(LessonDTO $lessonDTO): void
    {
        try{
            $this->lessonRepository->updateLesson($lessonDTO->jsonSerialize());
        }catch (\Exception $e){
            throw new LessonRepositoryException($e->getMessage());
        }
    }

    public function deleteLesson(string $id): void
    {
        try {
            $this->lessonRepository->deleteLesson($id);
        }catch (\Exception $e){
            throw new LessonRepositoryException($e->getMessage());
        }

    }

    public function getLessonByModuleId(string $moduleId): array
    {
         $res = $this->lessonRepository->getLessonByModuleId($moduleId);
        $tabLessonDTO = [];
         foreach ($res as $lesson) {
             $tabLessonDTO[] = $lesson->toDTO();
         }
        return $tabLessonDTO;

    }

    public function getExerciseLesson(LessonExeciseDTO $ld): ContentDTO
    {
        $res = $this->lessonRepository->getExerciseLesson($ld->idLesson, $ld->indexExercise);
        return $res->toDTO();
    }
}