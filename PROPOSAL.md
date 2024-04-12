# Project Name
Marvel Lookup

## Project Summary

AS A user
I WANT to enter a marvel character name
SO THAT I can see their comic and video content

    WHEN I view the page
    THEN I am presented with a lookup button, a main section and four sub sections

    WHEN I click on the lookup button
    THEN I am presented with a form with an input box labeled character name

    WHEN I enter a character name in the input box and click search
    THEN the form closes and the page is refreshed

    WHEN I view the main character section
    THEN I am presented with the top video trailer on youtube

    WHEN I view the character sub-section
    THEN I am presented with a list of comics; list of events; list of series; list of stories

*Use the [Marvel API](https://developer.marvel.com/) to retrieve marvel character information. 
*Use the [Youtube API](https://www.youtube.com/yt/dev/api-resources.html) to send request for content based on the character.


## Developers

1. Eloy Garza

2. Bren Broussard

## Installation Instructions

- Clone our repo to your computer

## Animated Gifs/Pictures of App

- Place various screens of your app here after they have been built

## Tech Stack (MVP):

- Frontend: HTML, Javascript with AJAX for asynchronous data retrieval from APIs.

- Styling: Bulma CSS Framework for a responsive and user-friendly layout.

## APIs

- [Marvel API](https://developer.marvel.com/) 
- [Youtube API](https://www.youtube.com/yt/dev/api-resources.html)

## MVP (Minimum Viable Product)

This initial version of Marvel Lookup will focus on core functionalities to validate the concept and gather user feedback.

### Features:

- User Interface with a lookup button and character information sections.

- Search functionality: User enters a character name and submits the search.

- Marvel API integration: Upon search submission, the application retrieves information about the entered character using the Marvel API.

- YouTube API integration (basic): Fetches the most relevant video trailer from YouTube based on the character name (using basic search capabilities). This will be a simple text search on YouTube, not leveraging the full Youtube API functionalities.

### Character Information Display:
- Main Section: Displays the top video trailer retrieved from YouTube.
- Sub Sections: Lists of Comics, Events, Series, and Stories associated with the character. This will be a basic list of names, without detailed information about each item.

## Future Enhancements:

- Implement full Youtube API integration to leverage features like searching by channel or filtering by video type (trailers).
- Enhance character information display by including details like character description, images, and creative teams behind the comics.
- Integrate pagination for extensive lists like Comics and Stories.
- Error handling and user feedback mechanisms.