<?php


use apiAuth\application\actions\RefreshAction;
use apiAuth\application\actions\RegisterAction;
use apiAuth\application\actions\SignInAction;
use apiAuth\application\actions\ValidateAction;
use apiAuth\application\providers\auth\AuthProvider;
use apiAuth\application\providers\auth\AuthProviderInterface;
use apiAuth\application\providers\auth\JWTManager;
use apiAuth\core\repositoryInterface\AuthRepositoryInterface;
use apiAuth\core\services\auth\AuthService;
use apiAuth\core\services\auth\AuthServiceInterface;
use apiAuth\infrastructure\repositories\PDOAuthRepository;
use Psr\Container\ContainerInterface;

return [

    AuthRepositoryInterface::class => function (ContainerInterface $container) {
        return new  PDOAuthRepository( $container->get(AuthRepositoryInterface::class));
    },

    AuthServiceInterface::class => function(ContainerInterface $c){
        return new AuthService($c->get(AuthRepositoryInterface::class));
    },

    SignInAction::class => function(ContainerInterface $c){
        return new SignInAction($c->get(AuthProviderInterface::class));
    },

    RegisterAction::class => function(ContainerInterface $c){
        return new RegisterAction($c->get(AuthServiceInterface::class), $c->get(AuthProviderInterface::class));
    },

    RefreshAction::class => function(ContainerInterface $c){
        return new RefreshAction($c->get(AuthProviderInterface::class));
    },

    ValidateAction::class => function(ContainerInterface $c){
        return new ValidateAction($c->get(AuthProviderInterface::class));
    },

    AuthProviderInterface::class => function(ContainerInterface $c){
        return new AuthProvider($c->get(AuthServiceInterface::class),$c->get(JWTManager::class));
    },

    JWTManager::class => function(ContainerInterface $c){
        return new JWTManager($c->get('SECRET_KEY'));
    },

];