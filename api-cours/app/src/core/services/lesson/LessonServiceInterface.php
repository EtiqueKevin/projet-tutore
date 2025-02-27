<?php

namespace apiCours\core\services\lesson;

use apiCours\core\dto\lesson\ContentDTO;
use apiCours\core\dto\lesson\LessonDTO;
use apiCours\core\dto\lesson\LessonExeciseDTO;
use apiCours\core\dto\lesson\LessonModuleUtilisateurConnecteDTO;
use apiCours\core\dto\lesson\UneLessonDTO;

interface LessonServiceInterface
{
    public function getALlLessons(): array;

    public function getLessonByModuleId(string $moduleId): array;
    public function getLessonByModuleIdUtilisateur(LessonModuleUtilisateurConnecteDTO $LMUCD): array;
    public function getLessonById(UneLessonDTO $ulD): LessonDTO;
    public function createLesson(LessonDTO $lessonDTO): string;
    public function updateLesson(LessonDTO $lessonDTO): void;
    public function deleteLesson(string $id): void;
    public function getExerciseLesson(LessonExeciseDTO $ld): ContentDTO;
    public function getLessonErreurs(string $idLesson): array;
}