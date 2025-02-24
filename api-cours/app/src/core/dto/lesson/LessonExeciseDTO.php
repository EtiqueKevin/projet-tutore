<?php

namespace apiCours\core\dto\lesson;

use apiCours\core\domain\entities\lesson\Lesson;

class LessonExeciseDTO
{
    public string $idLesson;
    public string $indexExercise;

    public function __construct(string $idLesson, string $indexExercise){
        $this->idLesson = $idLesson;
        $this->indexExercise = $indexExercise;
    }

}