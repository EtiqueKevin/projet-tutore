
<?php


use gateway\application\actions\GeneriqueCoursAction;
use gateway\application\actions\GeneriqueExecutionAction;
use gateway\application\actions\GeneriqueUtilisateurAction;
use gateway\application\actions\GeneriqueAuthnAction;
use gateway\application\middleware\AuthMiddleware;
use GuzzleHttp\Client;
use Psr\Container\ContainerInterface;
return [

    GeneriqueCoursAction::class => function (ContainerInterface $c){
        return new GeneriqueCoursAction($c->get('client_cours'));
    },

    GeneriqueUtilisateurAction::class => function (ContainerInterface $c){
        return new GeneriqueUtilisateurAction($c->get('client_utilisateur'));
    },

    GeneriqueExecutionAction::class => function (ContainerInterface $c){
        return new GeneriqueExecutionAction($c->get('client_execution'));
    },

    GeneriqueAuthnAction::class => function (ContainerInterface $c){
        return new GeneriqueAuthnAction($c->get('client_authn'));
    },

    AuthMiddleware::class => function (ContainerInterface $c) {
        return new AuthMiddleware($c->get('client_auth'));
    },


];

