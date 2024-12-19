<?php

namespace apiGestion\core\repositoryInterface;

interface UserRepositoryInterface{

    function getUserByID($userID): User;

}