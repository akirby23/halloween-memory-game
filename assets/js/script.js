let numberOfMoves = 0;

const mainMenu = document.getElementById("main-menu");
const selectDifficultyMenu = document.getElementById("difficulty");
const about = document.getElementById("about");
const instructions = document.getElementById("instructions");
const gameArea = document.getElementById("game-area-center");
const gameAreaRight = document.getElementById("game-area-right");
const winGameModal = document.getElementById("win-game-modal");

const buttons = document.querySelectorAll("button");
const resetGameButton = document.getElementById("reset-game");
const exitGameButton = document.getElementById("exit-game");

// Loop over each button in the array of buttons
buttons.forEach(function (button) {
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
            selectDifficultyMenu.classList.add("hidden");
            runGameEasy();
        } else if (modal === "medium") {
            selectDifficultyMenu.classList.add("hidden");
            runGameMedium();
        } else if (modal === "hard") {
            selectDifficultyMenu.classList.add("hidden");
            runGameHard();
        } else if (modal === "back") {
            returnHome();
        }
    });

});

resetGameButton.addEventListener("click", function (e) {
    confirmReset();
});

exitGameButton.addEventListener("click", function (e) {
    confirmExit();
});


/**
 * Populate the select difficulty menu from the main menu
 */
function selectDifficulty() {
    selectDifficultyMenu.classList.remove("hidden");
    mainMenu.classList.add("hidden");
    about.classList.add("hidden");
    instructions.classList.add("hidden");
}

/**
 * Populate the "About" window from the main menu
 */
function aboutSection() {
    about.classList.remove("hidden");
    mainMenu.classList.add("hidden");
}

/**
 * Populate the instructions section from the main menu
 */
function instructionsSection() {
    instructions.classList.remove("hidden");
    mainMenu.classList.add("hidden");
}

/**
 * Go back to the main menu
 */
function returnHome() {
    selectDifficultyMenu.classList.add("hidden");
    about.classList.add("hidden");
    instructions.classList.add("hidden");
    mainMenu.classList.remove("hidden");
    gameArea.innerHTML = "";
}

/**
 * Prompts the user to confirm their choice to reset the game. 
 * The cards will be flipped back down & reshuffled, and the moves counter will revert back to 0. 
 */
function confirmReset() {
    let text = "Are you sure you want to reset the game?\nYou will lose your progress until now.";
    if (confirm(text) === true) {
        resetGame();
    }
}

/**
 * Prompts the user to confirm their choice to exit the game.
 * User will be redirected to the main menu if they confirm their choice.
 */
function confirmExit() {
    let text = "Are you sure you want to exit the game?\nYou will lose your progress until now & will be redirected to the main menu.";
    if (confirm(text) === true) {
        exitGame();
    }
}

function resetGame() {
    numberOfMoves = 0;
    document.getElementById("moves").innerText = numberOfMoves;
    gameArea.removeAttribute("class");
    gameAreaRight.classList.add("hidden");
    let cards = document.querySelectorAll(".card");
    let cardsLength = cards.length;
    if (cardsLength === 20) {
        runGameHard();
    } else if (cardsLength === 16) {
        runGameMedium();
    } else if (cardsLength === 12) {
        runGameEasy();
    }
}

function exitGame() {
    returnHome();
    resetGame();
}

/**
 * Get all of the images
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

//Get array of 6 images for Easy mode
let imageArray1 = getImages();
removeValFromIndex = [6, 7, 8, 9];

for (const i of removeValFromIndex.reverse()) {
    imageArray1.splice(i, 1);
}

//Get array of 8 images for Medium mode
let imageArray2 = getImages();
removeValFromIndex = [8, 9];

for (const i of removeValFromIndex.reverse()) {
    imageArray2.splice(i, 1);
}

//Get array of 10 images for Hard mode
let imageArray3 = getImages();

//Duplicate the images to create arrays of 12, 16 & 20 images for Easy, Medium & Hard mode respectively
const imagesEasy = [...imageArray1, ...imageArray1];
const imagesMedium = [...imageArray2, ...imageArray2];
const imagesHard = [...imageArray3, ...imageArray3];

/* Randomize the image arrays to creat picklists for each difficulty level
 Created with help from Stack Overflow https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array */

let imagePicklistEasy = imagesEasy.sort(() => Math.random() - 0.5);
let imagePicklistMedium = imagesMedium.sort(() => Math.random() - 0.5);
let imagePicklistHard = imagesHard.sort(() => Math.random() - 0.5);

/**
 * Increase number of moves by 1 each time the player selects 2 cards
 */
function incrementMoves() {
    document.getElementById("moves").innerText = ++numberOfMoves;
    return numberOfMoves;
}

/*
 * Run the game when the user selects the difficulty "Easy"
 */
function runGameEasy() {
    gameArea.innerHTML = '';
    gameArea.classList.add("easy");
    gameAreaRight.classList.remove("hidden");
    //Generate the cards
    imagePicklistEasy.forEach((item) => {
        let card = document.createElement("div");
        let face = document.createElement("img");
        let back = document.createElement("div");
        //Add classes to the cards
        card.classList = "card";
        face.classList = "face";
        back.classList = "back";
        //Attach images to the cards
        face.src = item.imgSrc;
        //Assign data types to the cards
        card.setAttribute("data-image", item.name);
        //Append cards to the section
        gameArea.appendChild(card);
        card.appendChild(face);
        card.appendChild(back);

        card.addEventListener("click", function (e) {
            card.classList.toggle("flipCard");
            checkCards(e);
        });
    });
};

/*
 * Run the game when the user selects the difficulty "Medium"
 */
function runGameMedium() {
    gameArea.innerHTML = '';
    gameArea.classList.add("medium");
    gameAreaRight.classList.remove("hidden");
    //Generate the cards
    imagePicklistMedium.forEach((item) => {
        let card = document.createElement("div");
        let face = document.createElement("img");
        let back = document.createElement("div");
        //Add classes to the cards
        card.classList = "card";
        face.classList = "face";
        back.classList = "back";
        //Attach images to the cards
        face.src = item.imgSrc;
        //Assign data types to the cards
        card.setAttribute("data-image", item.name);
        //Append cards to the section
        gameArea.appendChild(card);
        card.appendChild(face);
        card.appendChild(back);

        card.addEventListener("click", function (e) {
            card.classList.toggle("flipCard");
            checkCards(e);
        });
    });
};

/*
 * Run the game when the user selects the difficulty "Hard"
 */
function runGameHard() {
    gameArea.innerHTML = '';
    gameArea.classList.add("hard");
    gameAreaRight.classList.remove("hidden");
    //Generate the cards
    imagePicklistHard.forEach((item) => {
        let card = document.createElement("div");
        let face = document.createElement("img");
        let back = document.createElement("div");
        //Add classes to the cards
        card.classList = "card";
        face.classList = "face";
        back.classList = "back";
        //Attach images to the cards
        face.src = item.imgSrc;
        //Assign data types to the cards
        card.setAttribute("data-image", item.name);
        //Append cards to the section
        gameArea.appendChild(card);
        card.appendChild(face);
        card.appendChild(back);

        card.addEventListener("click", function (e) {
            card.classList.toggle("flipCard");
            checkCards(e);
        });
    });
};

function finishGame() {
    winGameModal.classList.remove("hidden");
    gameArea.classList.add("hidden");
    gameAreaRight.classList.add("hidden");
    document.getElementById("final-moves-count").innerText = numberOfMoves;
}
let card = document.querySelectorAll(".card");

/**
 * Check cards for matches
 */
function checkCards(e) {
    let selectedCard = e.target;
    selectedCard.classList.add("flipped");
    let flippedCards = document.querySelectorAll(".flipped");
    if (typeof flippedCards[1] !== 'undefined') {
        let cardsMatch = flippedCards[0].dataset.image === flippedCards[1].dataset.image;
        if (flippedCards.length === 2) {
            if (cardsMatch) {
                incrementMoves();
                flippedCards.forEach(function (card) {
                    card.classList.add("match");
                    card.classList.remove("flipped");
                    let matchedCards = document.querySelectorAll(".match");
                    let matchedCardsLength = matchedCards.length;
                    let cards = document.querySelectorAll(".card");
                    let cardsLength = cards.length;
                    if (cardsLength === matchedCardsLength) {
                        setTimeout(function () {
                            finishGame();
                        }, 750);
                    }
                });

            } else {
                incrementMoves();
                flippedCards.forEach(function (card) {
                    card.classList.remove("flipped");
                    setTimeout(function () {
                        card.classList.remove("flipCard");
                    }, 1000);
                });
            };
        };
    }
};








