let player;

const searchFormEl = document.querySelector('#characterSearch');

const lookupButton = document.getElementById('lookupButton');
const modal = document.getElementById('formModal');
const closeButton = document.getElementById('closeButton');

const thumbnail = document.querySelector('#thumbnail');
const characterBio = document.querySelector('#characterbio')
const videoplayer = document.querySelector('#videoplayer');

const comics = document.querySelector('#comics');
const comicName0 = document.querySelector('#comicname0');
const comicName1 = document.querySelector('#comicname1');
const comicName2 = document.querySelector('#comicname2');
const comicName3 = document.querySelector('#comicname3');
const comicName4 = document.querySelector('#comicname4');


const events = document.querySelector('#events');
const eventName0 = document.querySelector('#eventname0');
const eventName1= document.querySelector('#eventname1');
const eventName2 = document.querySelector('#eventname2');
const eventName3 = document.querySelector('#eventname3');
const eventName4 = document.querySelector('#eventname4');


const series = document.querySelector('#series');
const seriesName0 = document.querySelector('#seriesname0');
const seriesName1 = document.querySelector('#seriesname1');
const seriesName2 = document.querySelector('#seriesname2');
const seriesName3 = document.querySelector('#seriesname3');
const seriesName4 = document.querySelector('#seriesname4');


const stories = document.querySelector('#stories');
const storyName0 = document.querySelector('#storiename0');
const storyName1 = document.querySelector('#storiename1');
const storyName2 = document.querySelector('#storiename2');
const storyName3 = document.querySelector('#storiename3');
const storyName4 = document.querySelector('#storiename4');


// Function to open the modal
function openModal() {
    modal.style.display = "block";
}

// Function to close the modal
function closeModal() {
    modal.style.display = "none";
}

// Add click event listener to the button to open the modal
lookupButton.addEventListener('click', openModal);

// Add click event listener to the close button to close the modal
closeButton.addEventListener('click', closeModal);

// Add submit event listener to the submit button to begin the seard]ch
searchFormEl.addEventListener('submit', characterSearch);


// Function to load YouTube API
async function callYoutubeApi(apiKey, part, params) {
    const baseUrl = 'https://www.googleapis.com/youtube/v3/search';
    const url = new URL(baseUrl);
    url.searchParams.set('key', apiKey);
    url.searchParams.set('part', part);
    url.searchParams.set('q', params.q);
  
    try {
      const response = await fetch(url);
      if (!response.ok) {
        // Handle errors (e.g., network issues, invalid response)
        throw new Error('Network response was not ok');
      }
      return await response.json();
    } catch (error) {
      // Handle other errors (e.g., parsing issues)
      console.error('Error fetching YouTube data:', error);
      return Promise.reject(error);
    }
  }

// Function to execute after YouTube API is loaded
function onYouTubeIframeAPIReady() {
console.log("YouTube API Ready");
// Create the player here after the API is ready
player = new YT.Player('videoplayer', {
    height: '390',
    width: '640',
    events: {
    onReady: () => {
        console.log("YouTube Player Ready");
    }
    }
});
}
        
// Function to use the Marvel API to get character data
function characterSearch(e) {    
    e.preventDefault()

    const publicKey = 'e9c59940647d72ae6b7437b52015d524';
    const privateKey = '3678b6d1f8b70006affda9d60258ca738a1d711d';
    const ts = new Date().getTime();
    const hash = md5(ts + privateKey + publicKey);
    let character = document.querySelector('#characterName').value;

    const marvelURL = `https://gateway.marvel.com/v1/public/characters?name=${character}&ts=${ts}&apikey=${publicKey}&hash=${hash}`;
    

    console.log(marvelURL)
    fetch(marvelURL)
    .then(response => {
      if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
          console.log(data); // Log data for debugging purposes
          updateCharacterBio(data);  // Update character info

        //.catch(error => console.error('Error:', error))
        thumbnail.src = data.data.results[0].thumbnail.path+'.'+data.data.results[0].thumbnail.extension
        characterBio.textContent = data.data.results[0].description;

        comicName0.textContent = data.data.results[0].comics.items[0].name;
        comicName1.textContent = data.data.results[0].comics.items[1].name;
        comicName2.textContent = data.data.results[0].comics.items[2].name;
        comicName3.textContent = data.data.results[0].comics.items[3].name;
        comicName4.textContent = data.data.results[0].comics.items[4].name;
         
        // events.textContent = data.
        eventName0.textContent = data.data.results[0].events.items[0].name;
        eventName1.textContent = data.data.results[0].events.items[1].name;
        eventName2.textContent = data.data.results[0].events.items[2].name;
        eventName3.textContent = data.data.results[0].events.items[3].name;
        eventName4.textContent = data.data.results[0].events.items[4].name;
        
         //series.textContent = data.
        seriesName0.textContent = data.data.results[0].series.items[0].name;
        seriesName1.textContent = data.data.results[0].series.items[1].name;
        seriesName2.textContent = data.data.results[0].series.items[2].name;
        seriesName3.textContent = data.data.results[0].series.items[3].name;
        seriesName4.textContent = data.data.results[0].series.items[4].name;
        
        // stories.textContent = data.
        storyName0.textContent = data.data.results[0].stories.items[0].name;
        storyName1.textContent = data.data.results[0].stories.items[1].name;
        storyName2.textContent = data.data.results[0].stories.items[2].name;
        storyName3.textContent = data.data.results[0].stories.items[3].name;
        storyName4.textContent = data.data.results[0].stories.items[4].name;
        })

        .catch(error => console.error('Error:', error));  // Catch errors from fetch or updateCharacterBio

  // Call searchYoutube only if YouTube API is ready
  if (typeof YT !== 'undefined' && YT.Player) {
    searchYoutube(character);
  } else {
    console.error("YouTube API not yet loaded. Search may not work correctly.");
  }
}


// Function to get the video id of the youtube video
function searchYoutube(character) {
    if (typeof YT !== 'undefined' && YT.Player) {
        const apiKey = 'AIzaSyAdEexf6iRXaOO6JebsX6WYphDo-6-pGUo'; // YouTube API key
        let query = encodeURIComponent(character) + " marvel trailer";
        console.log("YouTube Query:", query);

        // Call the function and chain Promises
        callYoutubeApi(apiKey, 'id', { q: query })
        .then(data => {
            let topVideoId = data.items[0].id.videoId;
            console.log("Top Video:", topVideoId);

            if (topVideoId) {
            // Update existing player with new video ID
            player.cueVideoById(topVideoId);
            // Maintain the closeModal call after successful search
            closeModal();
            } else {
            console.error("No video found for the given character.");
            }
        })
        .catch(error => console.error('Error fetching YouTube data:', error));
    } else {
        console.error("YouTube API not yet loaded. Search may not work correctly.");
    }
    }

// Function for the name, thumbnail and description of the character
function updateCharacterBio(data) {
    let character = document.querySelector('#characterName').value;
  console.log("Character Bio Data:", character);
  // Clear existing content (optional)
  characterBio.innerHTML = ''; // This removes any previous content

  // Create table structure
  const characterTable = document.createElement('table');
  characterTable.classList.add('character-info'); // Add a CSS class for styling (optional)

  // Create table row for name and image (assuming two columns)
  const nameImageRow = document.createElement('tr');

  // Name cell
  const nameCell = document.createElement('td');
  nameCell.textContent = data.data.name;
  nameImageRow.appendChild(nameCell);

  // Image cell
  const imageCell = document.createElement('td');
  if (data.data.thumbnail && data.data.thumbnail.path && data.data.thumbnail.extension) {
    const characterImagePath = `${data.data.thumbnail.path}.${data.data.thumbnail.extension}`;
    imageCell.innerHTML = `<img src="${characterImagePath}" alt="${data.data.name} image">`;
  } else {
    imageCell.textContent = 'No image available';
  }
  nameImageRow.appendChild(imageCell);

  // Create table row for description (spanning two columns)
  const descriptionRow = document.createElement('tr');
  const descriptionCell = document.createElement('td');
  descriptionCell.textContent = data.data.description || 'No description available.';
  descriptionCell.colSpan = 2; // Set description cell to span two columns
  descriptionRow.appendChild(descriptionCell);

  // Append rows to the table
  characterTable.appendChild(nameImageRow);
  characterTable.appendChild(descriptionRow);

  // Add the table to the character bio container
  characterBio.appendChild(characterTable);
}
