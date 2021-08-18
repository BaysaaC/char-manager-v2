const CARDS_CONTAINER = document.getElementById("target");
const CARD_TEMPLATE = document.getElementById("charnew");

const openCharacter = (charID)  => {
  localStorage.setItem("charID", charID);
  window.open("character.html", '_blank');
};

const fetchAllCharacters = async () => {
  try {
    let fetchResponse = await fetch("https://character-database.becode.xyz/characters");
    if(!fetchResponse.ok) {
      throw new Error ("Characters database has encountered an error");
    }
    let responseBody = await fetchResponse.json();
    return responseBody;
  } catch(error) {
    alert(error);
  }
};

const displayAllCharacters = async () => {
  let characters = await fetchAllCharacters();
  characters.forEach((character) => {
    let card=CARD_TEMPLATE.cloneNode(true).content;
    let cardImage=card.querySelector('.charmain__img');
    let cardName=card.querySelector('.charmain__title');
    let cardShortDescription=card.querySelector('.charmain__bio');
    let cardButton=card.querySelector(".charmain__bio--button");

    cardImage.src=`data:image/png;base64,${character.image}`;
    cardName.innerHTML=character.name;
    cardShortDescription.innerHTML=character.shortDescription;
    cardButton.addEventListener("click", ()=>{
      openCharacter (character.id);
    });
    CARDS_CONTAINER.appendChild(card);
  });
};

displayAllCharacters();








