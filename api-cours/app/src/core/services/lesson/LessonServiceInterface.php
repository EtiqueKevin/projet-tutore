<?php

namespace apiCours\core\services\lesson;

use apiCours\core\dto\lesson\ContentDTO;
use apiCours\core\dto\lesson\LessonDTO;
use apiCours\core\dto\lesson\LessonExeciseDTO;

interface LessonServiceInterface
{
    public function getALlLessons(): array;

    public function getLessonByModuleId(string $moduleId): array;

    public function getLessonById(string $id): LessonDTO;
    public function createLesson(LessonDTO $lessonDTO): string;
    public function updateLesson(LessonDTO $lessonDTO): LessonDTO;
    public function deleteLesson(string $id): void;
    public function getExerciseLesson(LessonExeciseDTO $ld): ContentDTO;
}