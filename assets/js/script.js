let mainMenu = document.getElementById("main-menu");
let selectDifficultyMenu = document.getElementById("difficulty");
let about = document.getElementById("about");
let instructions = document.getElementById("instructions");

// Select all buttons and put into an array of buttons
let buttons = document.querySelectorAll("button");
// Loop over each button in the array of buttons
buttons.forEach(button => {
    // Add a click event listener to the current button in the loop to trigger different actions
    button.addEventListener("click", function (e) {
        // When clicked, get the data-modal from the clicked button
        const modal = e.target.dataset.modal;
        if (modal === "new-game") {
            selectDifficulty();
        } else if (modal === "about") {
            aboutSection();
        } else if (modal === "instructions") {
            instructionsSection();
        } else if (modal === "easy") {
            runGameEasy();
        } else if (modal === "medium") {
            runGameMedium();
        } else if (modal === "hard") {
            runGameHard();
        } else if (modal === "back") {
            returnHome();
        }
    });

});

/**
 * Populate the select difficulty menu from the main menu
 */
function selectDifficulty() {
    selectDifficultyMenu.classList.remove("hidden");
    mainMenu.style.display = "none";
    console.log("Select Difficulty");
}

/**
 * Populate the "About" window from the main menu
 */
function aboutSection() {
    about.classList.remove("hidden");
    mainMenu.style.display = "none";
    console.log("about");
}

/**
 * Populate the instructions section from the main menu
 */
function instructionsSection() {
    instructions.classList.remove("hidden");
    mainMenu.style.display = "none";
    console.log("instructions");
}

function returnHome() {
    mainMenu.style.display = "block";
    selectDifficultyMenu.classList.add("hidden");
    about.classList.add("hidden");
    instructions.classList.add("hidden");
}

console.log(returnHome);


let section = document.querySelector("section");
/**
 * Get the images
 */
function getImages() {
    return [
        { imgSrc: "assets/images/cards/halloween-balloons.png", name: "balloons" },
        { imgSrc: "assets/images/cards/halloween-castle.png", name: "castle" },
        { imgSrc: "assets/images/cards/halloween-cat.png", name: "cat" },
        { imgSrc: "assets/images/cards/halloween-cauldron.png", name: "cauldron" },
        { imgSrc: "assets/images/cards/halloween-crystal-ball.png", name: "crystal-ball" },
        { imgSrc: "assets/images/cards/halloween-moon.png", name: "moon" },
        { imgSrc: "assets/images/cards/halloween-pumpkin.png", name: "pumpkin" },
        { imgSrc: "assets/images/cards/halloween-skeleton.png", name: "skeleton" },
        { imgSrc: "assets/images/cards/halloween-spider.png", name: "spider" },
        { imgSrc: "assets/images/cards/halloween-witch.png", name: "witch" },
    ];
}

//Generate picklist of images for Easy mode
let imagePicklistEasy = getImages();
removeValFromIndex = [6, 7, 8, 9];

for (const i of removeValFromIndex.reverse()) {
    imagePicklistEasy.splice(i, 1);
}

//Generate picklist of images for Medium mode
let imagePicklistMedium = getImages();
removeValFromIndex = [8, 9];

for (const i of removeValFromIndex.reverse()) {
    imagePicklistMedium.splice(i, 1);
}

//Generate picklist of images for Hard mode
let imagesPicklistHard = getImages();

console.log(imagesPicklistHard);
//Duplicate the images from the array
let imagesPicklist = [...images, ...images];

/**
 * Randomize the cards
 */
function randomize() {
    let cardData = imagesPicklist;
    cardData.sort(() => Math.random() - 0.5);
    return cardData;
}

/*
 * Generate the cards
 */
function cardGenerator() {
    let cardData = randomize();
    //Generate the cards
    cardData.forEach((item) => {
        let card = document.createElement("div");
        let face = document.createElement("img");
        let back = document.createElement("div");
        //Add classes to the cards
        card.classList = "card";
        face.classList = "face";
        back.classList = "back";
        //Attach images to the cards
        face.src = item.imgSrc;
        //Attach data types to the cards
        card.setAttribute("data-image", item.name);
        //Append cards to the section
        let gameArea = document.getElementById("game-area");
        gameArea.appendChild(card);
        card.appendChild(face);
        card.appendChild(back);

        card.addEventListener("click", function (e) {
            card.classList.toggle("flipCard");
            checkCards(e);
        });
    });
};

/**
 * Check cards
 */
let checkCards = (e) => {
    let clickedCard = e.target;
    clickedCard.classList.add("flipped");
    let flippedCards = document.querySelectorAll(".flipped");
    let cardsMatch = flippedCards[0].getAttribute("data-image") === flippedCards[1].getAttribute("data-image");

    if (flippedCards.length === 2) {
        if (cardsMatch) {
            console.log("Match!");
        } else {
            console.log("Wrong!");
            card.classList.remove("flipped");
        }
    };
};


