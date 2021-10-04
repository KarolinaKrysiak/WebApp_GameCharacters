/*
Shows random detailed view
*/

function showRandomDetailView(id) {
  const characterToShow = _characters.find(character => character.id === id);
  navigateTo("detail-view");
  document.querySelector("#detail-view .title").innerHTML = characterToShow.name;
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