const getArtist = async (query, token) => {
    const url = `https://api.spotify.com/v1/search?q=${query}&type=artist`;
    const headers = {
        'Authorization': `Bearer ${token}`,
    };
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: headers,
        });

        const data = await response.json();

        if (response.ok) {
            console.log(data.artists.items[0]);
            return data.artists.items[0]; // or handle the token as needed
        } else {
            console.error('Spotify API token request failed:', data);
            return null;
        }
    } catch (error) {
        console.error('Error fetching Spotify API token:', error);
        return null;
    }
};

const getToken = async () => {
    const url = 'https://accounts.spotify.com/api/token';
    const headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
    };

    const params = new URLSearchParams();
    params.append('grant_type', 'client_credentials');
    params.append('client_id', "9785af84e8064991a1b1eab47f5c3422");
    params.append('client_secret', "f7b3e7238ec347d4b1079ab37b2bd33b");

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: headers,
            body: params,
        });

        const data = await response.json();

        if (response.ok) {
            return data.access_token; // or handle the token as needed
        } else {
            console.error('Spotify API token request failed:', data);
            return null;
        }
    } catch (error) {
        console.error('Error fetching Spotify API token:', error);
        return null;
    }
};

const getTopTracks = async (id, token) => {
    const url = `https://api.spotify.com/v1/artists/${id}/top-tracks`;
    const headers = {
        'Authorization': `Bearer ${token}`,
    };
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: headers,
        });

        const data = await response.json();

        if (response.ok) {
            console.log(data);
            return data; // or handle the token as needed
        } else {
            console.error('Spotify API token request failed:', data);
            return null;
        }
    } catch (error) {
        console.error('Error fetching Spotify API token:', error);
        return null;
    }
}
const getAlbum = async (id, token) => {
    const url = `https://api.spotify.com/v1/artists/${id}/albums`;
    const headers = {
        'Authorization': `Bearer ${token}`,
    };
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: headers,
        });

        const data = await response.json();

        if (response.ok) {
            console.log(data);
            return data; // or handle the token as needed
        } else {
            console.error('Spotify API token request failed:', data);
            return null;
        }
    } catch (error) {
        console.error('Error fetching Spotify API token:', error);
        return null;
    }
}

function msToTime(duration) {
    let milliseconds = Math.floor((duration % 1000) / 100),
        seconds = Math.floor((duration / 1000) % 60),
        minutes = Math.floor((duration / (1000 * 60)) % 60),
        hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;


    return hours + "h " + minutes + "min " + seconds;
}

getToken().then(token => {

    let output = document.getElementById("output");

    document.getElementById('form').onsubmit = function(event) {
        // Prevent the form from submitting
        event.preventDefault();

        getArtist(document.forms["form"]["search"].value, token).then(artist => {

            getTopTracks(artist.id, token).then(topTracks => {

                getAlbum(artist.id, token).then(albums =>{
                    document.getElementById("artist").textContent = "Nom de l'artiste : " + artist.name;
                    document.getElementById("genre").textContent = "Genre(s) de l'artiste : " + artist.genres;
                    document.getElementById("followers").textContent = "Nombre de follower de l'artiste (Spotify) : " + artist.followers.total;
                    document.getElementById("image").src = artist.images[1].url
                    document.getElementById("topTrack").textContent = "La musique la plus populaire : " + topTracks.tracks[0].name;
                    document.getElementById("topTrackLink").href = topTracks.tracks[0].external_urls.spotify;
                    document.getElementById("topTrackLink").textContent = "Lien vers la musique";
                    document.getElementById("topTrackDuration").textContent = "Longueur de la musique : " + msToTime(topTracks.tracks[0].duration_ms) ;
                    document.getElementById("dernierAlbum").textContent = "Nom du dernier album : " + albums.items[0].name;
                    document.getElementById("nbrTracksAlbum").textContent = "Nombre de piste dans l'album : " + albums.items[0].total_tracks;
                    document.getElementById("imageAlbum").src = albums.items[0].images[1].url
                })
            });
        });
    };
});
