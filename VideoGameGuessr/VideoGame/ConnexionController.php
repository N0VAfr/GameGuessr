<?php

class ConnexionController
{
    public PDO $pdo;
    public function __construct()
    {
        $host = 'localhost';
        $db   = 'videogame';
        $user = 'root';
        $pass = '';
        $port = "3308";
        $dsn = "mysql:host=$host;dbname=$db;port=$port";
        $this->pdo = new \PDO($dsn, $user, $pass);
    }


}