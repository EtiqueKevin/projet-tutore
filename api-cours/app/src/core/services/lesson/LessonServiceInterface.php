<?php

namespace apiCours\core\services\lesson;

use apiCours\core\dto\lesson\LessonDTO;

interface LessonServiceInterface
{
    public function getALlLessons(): array;

    public function getLessonById(string $id): LessonDTO;
    public function createLesson(LessonDTO $lessonDTO): LessonDTO;
    public function updateLesson(LessonDTO $lessonDTO): LessonDTO;
    public function deleteLesson(string $id): void;
}