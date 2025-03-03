<?php

namespace apiUtilisateur\application\actions\user;

use apiUtilisateur\application\actions\AbstractAction;
use apiUtilisateur\core\services\user\UsersServiceInterface;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Respect\Validation\Validator;
use Slim\Exception\HttpBadRequestException;

class PostStartLessonAction extends AbstractAction
{
    private UsersServiceInterface $userService;

    public function __construct(UsersServiceInterface $userService)
    {
        $this->userService = $userService;
    }

    public function __invoke(ServerRequestInterface $rq, ResponseInterface $rs, array $args): ResponseInterface
    {
        try {
            $idLesson = $args['ID-LESSON'];

            if (!Validator::uuid()->validate($idLesson)) {
                throw new HttpBadRequestException('id de la leçon invalide');
            }

            $idUser = $rq->getAttribute('idUser');
            preg_match('/Bearer\s(\S+)/', $rq->getHeaderLine('Authorization'), $matches);
            $token = $matches[1];
            $this->userService->startLesson($idUser, $idLesson, $token);
        }catch (\Exception $e){
            throw new HttpBadRequestException($rq, $e->getMessage());
        }

        return $rs->withStatus(200)->withHeader('Content-Type', 'application/json');
    }
}