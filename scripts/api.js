// Defining an asynchronous function that sends a GET query to the API (which will return a Response object) 
// and that returns a Promise which should resolve with the parsing of the Response body.

export const fetchAllCharacters = async () => {
    try {
        let fetchResponse = await fetch("https://character-database.becode.xyz/characters");
        if(!fetchResponse.ok) {
            throw new Error ("Characters database has encountered an error");
        }
        let responseBody = await fetchResponse.json();
        return responseBody;
    } catch(error) {
        alert(error);
    };
};


// Defining an asynchronous function that sends a GET query to the API (which will return a Response object) 
// and that returns a Promise which should resolve with the parsing of the Response body.

export const fetchCharacter = async (charID) => {
    try {
        let fetchResponse= await fetch(`https://character-database.becode.xyz/characters/${charID}`);
        if(!fetchResponse.ok) {
            throw new Error ("Characters database has encountered an error");
        }
        let responseBody = await fetchResponse.json();
        return responseBody;
    } catch(error) {
        alert(error);
    };
};


// Defining a function to redirect to the home page (index.html).

export const loadToHomepage = () => {
    let durationInMilliseconds = 1000;
    setTimeout(
      ()=> {window.location.replace("index.html")},
      durationInMilliseconds);
  };


// Defining an asynchronous function that sends a POST query to the API (which will return a Response object) 
// and that returns a Promise which should resolve with the parsing of the Response body.

export const createCharacter = async (charData) => {
    let [image, name, shortDescription, description] = charData;
    try {
        let fetchResponse = await fetch(
        "https://character-database.becode.xyz/characters",
        {
            method: "POST",
            headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
            },
            body: JSON.stringify({
            image,
            name,
            shortDescription,
            description,
            }),
        }
        );
    } catch (error) {
        alert(error);
    };

    alert("Character has been created ! You will be redirected to the main page.");
    loadToHomepage();
};


// Defining an asynchronous function that sends a PUT query to the API (which will return a Response object) 
// and that returns a Promise which should resolve with the parsing of the Response body.

export const updateCharacter = async (charID, charData) => {
    let [image, name, shortDescription, description] = charData;
    try {
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
                })
            }
        );
    } catch(error) {
        alert(error);
    };

    alert("Character has been updated ! You will be redirected to the main page.");
    loadToHomepage();
};

// Defining an asynchronous function that sends a DELETE query to the API (which will return a Response object) 
// and that returns a Promise which should resolve with the parsing of the Response body.

export const deleteCharacter = async (charID) => {
    if(confirm("Delete character ?")){
        try {
            let fetchResponse = await fetch(
                `https://character-database.becode.xyz/characters/${charID}`, 
                {
                    method: 'DELETE',
                    headers:{
                    "Accept": "application/json",
                    'Content-Type': 'application/json'
                    }
                })
        } catch(error) {
        alert(error);
        };

        alert("Character has been deleted ! You will be redirected to the main page.");
        loadToHomepage();
    }
    return;
};