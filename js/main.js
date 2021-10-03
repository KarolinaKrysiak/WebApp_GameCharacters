"use strict";

// =========== character functionality =========== //
/*
global variables: _characters _selectedcharacterId
*/
let _characters = [];

/*
Fetches json data from the file characters.json
*/
async function fetchData() {
  const response = await fetch('json/data.json');
  const data = await response.json();
  _characters = data;
  console.log(_characters);
  appendCharacters(_characters);
}

fetchData();

function appendCharacters(characters) {
  let htmlTemplate = "";
  for (let character of characters) {
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
  document.querySelector('#characters-container').innerHTML = htmlTemplate;
}

/* Shows detailed view of character */
function showDetailView(id) {
  const characterToShow = _characters.find(character => character.id === id);
  navigateTo("detail-view");
  document.querySelector("#detail-view .title").innerHTML = characterToShow.name;
  document.querySelector("#detail-view-container").innerHTML = /*html*/`
    <img src="${characterToShow.img}">
    <article>
      <h2>${characterToShow.name}</h2>
      <h3>${characterToShow.game}</h3>
      <p>Race: ${characterToShow.race}</p>
    </article>
  `;
}

/* Add new character */
function addNewCharacter() {

  let name = document.querySelector('#name').value;
  let game = document.querySelector('#game').value;
  let description = document.querySelector('#description').value;
  let img = document.querySelector('#img').value;

  if (name && game && description && img) {
    let newCharacter = {
      name: name,
      game: game,
      description: description,
      img: img,
    }
    _characters.push(newCharacter);

    appendCharacters(_characters);
    navigateTo('list');
  } else {
    alert('Please fill out all fields');
  }
}

function search(value) {
  let searchQuery = value.toLowerCase();
  let filteredCharacters = [];
  for (let character of _characters) {
    let name = character.name.toLowerCase();
    let game = character.game.toLowerCase();
    if (name.includes(searchQuery) || game.includes(searchQuery)) {
      filteredCharacters.push(character);
    }
  }
  console.log(filteredCharacters);
  appendCharacters(filteredCharacters);
}
