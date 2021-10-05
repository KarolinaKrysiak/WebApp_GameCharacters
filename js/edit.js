/*
Shows game page
*/

function showGame(id) {
  const gameToShow = _characters.find(character => character.id === id);
  navigateTo("game");
  document.querySelector("#detail-view .title").innerHTML = gameToShow.game;
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