<?php

namespace apiGestion\infrastructure;

use apiGestion\core\domain\entities\lesson\Content;
use apiGestion\core\domain\entities\lesson\Lesson;
use apiGestion\core\repositoryInterface\LessonRepositoryInterface;

class LessonRepository implements LessonRepositoryInterface
{

    public function getALlLessons(): array
    {
        return [];
    }

    public function getLessonById(int $id): Lesson
    {
        $content1 = new Content("text", "Le premier text de la leçon", null);
        $content2 = new Content("exercise", null, "https://www.youtube.com/watch?v=JGwWNGJdvx8");
        $content1->setId(1);
        $content2->setId(2);
        $lesson = new Lesson('title', 'description', [$content1, $content2]);
        $lesson->setId($id);
        return $lesson;
    }
}