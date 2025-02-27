<?php

namespace apiCours\core\dto\lesson;

class UneLessonDTO
{

    public string $id;
    public ?string $token;

    public function __construct(string $id, string $token = null){
        $this->id = $id;
        $this->token = $token;
    }
}