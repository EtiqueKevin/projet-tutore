<?php
declare(strict_types=1);

use apiAuth\application\actions\DeleteUserByIdAction;
use apiAuth\application\actions\GetEmailByIdAction;
use apiAuth\application\actions\GetRoleByIdAction;
use apiAuth\application\actions\GetUserIdAction;
use apiAuth\application\actions\HomeAction;
use apiAuth\application\actions\PutRoleUtilisateurAction;
use apiAuth\application\actions\RefreshAction;
use apiAuth\application\actions\RegisterAction;
use apiAuth\application\actions\SignInAction;
use apiAuth\application\actions\ValidateAction;
use apiAuth\application\middleware\AuthMiddleware;
use apiAuth\application\middleware\AuthzMiddleware;
use Slim\App;

return function( App $app): App {

    //$app->add(Cors::class);
/*
    $app->options('/{routes:.+}',
        function( Request $rq,
                  Response $rs, array $args) : Response {
            return $rs;
        });
*/

    $app->get('/',HomeAction::class);

    $app->post('/signin[/]',SignInAction::class)
        ->setName('tokenSignin');

    $app->post('/register[/]',RegisterAction::class)
        ->setName('tokenRegister');

    $app->post('/token/refresh[/]',RefreshAction::class)
        ->setName('tokenRefresh');

    $app->post('/token/validate[/]',ValidateAction::class)
        ->setName('tokenValidate');

    $app->post('/token/users/id', GetUserIdAction::class)
        ->setName('tokenUsersId');

    $app->delete('/users/{id}', DeleteUserByIdAction::class)
        ->setName('deleteUser');

    $app->get('/users/{id}/role', GetRoleByIdAction::class)
        ->setName('getRoleById');

    $app->get('/users/{id}/email', GetEmailByIdAction::class)
        ->setName('getEmailById');

    $app->put('/users/{ID-USER}/role[/]', PutRoleUtilisateurAction::class)
        ->add(AuthzMiddleware::class)
        ->add(AuthMiddleware::class)
        ->setName('updateRole');

    return $app;
};