<?php

namespace apiCours\infrastructure;

use apiCours\core\repositoryInterface\UtilisateurRepositoryInterface;

class AdapterUtilisateurRepository implements UtilisateurRepositoryInterface
{
    private $client;

    public function __construct($client)
    {
        $this->client = $client;
    }

    public function getModulesStatus(string $token): array
    {
        $reponse = $this->client->post('/modules/status', [
            'headers' => ['Authorization' => 'Bearer '.$token]
        ]);

        $data = json_decode($reponse->getBody()->getContents(), true);
        return $data["modules"];

    }

    public function getLessonsStatus(string $token): array
    {
        $reponse = $this->client->post('/lessons/status', [
            'headers' => ['Authorization' => 'Bearer '.$token]
        ]);

        $data = json_decode($reponse->getBody()->getContents(), true);
        return $data["lessons"];
    }
}