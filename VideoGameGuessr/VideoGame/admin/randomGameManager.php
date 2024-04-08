<?php
require_once("../connexion.php");

$pdo = makeConnexion();

$idGame = $_POST["idGame"];
$dateGame = $_POST["dateGame"];
$idHash = hash('sha256', $idGame);
$nameGame = $_POST["nameGame"];
$genreGame = $_POST["genreGame"];
$releasedGame = $_POST["releasedGame"];
$esrbGame = $_POST["esrbGame"];
$scoreGame = $_POST["scoreGame"];

// Check the length of the hash
if(strlen($idHash) != 64) {
    die("Hash length is not 64 characters.");
}

$sql = "SELECT * FROM randomgameoftheday";
$stmt= $pdo->prepare($sql);
$stmt->execute();
$result = $stmt->fetchAll();

foreach ($result as $row) {
    if ($row['idGame'] === $idHash) {
        die("Game already exists.");
    }
}

$sql = "INSERT INTO randomgameoftheday (idGame, date, name, genre, released, esrb, score) VALUES (:idGame, :date, :name, :genre, :released, :esrb, :score)";
$stmt= $pdo->prepare($sql);
$stmt->bindParam(':idGame', $idHash, PDO::PARAM_STR);
$stmt->bindParam(':date', $dateGame, PDO::PARAM_STR);
$stmt->bindParam(':name', $nameGame, PDO::PARAM_STR);
$stmt->bindParam(':genre', $genreGame, PDO::PARAM_STR);
$stmt->bindParam(':released', $releasedGame, PDO::PARAM_STR);
$stmt->bindParam(':esrb', $esrbGame, PDO::PARAM_STR);
$stmt->bindParam(':score', $scoreGame, PDO::PARAM_STR);

if (!$stmt->execute()) {
    die("Error executing SQL: " . $stmt->errorInfo()[2]);
}

echo "true";
header("location:index.html");
?>
