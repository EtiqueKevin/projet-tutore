<?php

namespace apiCours\core\repositoryInterface;

use apiCours\core\domain\entities\lesson\Lesson;

interface LessonRepositoryInterface
{
    public function getALlLessons(): array;
    public function getLessonById(int $id): Lesson;
}