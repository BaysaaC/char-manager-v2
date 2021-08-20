//************************************//
//**** Script for INDEX.HTML page ****//
//************************************//


import {fetchAllCharacters} from "./api.js";


// General approach: try to declare constants and functions in the same order of the HTML elements that they refer to.

const CARDS_CONTAINER = document.getElementById("target");
const CARD_TEMPLATE = document.getElementById("charnew");


// Defining a function to open a specific character when the user clicks on the "See character" button in the character card.
const openCharacter = (charID)  => {
    localStorage.setItem("charID", charID);
    window.open("character.html", '_blank');
};

// Defining an asynchronous function that calls the fetchAllCharacters function (from module: api.js), 
// and displays all the caracters in the CARDS_CONTAINER element.
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
// Calling the function
let displayedCharacters = displayAllCharacters();








