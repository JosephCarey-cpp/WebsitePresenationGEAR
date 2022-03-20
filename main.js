const animes = document.getElementById("animes");

/**
 * Gets top animes from API and sets the content into animes-container
 */ 
async function getTopAnime() {
    const url = "https://api.jikan.moe/v4/top/anime";
    try {
        // make http GET request to given url
        const response = await fetch(url);
        // convert response object into JSON
        const jsonResult = await response.json();
        displayAnimes(jsonResult);
    } catch (error) {
        console.log(error);
    }
}

/**
 * Renders anime content on to DOM
 * @param {Promise} animesJson 
 */
function displayAnimes(animesJson) {
    animesJson.data
        .map(anime => {
            let newAnimeDiv = document.createElement("div");
            let ul = document.createElement("ul");
            let rank = document.createElement("h1");
            let title = document.createElement("h2");
            let img = document.createElement("img");
            
            // insert anime data into html
            rank.innerText = anime.rank;
            title.innerText = anime.title;
            img.src = anime.images.jpg.image_url;

            // insert list items in unordered list
            ul.innerHTML = `
                <li><p>${anime.type}</p></li>
                <li><p>${anime.year}</p></li>
                <li><p>${anime.episodes}</p></li>
                <li><p>${anime.score}</p></li>
            `;

            // programmatically add a class to element
            newAnimeDiv.classList.add("content");

            // insert html into new div
            newAnimeDiv.appendChild(rank);
            newAnimeDiv.appendChild(title);
            newAnimeDiv.appendChild(img);
            newAnimeDiv.appendChild(ul);

            // insert new anime div into div already in DOM
            animes.appendChild(newAnimeDiv);
        }
    );
}
