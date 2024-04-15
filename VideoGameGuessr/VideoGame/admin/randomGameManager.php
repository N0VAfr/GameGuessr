<?php


require

$gameManager = new GameManager();

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

$gameManager->searchGame($idHash,$dateGame,$nameGame,$genreGame,$releasedGame,$esrbGame,$scoreGame);

echo "true";
header("location:index.html");
?>
