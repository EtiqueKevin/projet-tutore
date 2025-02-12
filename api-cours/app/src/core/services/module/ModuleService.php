<?php

namespace apiCours\core\services\module;

use apiCours\core\dto\module\ModuleDTO;
use apiCours\core\repositoryInterface\ModuleRepositoryInterface;
use Ramsey\Uuid\Uuid;

class ModuleService implements ModuleServiceInterface
{
    private ModuleRepositoryInterface $moduleRepository;

    public function __construct(ModuleRepositoryInterface $moduleRepository)
    {
        $this->moduleRepository = $moduleRepository;
    }

    public function getAllModules()
    {
        $modules = $this->moduleRepository->getAllModules();
        $modulesDTO = [];
        foreach ($modules as $module) {
            $modulesDTO[] = $module->toDTO();
        }
        return $modulesDTO;
    }

    public function getModuleById(string $id)
    {
        $module = $this->moduleRepository->getModuleById($id);
        $module = $module->toDTO();
        return $module;
    }

    public function createModule(ModuleDTO $module)
    {
        $module = $module->toEntity();
        $newModule = $this->moduleRepository->createModule($module);
        $moduleDTO = $newModule->toDTO();
        return $moduleDTO;
    }

    public function updateModule(ModuleDTO $module)
    {
        $module = $module->toEntity();
        $newModule = $this->moduleRepository->updateModule($module);
        $moduleDTO = $newModule->toDTO();
        return $moduleDTO;
    }

    public function deleteModule(string $id)
    {
        $this->moduleRepository->deleteModule($id);
    }
}