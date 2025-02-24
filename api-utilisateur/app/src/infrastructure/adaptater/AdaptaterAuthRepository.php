<?php

namespace apiUtilisateur\infrastructure\adaptater;

use apiUtilisateur\core\repositoryInterface\AuthRepositoryInterface;

class AdaptaterAuthRepository implements AuthRepositoryInterface
{
    private $client;

    public function __construct($client)
    {
        $this->client = $client;
    }

    public function getUtilisateurId(string $token): string
    {
        $response = $this->client->post('/token/users/id', [
            'headers' => ['Authorization' => 'Bearer '.$token]
        ]);
        $data = json_decode($response->getBody()->getContents(), true);
        return $data["userID"];
    }

    public function suppUtilisateurById(string $id): void
    {
        $this->client->delete('/users/'.$id);
    }
}