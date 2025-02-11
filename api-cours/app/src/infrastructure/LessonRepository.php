<?php

namespace apiCours\infrastructure;

use apiCours\core\domain\entities\lesson\Content;
use apiCours\core\domain\entities\lesson\Lesson;
use apiCours\core\dto\lesson\LessonDTO;
use apiCours\core\repositoryInterface\LessonRepositoryInterface;

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
        $lesson = new Lesson('title', 'description', [$content1, $content2]);
        $lesson->setId($id);
        return $lesson;
    }

    public function createLesson(Lesson $lesson): Lesson
    {
        $lesson->setId(1);
        return $lesson;
    }

    public function updateLesson(Lesson $lesson): Lesson
    {
        return $lesson;
    }
}