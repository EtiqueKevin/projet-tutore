<?php

namespace apiCours\core\repositoryInterface;

use apiCours\core\dto\module\ModuleDTO;
use apiCours\core\domain\entities\module\Module;
use Ramsey\Uuid\Uuid;

interface ModuleRepositoryInterface{
    public function getAllModules(string $nameSearch, string $descriptionSearch);
    public function getModuleById(string $id);
    public function createModule(Module $module);
    public function updateModule(Module $module);
    public function deleteModule(string $id);
    public function changeToJohnDoe(string $id);
    public function liaisonModuleLesson(string $idLesson, string $idModule):void;
    public function decrementationModuleLesson(string $idModule):void;
    public function getModuleByLessonId(string $idLesson);
}