const idGame = document.getElementById('idGame');
const dateGame = document.getElementById('dateGame');
const nameGame = document.getElementById('nameGame');
const genreGame = document.getElementById('genreGame');
const releasedGame = document.getElementById('releasedGame');
const esrbGame = document.getElementById('esrbGame');
const platformsGame = document.getElementById('platformsGame');
const metacriticGame = document.getElementById('metacriticGame');
const imgGame = document.getElementById('imgGame');

dateGame.value = new Date(Date.now()).toISOString().split('T')[0];
// Function to fetch a random video game name from the RAWG API
async function getRandomGameName() {

    let randomPage = Math.floor(Math.random() * 10)+1;
    // Fetch data from RAWG API
    const response = await fetch(`https://api.rawg.io/api/games?page=${randomPage}&key=67cfcc1cf5f24a0182d119ea30559a3a`);
    const data = await response.json();

    // Get a random index within the range of total games
    const randomIndex = Math.floor(Math.random() * data.results.length);

    // Get the name of the random game
    const randomGame = data.results[randomIndex];

    genreGame.value = "";

    if (randomGame.genres !== null){
        for (let i = 0; i < randomGame.genres.length; i++) {
            if (genreGame.value !== ""){
                genreGame.value += `,${randomGame.genres[i].name}`;
            }
            else{
                genreGame.value += randomGame.genres[i].name;
            }
        }
    }
    platformsGame.value = "";
    if (randomGame.value !== null){
        for (let i = 0; i < randomGame.platforms.length; i++) {
            if (platformsGame.value !== ""){
                platformsGame.value += `,${randomGame.platforms[i].platform.name}`;
            }
            else{
                platformsGame.value += randomGame.platforms[i].platform.name;
            }
        }
    }



    idGame.value = randomGame.id;

    nameGame.value = randomGame.name;
    releasedGame.value = randomGame.released;
    if (randomGame.esrb_rating !== null){
        esrbGame.value = randomGame.esrb_rating.name;
    }
    metacriticGame.value = randomGame.metacritic;
    imgGame.src = randomGame.background_image;

    console.log(randomGame);

    return randomGame;
}




