<?php

use apiDB\core\repositoryInterface\RepositoryInterfaceUsers;
use apiDB\infrastructure\repository\PDOreposiroryUsers;
use Psr\Container\ContainerInterface;

return [


    RepositoryInterfaceUsers::class => function (ContainerInterface $container) {
        return new PDOReposiroryUsers($c->get('jeancademydb.pdo'));
    },


];