
const openCharacter = (charID)  => {
  localStorage.setItem("charID", charID);
  window.open("character.html", '_blank');
};

const template= async () =>{
  let fetchResponse = await fetch("https://character-database.becode.xyz/characters");
  let responseBody = await fetchResponse.json();
  let target=document.getElementById("target");
  let tpl=document.getElementById("charnew");

  responseBody.forEach(character => {
    let clone=tpl.cloneNode(true).content;
    let imageCard=clone.querySelector('.charmain__img');
    let nameCard=clone.querySelector('.charmain__title');
    let shortDescriptionCard=clone.querySelector('.charmain__bio');
    let buttonCard=clone.querySelector(".charmain__bio--button");
    // let linkCard=clone.querySelector(".charmain__link");
  
    imageCard.src=`data:image/png;base64,${character.image}`;
    nameCard.innerHTML=character.name;
    shortDescriptionCard.innerHTML=character.shortDescription;
    buttonCard.addEventListener("click", ()=>{
      openCharacter (character.id);
    });
    target.appendChild(clone);
  
  });
};

template();








