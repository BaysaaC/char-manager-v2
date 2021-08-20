//****************************************//
//**** Script for CHARACTER.HTML page ****//
//****************************************//

import { fetchCharacter } from "./api.js";
import { CHAR_FORM, PREVIEW, CHAR_IMAGE, CHAR_NAME, CHAR_SHORTDESC, CHAR_LONGDESC } from "./update-form.js";


// General approach: try to declare constants and functions in the same order of the HTML elements that they refer to.

// Declaring the HTML element that serves as the container for the specific character card
const CHAR_CONTAINER=document.getElementById("CHAR_CONTAINER");

// Declaring the HTML elements of the character card container element.
const charImage=document.querySelector(".characterCard__image");
const charName=document.querySelector(".characterCard__name");
const charShortDescription=document.querySelector(".characterCard__descriptionShort");
const charLongDescription=document.querySelector(".characterCard__descriptionLong");
export const charID=localStorage.getItem("charID");

// Identifying the character card container buttons that will receive event listeners.
const UPDATE_BUTTON=document.getElementById("update");
const DELETE_BUTTON=document.getElementById("delete");


// Defining an asynchronous function that calls the fetchCharacter function (from module: api.js) to view single character. 
const displayCharacter = async (charID) => {
    let character = await fetchCharacter(charID);
    charImage.src=`data:image/png;base64,${character.image}`;
    charName.innerHTML=character.name;
    charShortDescription.innerHTML=character.shortDescription;
    charLongDescription.innerHTML=character.description;
};
// Calling the function with "charID" constant from local storage
let displayedCharacter = displayCharacter(charID);


// Defining an asynchronous function that calls the fetchCharacter function (from module: api.js) to edit character
const displayForm = async (charID) => {
    CHAR_CONTAINER.style.display = "none";
    CHAR_FORM.style.display = "block";
    let character = await fetchCharacter(charID);
    PREVIEW.style.backgroundImage =`url(data:image/png;base64,${character.image})`;
    CHAR_IMAGE.value = character.image;
    CHAR_NAME.value = character.name;
    CHAR_SHORTDESC.value = character.shortDescription;
    CHAR_LONGDESC.value = character.description;
};
// LISTENING TO CLICK EVENT ON UPDATE_BUTTON TO HIDE CHARACTER CONTAINER AND REVEAL CHARACTER EDIT FORM
UPDATE_BUTTON.addEventListener("click", () => {displayForm(charID)});




// LISTENING TO CLICK EVENT ON DELETE BUTTON TO DELETE EXISTING CHARACTER.
// Calls the deleteCharacter function (from module: api.js).
DELETE_BUTTON.addEventListener("click", () => {deleteCharacter(charID)});

