<?php

namespace apiCours\core\services\module;

use apiCours\core\dto\module\ModuleDTO;
use apiCours\core\dto\module\searchModuleDTO;
use Ramsey\Uuid\Uuid;

interface ModuleServiceInterface
{
    public function getAllModules(searchModuleDTO $searchDTO);
    public function getModuleById(string $id);
    public function createModule(ModuleDTO $module);
    public function updateModule(ModuleDTO $module);
    public function deleteModule(string $id);
    public function changeToJohnDoe(string $id);
    public function liaisonModuleLesson(string $idLesson, string $idModule):void;
}