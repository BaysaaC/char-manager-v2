//****************************************//
//**** Script for CHARACTER.HTML page ****//
//****************************************//

import { updateCharacter } from "./api.js";
import { charID } from "./character.js";


// General approach: try to declare constants and functions in the same order of the HTML elements that they refer to.

// Declaring the HTML form that will receive the values of the specific character ("identified by charID").
// The HTML form is hidden and is revealed when user clicks on the UPDATE_BUTTON element.
export const CHAR_FORM=document.getElementById("CHAR_FORM");
CHAR_FORM.style.display="none";
export const PREVIEW = document.getElementById("preview");
const FILE_INPUT = document.getElementById("file");
export const CHAR_IMAGE = document.getElementById("image");
export const CHAR_NAME = document.getElementById("name");
export const CHAR_SHORTDESC = document.getElementById("shortDescription");
export const CHAR_LONGDESC = document.getElementById("description");

// Identifying the form buttons that will receive event listeners.
const SAVECHANGE_BUTTON=document.getElementById("saveChange");
const CANCEL_BUTTON=document.getElementById("cancel");


// Defining a function that receives a file object and returns a Promise which resolves with the dataURL (contained in the 'READER.result' property).
const fileToDataURL = (file) => {
    return new Promise((resolve,reject)=>{
        let READER = new FileReader();
        READER.readAsDataURL(file);
        READER.onload = () => {
            resolve(READER.result);
        };
        READER.onerror = () => {
            reject("Problem reading the file");
        };
    });
};


// Defining an asynchronous function to receive a file object (from 'FILEINPUT' element), and to display it in the 'PREVIEW' element.
const previewFile = async () => {
    let file = FILE_INPUT.files[0];
    try {
        let dataURL = await fileToDataURL(file);
        PREVIEW.style.backgroundImage = `url(${dataURL})`;
        CHAR_IMAGE.value = dataURL;
    }catch(error) {
        alert(error);
    }
};
// LISTENING TO EVERY CHANGE OF FILE INPUT AND GENERATING A PREVIEW OF THE FILE
FILE_INPUT.addEventListener("change", () => {previewFile()});


// Defining a function to extract <data> segment of the data URL
const extractDataSegment = () => {
    let dataURL = CHAR_IMAGE.value;
    let numIndex = dataURL.indexOf("/9j");
    let dataSegment = dataURL.slice(numIndex);
    return dataSegment;
};


// Defining a function to validate the values entered in the form
const validateForm = () => {
    let dataSeg = extractDataSegment();
    CHAR_IMAGE.value = dataSeg;
    let values = Array.from(document.querySelectorAll(".textInput"));
    if (values.some(({ value }) => value === "")) {
        alert("Please fill in all fields and upload an image");
        return;
    }
    let trimmedValues = values.map(({ value }) => {
      return value.trim(); // Removes blank spaces before and after string input
    });
    return trimmedValues;
};
// LISTENING TO CLICK EVENT ON SAVECHANGE BUTTON TO POST THE FORM AND UPDATE EXISTING CHARACTER.
// Calls the updateCharacter function (from module: api.js).
SAVECHANGE_BUTTON.addEventListener("click", async () => {
    let charData = validateForm();
    await updateCharacter(charID, charData);
});


// Defining a function to hide the HTML form and reveal back the character card container
const cancelChanges = () => {
    CHAR_CONTAINER.style.display = "block";
    CHAR_FORM.style.display = "none";
};
// LISTENING TO CLICK EVENT ON SAVECHANGE BUTTON TO POST THE FORM AND UPDATE EXISTING CHARACTER
CANCEL_BUTTON.addEventListener("click", cancelChanges);