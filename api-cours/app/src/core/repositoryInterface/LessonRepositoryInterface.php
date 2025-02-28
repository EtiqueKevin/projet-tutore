<?php

namespace apiCours\core\repositoryInterface;

use apiCours\core\domain\entities\lesson\Content;
use apiCours\core\domain\entities\lesson\Erreur;
use apiCours\core\domain\entities\lesson\Lesson;

interface LessonRepositoryInterface
{
    public function getLessonByModuleId(string $moduleId): array;
    public function getALlLessons(): array;
    public function getLessonById(string $id): Lesson;
    public function createLesson(array $lesson): string;
    public function updateLesson(array $lesson): void;
    public function deleteLesson(string $id): void;
    public function getExerciseLesson(string $idLesson, string $indexExercise): Content;
    public function getLessonErreurs(string $idLesson): array;
    public function postLessonErreurs(Erreur $erreur): void;
}