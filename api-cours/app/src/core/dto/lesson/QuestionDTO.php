<?php

namespace apiCours\core\dto\lesson;

use apiCours\core\dto\DTO;

class QuestionDTO extends DTO
{

    protected string $question;
    protected array $options;
    protected string $correctAnswer;

    public function __construct(string $q, array $options, string $cA){
        $this->question = $q;
        $this->options = $options;
        $this->correctAnswer = $cA;
    }

    public function jsonSerialize(): array{
        return [
            'question' => $this->question,
            'options' => $this->options,
            'correctAnswer' => $this->correctAnswer
        ];
    }

}