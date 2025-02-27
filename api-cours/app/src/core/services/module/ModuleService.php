<?php

namespace apiCours\core\services\module;

use apiCours\core\dto\module\ModuleDTO;
use apiCours\core\repositoryInterface\ModuleRepositoryException;
use apiCours\core\repositoryInterface\ModuleRepositoryInterface;
use apiCours\core\repositoryInterface\ModuleRepositoryNotFoundException;
use apiCours\core\dto\module\searchModuleDTO;
use apiCours\core\repositoryInterface\UtilisateurRepositoryInterface;
use Ramsey\Uuid\Uuid;
use function PHPUnit\Framework\isEmpty;

class ModuleService implements ModuleServiceInterface
{
    private ModuleRepositoryInterface $moduleRepository;

    private UtilisateurRepositoryInterface $utilisateurRepository;

    public function __construct(ModuleRepositoryInterface $moduleRepository, UtilisateurRepositoryInterface $utilisateurRepository)
    {
        $this->moduleRepository = $moduleRepository;
        $this->utilisateurRepository = $utilisateurRepository;
    }

    public function getAllModules(searchModuleDTO $searchDTO)
    {
        try {
            $modules = $this->moduleRepository->getAllModules($searchDTO->name, $searchDTO->description);
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

    public function getAllModulesUtilisateur(searchModuleDTO $searchDTO): array{
        try {
            $modulesTabStatus = $this->utilisateurRepository->getModulesStatus($searchDTO->token);

            $modules = $this->moduleRepository->getAllModules($searchDTO->name, $searchDTO->description);
            $modulesDTO = [];
            foreach ($modules as $module) {
                $moduleDTO = $module->toDTO();
                if(isset($modulesTabStatus[$module->getId()])){
                    if($modulesTabStatus[$module->getId()]){
                        $moduleDTO->setStatus(1);
                    }else{
                        $moduleDTO->setStatus(0);
                    }
                }else{
                    $moduleDTO->setStatus(2);
                }
                $modulesDTO[] = $moduleDTO;
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

    public function decrementationModuleLesson(string $idModule):void{
        try{
            $this->moduleRepository->decrementationModuleLesson($idModule);
        }catch (\Exception $e){
            throw new ModuleServiceException($e->getMessage());
        }
    }

    public function getModulesByCreater(searchModuleDTO $searchDTO)
    {
        try {
            $modules = $this->moduleRepository->getModulesByCreater($searchDTO->name, $searchDTO->description,$searchDTO->id_creater);
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

    public function getModuleByLesson(string $idLesson): ModuleDTO
    {
        try {
            $module = $this->moduleRepository->getModuleByLessonId($idLesson);
            return $module->toDTO();
        } catch (ModuleRepositoryException $e) {
            throw new ModuleServiceException($e->getMessage());
        } catch (ModuleRepositoryNotFoundException $e) {
            throw new ModuleServiceNotFoundException($e->getMessage());
        }
    }
}