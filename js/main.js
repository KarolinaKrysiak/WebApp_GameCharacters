"use strict";

// =========== character functionality =========== //
/*
global variables: _characters
*/
let _characters = [];

/*
Fetches json data from the file characters.json
*/
fetch("json/data.json")
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
    _characters = data;
    appendcharacters(_characters);
  });

function appendcharacters(characters) {
  let htmlTemplate = "";
  for (let character of characters) {
    htmlTemplate += /*html*/ `
      <article class="${character.status}">
        <img src="${character.img}">
        <h2>${character.name}</h2>
        <h3>${character.game}</h3>
      </article>
    `;
  }
  document.querySelector("#characters-container").innerHTML = htmlTemplate;
}

function addNewcharacter() {
  let name = document.querySelector("#name").value;
  let game = document.querySelector("#game").value;
  let img = document.querySelector("#img").value;

  if (game && name && img) {
    _characters.push({
      game,
      name,
      img,
    });

    appendcharacters(_characters);
    navigateTo("characters");
    document.querySelector("#game").value = "";
  } else {
    alert("Please fill out all fields");
  }
}

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
  console.log(filteredcharacters);
  appendcharacters(filteredcharacters);
}
