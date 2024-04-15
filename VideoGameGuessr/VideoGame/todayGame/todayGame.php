<?php
require_once("../connexion.php");
function getTodayGame()
{
    $pdo = makeConnexion();
    $sql = "SELECT * FROM randomgameoftheday WHERE date = CURDATE()";
    $stmt= $pdo->prepare($sql);
    $stmt->execute();
    $result = $stmt->fetchAll();
    if(empty($result)){
        return array("nom");
    }
    foreach ( $result as $row){
        $idGameHash = $row["idGame"];
        $dateHash = hash('sha256', $row["date"]);
        $nameHash = hash('sha256', $row["name"]);
        $genreHash = hash('sha256', $row["genre"]);
        $releasedHash = hash('sha256', $row["released"]);
        $esrbHash = hash('sha256', $row["esrb"]);
        $scoreHash = hash('sha256', $row["score"]);
    }
    return array($idGameHash,$dateHash,$nameHash,$genreHash,$releasedHash,$esrbHash,$scoreHash);
}






