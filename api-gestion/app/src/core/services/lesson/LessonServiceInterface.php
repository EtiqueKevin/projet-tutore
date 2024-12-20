<?php

namespace apiGestion\core\services\lesson;

use apiGestion\core\dto\lesson\LessonDTO;

interface LessonServiceInterface
{
    public function getALlLessons(): array;

    public function getLessonById(int $id): LessonDTO;
}