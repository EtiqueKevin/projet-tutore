<?php

namespace apiUtilisateur\infrastructure\adaptater;

use apiUtilisateur\core\repositoryInterface\CoursRepositoryInterface;

class AdaptaterCoursRepository implements CoursRepositoryInterface
{
    private $client;

    public function __construct($client)
    {
        $this->client = $client;
    }

    public function changeToJohnDoe(string $id): void
    {
        $this->client->put('/users/'.$id. '/modules/changeToJohnDoe');
    }
}