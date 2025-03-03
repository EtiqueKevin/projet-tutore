<?php

namespace apiUtilisateur\application\actions\user;

use apiUtilisateur\application\actions\AbstractAction;
use apiUtilisateur\core\dto\user\InputUserDTO;
use apiUtilisateur\core\services\user\UsersServiceInterface;
use Exception;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Slim\Exception\HttpBadRequestException;

class CreateUtilisateurAction extends AbstractAction
{
    private UsersServiceInterface $utilisateurService;

    public function __construct(UsersServiceInterface $serviceUtilisateur)
    {
        $this->utilisateurService = $serviceUtilisateur;
    }

    /**
     * @throws Exception
     */
    public function __invoke(ServerRequestInterface $rq, ResponseInterface $rs, array $args): ResponseInterface
    {
        $params = $rq->getParsedBody() ?? null;

        if(!isset($params['name']) || !isset($params['surname']) || !isset($params['linkpic']) || !isset($params['pseudo'])){
            throw new HttpBadRequestException($rq, "Les paramètres name, surname, linkpic et pseudo sont obligatoires.");
        }


        try{
            $this->utilisateurService->save(new InputUserDTO($params['id'],$params['name'],$params['surname'],$params['linkpic'], $params['pseudo']));
        }catch (Exception $e){
            throw new HttpBadRequestException($rq, $e->getMessage());
        }
        return $rs->withStatus(201);
    }
}