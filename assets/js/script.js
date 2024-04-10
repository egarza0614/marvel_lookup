const searchFormEl = document.querySelector('#search-form');

const formModal = document.querySelector('#formModal');
const characterBio = document.querySelector('#characterbio')
const videoplayer = document.querySelector('#videoplayer');

const comics = document.querySelector('#comics');
const comicName = document.querySelector('#comicname');
const comicUri = document.querySelector('#commicresourceURI');

const events = document.querySelector('#events');
const eventName = document.querySelector('#eventname');
const eventsUri = document.querySelector('#eventresourceURI');



const series = document.querySelector('#series');
const seriesName = document.querySelector('#seriesname');
const seriesUri = document.querySelector('#seriesresourceURI');

const stories = document.querySelector('#stories');
const storyName = document.querySelector('#storiename');
const storyUri = document.querySelector('#storieresourceURI');


var hash = md5(Date.now() + '3678b6d1f8b70006affda9d60258ca738a1d711d' + 'e9c59940647d72ae6b7437b52015d524');
const marvelURL = `https://gateway.marvel.com:443/v1/public/characters?name=iron%20man&apikey=e9c59940647d72ae6b7437b52015d524&hash=${hash}`

function characterSearch(e) {    
    e.preventDefault()
    let character = document.querySelector('#characterName');
    character = character.value;

    fetch(marvelURL)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
        })
        .catch(error => console.error('Error:', error));
}

        characterBio.textContent = data.
        comics.textContent = data.
        comicName.textContent = data.
        comicUri.textContent = data.
        events.textContent = data.
        eventName.textContent = data.
        eventsUri.textContent = data.
        series.textContent = data.
        seriesName.textContent = data.
        seriesUri.textContent = data.
        stories.textContent = data.
        storyName.textContent = data.
        storyUri.textContent = data.

document.querySelector("#search").addEventListener('click', characterSearch);
