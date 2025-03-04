<?php

namespace apiCours\core\domain\entities\lesson;

use apiCours\core\domain\entities\Entity;
use apiCours\core\dto\lesson\QuestionDTO;

class Question extends Entity
{
    protected string $question;
    protected array $options;
    protected string $correctAnswer;

    public function __construct(string $q, array $options, string $cA ){
        $this->question = $q;
        $this->options = $options;
        $this->correctAnswer = $cA;
    }

    public function toDTO() : QuestionDTO{
        return new QuestionDTO($this->question, $this->options, $this->correctAnswer);
    }

}