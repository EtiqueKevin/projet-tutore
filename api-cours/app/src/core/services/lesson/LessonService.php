<?php

namespace apiCours\core\services\lesson;

use apiCours\core\dto\lesson\LessonDTO;
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

    public function getLessonById(int $id): LessonDTO
    {
        $lesson = $this->lessonRepository->getLessonById($id);
        return $lesson->toDTO();
    }
}