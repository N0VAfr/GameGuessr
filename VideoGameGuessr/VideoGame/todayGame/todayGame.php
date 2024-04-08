<?php
require_once("../connexion.php");
function getTodayGame()
{
    $pdo = makeConnexion();
    $sql = "SELECT * FROM randomgameoftheday WHERE date = CURDATE()";
    $stmt= $pdo->prepare($sql);
    $stmt->execute();
    $result = $stmt->fetchAll();
    foreach ( $result as $row){
        $idGame = $row["idGame"];
    }
    return $idGame;
}






