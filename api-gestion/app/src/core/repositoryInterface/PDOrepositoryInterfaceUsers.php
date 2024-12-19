<?php

namespace apiGestion\core\repositoryInterface;

interface PDOrepositoryInterfaceUsers{

    function getUserByID($userID): User;

}