<?php

namespace apiAuth\infrastructure\adaptater;

use apiAuth\core\domain\entities\user\User;
use apiAuth\core\repositoryInterface\UtilisateurRepositoryInterface;

class AdaptaterUtilisateurRepository implements UtilisateurRepositoryInterface
{
    private $client;

    public function __construct($client)
    {
        $this->client = $client;
    }
    public function createUtilisateur(User $user): void
    {
        $this->client->post('/user', [
            'json' => ['id' => $user->getID(), 'name' => $user->name, 'surname' => $user->surname, 'linkpic' => $user->linkpic, 'pseudo'=> $user->pseudo],
        ]);
    }
}