"use strict";

// =========== character functionality =========== //
/*
global variables: _characters  _favCharacters = [];
*/
let _characters = [];
let _favCharacters = [];
let _selectedCharacter = [];

/*
Fetches json data from the file characters.json
*/
async function fetchData() {
  const response = await fetch('json/characters.json');
  const data = await response.json();
  _characters = data;
  console.log(_characters);
  appendCharacters(_characters);
  showLoader(false);
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


/*
Shows random character
*/

function showRandomCharacter() {
  const randomCharacter = _characters[Math.floor(Math.random() * _characters.length)];
  console.log(randomCharacter);
  showDetailView(randomCharacter.id);
}

/*
Adds new character
*/

function addNewcharacter() {
  showLoader(true);

  let game = document.querySelector('#game').value;
  let name = document.querySelector('#name').value;
  let race = document.querySelector('#race').value;
  let gender = document.querySelector('#gender').value;
  let description = document.querySelector('#description').value;
  let img = document.querySelector('#img').value;
  const id = Date.now(); // dummy generated Character id

  if (game && name && race && gender && description && img) {
    let newcharacter = {
      game: game,
      name: name,
      race: race,
      gender: gender,
      description: description,
      img: img,
      id: id
    }
    _characters.push(newcharacter);

    appendCharacters(_characters);
    navigateTo('characters');
  } else {
    alert('Please fill out all fields');
  }
  showLoader(false);
}

// Search functions

function search(value) {
  let searchQuery = value.toLowerCase();
  let filteredcharacters = [];
  for (let character of _characters) {
    let name = character.name.toLowerCase();
    let game = character.game.toLowerCase();
    if (name.includes(searchQuery) || game.includes(searchQuery)) {
      filteredcharacters.push(character);
    }
  }
  appendCharacters(filteredcharacters);
}


// filter functions


function showHideMale(checked) {
  if (checked) {
    appendCharacters(_characters);
  } else {
    const maleCharacters = _characters.filter(character => character.gender != "Male");
    appendCharacters(maleCharacters);
  }
}

function showHideFemale(checked) {
  if (checked) {
    appendCharacters(_characters);
  } else {
    const femaleCharacters = _characters.filter(character => character.gender != "Female");
    appendCharacters(femaleCharacters);
  }
}

function showHideHuman(checked) {
  if (checked) {
    appendCharacters(_characters);
  } else {
    const humanCharacters = _characters.filter(character => character.race != "Human");
    appendCharacters(humanCharacters);
  }
}

function showHideAlien(checked) {
  if (checked) {
    appendCharacters(_characters);
  } else {
    const alienCharacters = _characters.filter(character => character.race != "Alien");
    appendCharacters(alienCharacters);
  }
}

// Sort functions

function orderBy(option) {
  if (option === "game") {
    orderBygame();
  } else if (option === "name") {
    orderByname();
  } 
}

function orderBygame() {
  _characters.sort((character1, character2) => {
    return character1.game.localeCompare(character2.game);
  });
  appendCharacters(_characters);
}

function orderByname() {
  _characters.sort((character1, character2) => {
    return character1.name.localeCompare(character2.name);
  });
  appendCharacters(_characters);
}

/*
Shows detailed view
*/

function showDetailView(id) {
  _selectedCharacter = id;
  const characterToShow = _characters.find(character => character.id === id);
  navigateTo("detail-view");
  document.querySelector("#detail-view .title").innerHTML = characterToShow.name;
  document.querySelector("#detail-view-container").innerHTML = /*html*/`
    <img src="${characterToShow.img}">
    <article>
      <h2>${characterToShow.name}</h2>
      <h3>${characterToShow.game}</h3>
      <p>Gender: ${characterToShow.gender}</p>
      <p>Race: ${characterToShow.race}</p>
      <p class="description">${characterToShow.description}</p>
    </article>
  `;
}

/*
Shows game page
*/

function showGame() {
  const gameToShow = _characters.find(character => character.id === _selectedCharacter);
  navigateTo("game-detail");
  document.querySelector("#game-detail .title").innerHTML = gameToShow.game;
  document.querySelector("#game-container").innerHTML = /*html*/`
    <img src="${gameToShow.img}">
    <article>
      <h2>${gameToShow.game}</h2>
      <h3>${gameToShow.developer}</h3>
      <p>Genre: ${gameToShow.genre}</p>
      <p>Mode: ${gameToShow.mode}</p>
      <p class="description">${gameToShow.description2}</p>
    </article>
  `;
}

/*
Shows random detailed view
*/

function showRandomDetailView(id) {
  const characterToShow = _characters.find(character => character.id === id);
  navigateTo("random");
  document.querySelector("#random .title").innerHTML = characterToShow.name;
  document.querySelector("#random-detail-view-container").innerHTML = /*html*/`
    <img src="${characterToShow.img}">
    <article>
      <h2>${characterToShow.name}</h2>
      <h3>${characterToShow.game}</h3>
      <p>Gender: ${characterToShow.gender}</p>
      <p>Race: ${characterToShow.race}</p>
      <p class="description">${characterToShow.description}</p>
    </article>
  `;
}

// The modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the Character clicks on the button, open the modal
btn.onclick = function () {
  modal.style.display = "block";
};

// When the Character clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
};

// When the Character clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};


