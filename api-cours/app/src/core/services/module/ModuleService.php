<?php

namespace apiCours\core\services\module;

use apiCours\core\dto\module\ModuleDTO;
use apiCours\core\repositoryInterface\ModuleRepositoryException;
use apiCours\core\repositoryInterface\ModuleRepositoryInterface;
use apiCours\core\repositoryInterface\ModuleRepositoryNotFoundException;
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
        try {
            $modules = $this->moduleRepository->getAllModules();
            $modulesDTO = [];
            foreach ($modules as $module) {
                $modulesDTO[] = $module->toDTO();
            }
            return $modulesDTO;
        } catch (ModuleRepositoryException $e) {
            throw new ModuleServiceException($e->getMessage());
        } catch (ModuleRepositoryNotFoundException $e) {
            throw new ModuleServiceNotFoundException($e->getMessage());
        }
    }

    public function getModuleById(string $id)
    {
        try {
            $module = $this->moduleRepository->getModuleById($id);
            $module = $module->toDTO();
            return $module;
        }catch(ModuleServiceException $e) {
            throw new ModuleServiceException($e->getMessage());
        }catch (ModuleServiceNotFoundException $e) {
            throw new ModuleServiceNotFoundException($e->getMessage());
        }
    }

    public function createModule(ModuleDTO $module)
    {
        try {
            $module = $module->toEntity();
            $newModule = $this->moduleRepository->createModule($module);
            $moduleDTO = $newModule->toDTO();
            return $moduleDTO;
        } catch (\Exception $e) {
            throw new ModuleServiceException($e->getMessage());
        }
    }

    public function updateModule(ModuleDTO $module)
    {
        try {
            $module = $module->toEntity();
            $this->moduleRepository->updateModule($module);
        }catch (\Exception $e) {
            throw new ModuleServiceException($e->getMessage());
        }
    }

    public function deleteModule(string $id)
    {
        try {
            $this->moduleRepository->deleteModule($id);
        }catch (\Exception $e) {
            throw new ModuleServiceException($e->getMessage());
        }
    }

    public function changeToJohnDoe(string $id)
    {
        try {
            $this->moduleRepository->changeToJohnDoe($id);
        }catch (\Exception $e) {
            throw new ModuleServiceException($e->getMessage());
        }
    }

    public function liaisonModuleLesson(string $idLesson, string $idModule):void{
        try{
            $this->moduleRepository->liaisonModuleLesson($idLesson,$idModule);
        }catch (\Exception $e){
            throw new ModuleServiceException($e->getMessage());
        }
    }
}