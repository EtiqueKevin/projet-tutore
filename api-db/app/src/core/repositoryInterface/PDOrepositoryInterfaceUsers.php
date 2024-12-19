<?php

namespace apiDB\core\repositoryInterface;

interface PDOrepositoryInterfaceUsers{

    function getUsersById(string $id) : User;

}