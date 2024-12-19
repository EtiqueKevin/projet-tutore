<?php

use apiGestion\application\providers\auth\AuthProvider;
use apiGestion\application\providers\auth\AuthProviderInterface;
use apiGestion\application\providers\auth\JWTManager;
use Psr\Container\ContainerInterface;

return [


    //JWT
    JWTManager::class => function(ContainerInterface $c){
        return new JWTManager($c->get('SECRET_KEY'));
    },

];