let player;

const searchFormEl = document.querySelector('#characterSearch');

const lookupButton = document.getElementById('lookupButton');
const modal = document.getElementById('formModal');
const closeButton = document.getElementById('closeButton');

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
    const character = document.querySelector('#characterName').value;
    console.log("Character:", character); // Log the character name
    const publicKey = 'e9c59940647d72ae6b7437b52015d524';
    const privateKey = '3678b6d1f8b70006affda9d60258ca738a1d711d';
    const ts = new Date().getTime();
    const hash = md5(ts + privateKey + publicKey);
    const marvelURL = `https://gateway.marvel.com/v1/public/characters?${character}&ts=${ts}&apikey=${publicKey}&hash=${hash}`;
    console.log("Marvel API URL:", marvelURL)

    fetch(marvelURL)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => updateCharacterBio(data)) // Call the separate function to update character info
        .catch(error => console.error('Error:', error));
        
  // Call searchYoutube only if YouTube API is ready
  if (typeof YT !== 'undefined' && YT.Player) {
    //searchYoutube(character);
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
