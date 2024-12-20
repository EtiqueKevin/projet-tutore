<?php

namespace apiGestion\core\repositoryInterface;

use apiGestion\core\domain\entities\lesson\Lesson;

interface LessonRepositoryInterface
{
    public function getALlLessons(): array;
    public function getLessonById(int $id): Lesson;
}