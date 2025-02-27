<?php

namespace apiCours\core\dto\lesson;

class LessonModuleUtilisateurConnecteDTO extends LessonDTO
{

    public string $id_module;
    public string $token;

    public function __construct(string $id_module, string $token)
    {
        $this->id_module = $id_module;
        $this->token = $token;
    }

}