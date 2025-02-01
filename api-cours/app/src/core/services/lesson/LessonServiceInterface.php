<?php

namespace apiCours\core\services\lesson;

use apiCours\core\dto\lesson\LessonDTO;

interface LessonServiceInterface
{
    public function getALlLessons(): array;

    public function getLessonById(int $id): LessonDTO;
}