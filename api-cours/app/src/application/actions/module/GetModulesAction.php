<?php

namespace apiCours\application\actions\module;

use apiCours\application\actions\AbstractAction;
use apiCours\core\dto\module\searchModuleDTO;
use apiCours\core\services\module\ModuleServiceInterface;
use Exception;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Slim\Exception\HttpBadRequestException;

class GetModulesAction extends AbstractAction
{
    private ModuleServiceInterface $moduleService;

    public function __construct(ModuleServiceInterface $ms)
    {
        $this->moduleService = $ms;
    }

    public function __invoke(ServerRequestInterface $rq, ResponseInterface $rs, array $args): ResponseInterface
    {
        $query = $rq->getQueryParams();
        $nameS = $query["name"] ?? '';
        $descS = $query["description"] ?? '';
        $connecte = $query["connecte"] ?? '';

        $modules =[];

        if($connecte === "oui"){
            try{
                preg_match('/Bearer\s(\S+)/', $rq->getHeaderLine('Authorization'), $matches);
                $token = $matches[1];
            }catch (Exception $e) {
                throw new HttpBadRequestException($rq, "Il manque le token");
            }

            try {
                $modules = $this->moduleService->getAllModulesUtilisateur(new SearchModuleDTO($nameS, $descS,$token));
            }catch (\Exception $e) {
                throw new HttpBadRequestException($rq, $e->getMessage());
            }
        }else{
            try {
                $modules = $this->moduleService->getAllModules(new SearchModuleDTO($nameS, $descS));
            }catch (\Exception $e) {
                throw new HttpBadRequestException($rq, $e->getMessage());
            }
        }


        $res = [
            'type' => 'resource',
            'modules' => $modules
        ];

        $rs->getBody()->write(json_encode($res));
        return $rs->withStatus(200)->withHeader('Content-Type', 'application/json');
    }
}