const charImage=document.querySelector(".characterCard__image");
const charName=document.querySelector(".characterCard__name");
const charShortDescription=document.querySelector(".characterCard__descriptionShort");
const charLongDescription=document.querySelector(".characterCard__descriptionLong");
const charID=localStorage.getItem("charID");
const UPDATE_BUTTON=document.getElementById("update");
const DELETE_BUTTON=document.getElementById("delete");
const SAVECHANGE_BUTTON=document.getElementById("saveChange");

const displayCharacter = async () => {
    let fetchResponse= await fetch(`https://character-database.becode.xyz/characters/${charID}`);
    let responseBody = await fetchResponse.json();
    charImage.src=`data:image/png;base64,${responseBody.image}`;
    charName.innerHTML=responseBody.name;
    charShortDescription.innerHTML=responseBody.shortDescription;
    charLongDescription.innerHTML=responseBody.description;

};
displayCharacter();

const CHAR_FORM=document.getElementById("CHAR_FORM");
const CHAR_CONTAINER=document.getElementById("CHAR_CONTAINER");


CHAR_FORM.style.display="none";

const displayForm = async () => {
    CHAR_CONTAINER.style.display = "none";
    CHAR_FORM.style.display = "block";
    let fetchResponse = await fetch(`https://character-database.becode.xyz/characters/${charID}`);
    let responseBody = await fetchResponse.json();
    PREVIEW.style.backgroundImage =`url(data:image/png;base64,${responseBody.image})`;
    document.getElementById("image").value = responseBody.image;
    document.getElementById("name").value = responseBody.name;
    document.getElementById("shortDescription").value = responseBody.shortDescription;
    document.getElementById("description").value = responseBody.description;

};
UPDATE_BUTTON.addEventListener("click", displayForm);


  
const updateCharacter = async () => {
let [image, name, shortDescription, description] = validateForm();

let fetchResponse = await fetch(
    `https://character-database.becode.xyz/characters/${charID}`,
    {
    method: "PUT",
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        name,
        shortDescription,
        description,
        image,
    }),
    }
);

alert("Character has been updated! You will be redirected to the main page.");
setTimeout(
    ()=> {window.location.replace("index.html")},
    1000);
};
  
  
// LISTENING TO CLICK EVENT ON SAVECHANGE BUTTON TO POST THE FORM

SAVECHANGE_BUTTON.addEventListener("click", updateCharacter);




document.getElementById("delete").addEventListener("click",async()=>{

    if(confirm("Are you sure you want to delete this character ?")){


       let fetchDelete= await fetch(`https://character-database.becode.xyz/characters/${charID}`, {
     method: 'DELETE',
     headers:{
        'Content-Type': 'application/json'
    }
    })

    };

    alert("Successful delete. You will be redirected to the main page");
    setTimeout(
        ()=> {window.location.replace("index.html")},
        1000);
      


    


});
