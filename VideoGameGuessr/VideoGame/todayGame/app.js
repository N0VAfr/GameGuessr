const cardContainer = document.getElementById('card-container');
const id = document.getElementById("todayId")
if (id.value === "Pas de jeu aujourd'hui"){
    id.type = "";
}


function createCard(title, img, genre, released, esrb, score) {
    const card = document.createElement('div');
    card.classList.add('card');

    const cardTitle = document.createElement('h2');
    cardTitle.textContent = title;

    const cardContentImage = document.createElement('img');
    cardContentImage.src = img;
    cardContentImage.style = "height:200px; width:auto;";

    const cardContentGenre = document.createElement('p');
    cardContentGenre.textContent = "Genre : " + genre;

    const cardContentReleased = document.createElement('p');
    cardContentReleased.textContent = "Released : " + released;

    const cardContentEsrb = document.createElement('p');
    cardContentEsrb.textContent = "Esrb : " + esrb;

    const cardContentScore = document.createElement('p');
    cardContentScore.textContent = "Metacritic : " + score;

    card.appendChild(cardTitle);
    card.appendChild(cardContentImage);
    card.appendChild(cardContentGenre);
    card.appendChild(cardContentReleased);
    card.appendChild(cardContentEsrb);
    card.appendChild(cardContentScore);

    return card;
}


async function sha256(message) {
    // Encode message as UTF-8 and hash with SHA-256
    const hashBuffer = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(message));

    // Convert ArrayBuffer to hex string and return
    return Array.from(new Uint8Array(hashBuffer))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');
}


// Function to fetch a random video game name from the RAWG API
async function getGameByName() {
    let searchGame = document.getElementById("guestGame")
    // Fetch data from RAWG API
    const response = await fetch(`https://api.rawg.io/api/games?search=${searchGame.value}&key=67cfcc1cf5f24a0182d119ea30559a3a`);
    const data = await response.json();

    console.log(data)
    document.getElementById("idGame").textContent = data.results[0].id;
    isCorrect(data.results[0].id);

    let genres = "";
    if (data.results[0].genres !== null){

        for (let i = 0; i < data.results[0].genres.length; i++) {
            if (genres !== ""){
                genres += `,${data.results[0].genres[i].name}`;
            }
            else{
                genres += data.results[0].genres[i].name;
            }
        }
    }

    let esrbRating = "Not Rated"; // Default text for games without an ESRB rating
    if (data.results[0].esrb_rating !== null) {
        esrbRating = data.results[0].esrb_rating.name;
    }

    const card1 = createCard(
        "Nom : " + data.results[0].name,
        data.results[0].background_image,
        genres,
        data.results[0].released,


        esrbRating,
        data.results[0].metacritic
    );

    cardContainer.insertBefore(card1, cardContainer.firstChild);

    return data;
}

async function isCorrect(idGame) {
    let hash = await sha256(idGame.toString().trim());
    let todayIdTextContent = document.getElementById("todayId").value.trim();
    console.log(hash);
    console.log(todayIdTextContent);
    if (hash === todayIdTextContent) {
        document.getElementById("valid").textContent = "true";
    } else {
        document.getElementById("valid").textContent = "false";
    }
}





