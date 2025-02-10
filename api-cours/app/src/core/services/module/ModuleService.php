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
        return $modules;
    }

    public function getModuleById(string $id)
    {
        // TODO: Implement getModuleById() method.
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
        // TODO: Implement updateModule() method.
    }

    public function deleteModule(string $id)
    {
        // TODO: Implement deleteModule() method.
    }
}