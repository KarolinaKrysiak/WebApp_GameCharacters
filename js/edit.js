"use strict";

// =========== character functionality =========== //
/*
global variables: _favCharacters _selectedcharacterId
*/
let _favCharacters = [];

/*
Fetches json data from the file favCharacters.json
*/
async function fetchNewData() {
  const response = await fetch('json/characters.json');
  const data = await response.json();
  _favCharacters = data;
  console.log(_favCharacters);
  appendFavCharacters(_favCharacters);
  showLoader(false);
}

fetchNewData();

function appendFavCharacters(favCharacters) {
  let htmlTemplate = "";
  for (let character of favCharacters) {
    htmlTemplate += /*html*/`
      <article class="${character.status}">
        <article onclick="showDetailView(${character.id})">
          <img src="${character.img}">
          <h2>${character.name}</h2>
          <h3>${character.game}</h3>
        </article>
       
      </article>
    `;
  }
  document.querySelector('#fav-characters-container').innerHTML = htmlTemplate;
}