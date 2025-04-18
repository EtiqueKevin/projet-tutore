<?php

namespace apiCours\core\services\lesson;

use apiCours\core\domain\entities\lesson\Erreur;
use apiCours\core\dto\lesson\ContentDTO;
use apiCours\core\dto\lesson\ErreurDTO;
use apiCours\core\dto\lesson\LessonDTO;
use apiCours\core\dto\lesson\LessonExeciseDTO;
use apiCours\core\dto\lesson\LessonModuleUtilisateurConnecteDTO;
use apiCours\core\dto\lesson\UneLessonDTO;
use apiCours\core\repositoryInterface\LessonRepositoryException;
use apiCours\core\repositoryInterface\LessonRepositoryInterface;
use apiCours\core\repositoryInterface\UtilisateurRepositoryInterface;

class LessonService implements LessonServiceInterface
{

    private LessonRepositoryInterface $lessonRepository;

    private UtilisateurRepositoryInterface $utilisateurRepository;

    public function __construct(LessonRepositoryInterface $lessonRepository, UtilisateurRepositoryInterface $utilisateurRepository)
    {
        $this->lessonRepository = $lessonRepository;
        $this->utilisateurRepository = $utilisateurRepository;
    }

    public function getALlLessons(): array
    {
        $lessons = $this->lessonRepository->getALlLessons();
        $tabLessonDTO = [];

        foreach ($lessons as $lesson) {
          $tabLessonDTO[] = $lesson->toDTO();
        }
        return $tabLessonDTO;
    }

    public function getLessonById(UneLessonDTO $ulD): LessonDTO
    {
        $lesson = $this->lessonRepository->getLessonById($ulD->id);
        $lessonDTO = $lesson->toDTO();
        if($ulD->token !== null){
            $status = $this->utilisateurRepository->getLessonStatus($ulD->token ,$ulD->id);
            $lessonDTO->setStatus($status);
        }
        return $lessonDTO;
    }

    public function createLesson(LessonDTO $lessonDTO): string
    {
        try{
            $res =$this->lessonRepository->createLesson($lessonDTO->jsonSerialize());
            return $res;
        }catch (\Exception $e){
            throw new LessonRepositoryException($e->getMessage());
        }

    }

    public function updateLesson(LessonDTO $lessonDTO): void
    {
        try{
            $this->lessonRepository->updateLesson($lessonDTO->jsonSerialize());
        }catch (\Exception $e){
            throw new LessonRepositoryException($e->getMessage());
        }
    }

    public function deleteLesson(string $id): void
    {
        try {
            $this->lessonRepository->deleteLesson($id);
        }catch (\Exception $e){
            throw new LessonRepositoryException($e->getMessage());
        }

    }

    public function getLessonByModuleId(string $moduleId): array
    {
         $res = $this->lessonRepository->getLessonByModuleId($moduleId);
        $tabLessonDTO = [];
         foreach ($res as $lesson) {
             $tabLessonDTO[] = $lesson->toDTO();
         }
        return $tabLessonDTO;
           $retour = 2;
    }

    public function getLessonByModuleIdUtilisateur(LessonModuleUtilisateurConnecteDTO $LMUCD): array{

        $lessonsTabStatus = $this->utilisateurRepository->getLessonsStatus($LMUCD->token);

        $res = $this->lessonRepository->getLessonByModuleId($LMUCD->id_module);
        $tabLessonDTO = [];
        foreach ($res as $lesson) {
            $lessonDTO = $lesson->toDTO();

            if(isset($lessonsTabStatus[$lesson->getId()])){
                if($lessonsTabStatus[$lesson->getId()]){
                    $lessonDTO->setStatus(1);
                }else{
                    $lessonDTO->setStatus(0);

                }
            }else{
                $lessonDTO->setStatus(2);
            }

            $tabLessonDTO[] = $lessonDTO;
        }
        return $tabLessonDTO;
    }

    public function getExerciseLesson(LessonExeciseDTO $ld): ContentDTO
    {
        $res = $this->lessonRepository->getExerciseLesson($ld->idLesson, $ld->indexExercise);
        return $res->toDTO();
    }

    public function getLessonErreurs(string $idLesson): array{
        try{
            return $this->lessonRepository->getLessonErreurs($idLesson);
        }catch (\Exception $e){
            throw new LessonRepositoryException($e->getMessage());
        }
    }

    public function postLessonErreurs(ErreurDTO $erreurDTO): void{
        try{
            $this->lessonRepository->postLessonErreurs(new Erreur($erreurDTO->id_lesson, $erreurDTO->getErrors()));

        }catch (\Exception $e){
            throw new LessonRepositoryException($e->getMessage());
        }

    }
}