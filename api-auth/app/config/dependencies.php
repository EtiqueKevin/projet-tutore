<?php


use apiAuth\application\actions\application\actions\RefreshAction;
use apiAuth\application\actions\application\actions\RegisterAction;
use apiAuth\application\actions\application\actions\SignInAction;
use apiAuth\application\actions\application\actions\ValidateAction;
use apiAuth\application\actions\application\providers\auth\AuthProvider;
use apiAuth\application\actions\application\providers\auth\AuthProviderInterface;
use apiAuth\application\actions\application\providers\auth\JWTManager;
use apiAuth\core\repositoryInterface\AuthRepositoryInterface;
use apiAuth\core\repositoryInterface\UtilisateurRepositoryInterface;
use apiAuth\core\services\auth\AuthService;
use apiAuth\core\services\auth\AuthServiceInterface;
use apiAuth\core\services\user\UserService;
use apiAuth\core\services\user\UserServiceInterface;
use apiAuth\infrastructure\adaptater\AdaptaterUtilisateurRepository;
use apiAuth\infrastructure\repositories\PDOAuthRepository;
use Psr\Container\ContainerInterface;

return [

    AuthRepositoryInterface::class => function (ContainerInterface $container) {
        return new  PDOAuthRepository( $container->get('auth.jeancademydb.pdo'));
    },

    UtilisateurRepositoryInterface::class => function (ContainerInterface $container) {
        return new AdaptaterUtilisateurRepository($container->get('client_utilisateur'));
    },

    AuthServiceInterface::class => function(ContainerInterface $c){
        return new AuthService($c->get(AuthRepositoryInterface::class));
    },

    UserServiceInterface::class => function(ContainerInterface $c){
    return new UserService($c->get(AuthRepositoryInterface::class),$c->get(UtilisateurRepositoryInterface::class));
    },

    AuthProviderInterface::class => function(ContainerInterface $c){
        return new AuthProvider($c->get(AuthServiceInterface::class),$c->get(JWTManager::class));
    },

    SignInAction::class => function(ContainerInterface $c){
        return new SignInAction($c->get(AuthProviderInterface::class));
    },

    RegisterAction::class => function(ContainerInterface $c){
        return new RegisterAction($c->get(UserServiceInterface::class), $c->get(AuthProviderInterface::class));
    },

    RefreshAction::class => function(ContainerInterface $c){
        return new RefreshAction($c->get(AuthProviderInterface::class));
    },

    ValidateAction::class => function(ContainerInterface $c){
        return new ValidateAction($c->get(AuthProviderInterface::class));
    },


    JWTManager::class => function(ContainerInterface $c){
        return new JWTManager($c->get('SECRET_KEY'));
    },

];