<?php

namespace apiCours\core\repositoryInterface;

use apiCours\core\domain\entities\lesson\Lesson;

interface LessonRepositoryInterface
{
    public function getLessonByModuleId(string $moduleId): array;
    public function getALlLessons(): array;
    public function getLessonById(int $id): Lesson;
    public function createLesson(Lesson $lesson): Lesson;
    public function updateLesson(Lesson $lesson): Lesson;
    public function deleteLesson(string $id): void;
}