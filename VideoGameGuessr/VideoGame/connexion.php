<?php
function makeConnexion(){
    $host = 'localhost';
    $db   = 'videogame';
    $user = 'root';
    $pass = '';
    $port = "3308";
    $dsn = "mysql:host=$host;dbname=$db;port=$port";
    $pdo = new \PDO($dsn, $user, $pass);
    return $pdo;
}
