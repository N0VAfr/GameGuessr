<?php
require_once("todayGame.php");
if(getTodayGame() === false){
    $today = null;
}else{
    $today = getTodayGame()[0];
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="style.css">
    <title>Title</title>
</head>
<body>
    <div id="wrapper">
        <input type="hidden" id="todayId" value="<?php echo $today?>">
        <label for="guestGame">
            Guest The Game
        </label>
        <input id="guestGame" name="guestGame" type="text" value="">
        <button id="searchGame" onclick="getGameByName()">Rechercher</button>
        <div id="result">
            <p id="idGame"></p>
        </div>

        <p id="valid"></p>


        <div id="card-container"></div>

        <div id="output">
            <a href="../index.html">Retour au menu</a>
        </div>
    </div>
    <script src="app.js"></script>
</body>
</html>