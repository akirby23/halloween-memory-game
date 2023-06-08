// Default game state
let numberOfMoves = 0;

// Game constants
const mainMenu = document.getElementById("main-menu");
const selectDifficultyMenu = document.getElementById("difficulty");
const about = document.getElementById("about");
const instructions = document.getElementById("instructions");
const gameArea = document.getElementById("game-area-center");
const gameAreaRight = document.getElementById("game-area-right");
const gameAreaContainer = document.querySelector(".game-area-container");
const winGameModal = document.getElementById("win-game-modal");
const cardBack = getCardBack();
const card = document.querySelectorAll(".card");

// Button constants
const buttons = document.querySelectorAll("button");
const resetGameButton = document.getElementById("reset-game");
const exitGameButton = document.getElementById("exit-game");
const playAgainButton = document.getElementById("play-again");
const winBackButton = document.getElementById("win-back-button");

// Button event listeners
// Modal button event listeners
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

/*
Reset game button event listener
Prompts the user to confirm whether or not they want to reset the game upon clicking
*/
resetGameButton.addEventListener("click", function (e) {
    confirmReset();
});

/* 
Exit game button event listener
Prompts the user to confirm whether or not they want to exit the game upon clicking
*/
exitGameButton.addEventListener("click", function (e) {
    confirmExit();
});

/* 
Play again button event listener
Returns the user back to the game area & resets the game upon clicking
*/
playAgainButton.addEventListener("click", function (e) {
    resetGame();
});

/* 
Win back button event listener
Once the game has been cleared, the user will be returned back to the main menu upon clicking
*/
winBackButton.addEventListener("click", function (e) {
    exitGame();
});


/**
 * Populate the select difficulty menu from the main menu.
 */
function selectDifficulty() {
    selectDifficultyMenu.classList.remove("hidden");
    mainMenu.classList.add("hidden");
    about.classList.add("hidden");
    instructions.classList.add("hidden");
}

/**
 * Populate the "About" window from the main menu.
 */
function aboutSection() {
    about.classList.remove("hidden");
    mainMenu.classList.add("hidden");
}

/**
 * Populate the instructions section from the main menu.
 */
function instructionsSection() {
    instructions.classList.remove("hidden");
    mainMenu.classList.add("hidden");
}

/**
 * Go back to the main menu.
 */
function returnHome() {
    selectDifficultyMenu.classList.add("hidden");
    about.classList.add("hidden");
    instructions.classList.add("hidden");
    winGameModal.classList.add("hidden");
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

/**
 * Reset the game.
 * Number of moves is reverted back to 0 & game is re-run.
 */
function resetGame() {
    numberOfMoves = 0;
    document.getElementById("moves").innerText = numberOfMoves;
    gameArea.removeAttribute("class");
    gameAreaRight.classList.add("hidden");
    gameAreaContainer.classList.add("hidden");
    winGameModal.classList.add("hidden");
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

/**
 * Return the user back to the main menu & reset the game.
 */
function exitGame() {
    returnHome();
    resetGame();
}


/**
 * Get the images for the front of the cards.
 */
function getCardFront() {
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

/**
 * Get image for the back of the cards.
 */
function getCardBack() {
    return [
        { imgSrc: "assets/images/cards/card-back.png", name: "back" }
    ];
}

/*
Generate image picklists.
Created with help from Stack Overflow: https://stackoverflow.com/questions/9425009/remove-multiple-elements-from-array-in-javascript-jquery
*/
//Get array of 6 images for Easy mode
let imageArray1 = getCardFront();
let removeValFromIndex = [6, 7, 8, 9];

for (const i of removeValFromIndex.reverse()) {
    imageArray1.splice(i, 1);
}

//Get array of 8 images for Medium mode
let imageArray2 = getCardFront();
removeValFromIndex = [8, 9];

for (const i of removeValFromIndex.reverse()) {
    imageArray2.splice(i, 1);
}

//Get array of 10 images for Hard mode
let imageArray3 = getCardFront();

//Duplicate the images to create arrays of 12, 16 & 20 images for Easy, Medium & Hard mode respectively
const imagePicklistEasy = [...imageArray1, ...imageArray1];
const imagePicklistMedium = [...imageArray2, ...imageArray2];
const imagePicklistHard = [...imageArray3, ...imageArray3];

/*
Randomizing functions
Created with help from Stack Overflow https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
*/

/**
 * Randomize the image picklist for Easy mode.
 */
function randomizeEasyImages() {
    imagePicklistEasy.sort(() => Math.random() - 0.5);
    return imagePicklistEasy;
}

/**
 * Randomize the image picklist for Medium mode.
 */
function randomizeMediumImages() {
    imagePicklistMedium.sort(() => Math.random() - 0.5);
    return imagePicklistMedium;
}

/**
 * Randomize the image picklist for Hard mode.
 */
function randomizeHardImages() {
    imagePicklistHard.sort(() => Math.random() - 0.5);
    return imagePicklistHard;
}

/**
 * Increase number of moves by 1 each time the player selects 2 cards.
 */
function incrementMoves() {
    document.getElementById("moves").innerText = ++numberOfMoves;
    return numberOfMoves;
}

/*
 * Run the game when the user selects the difficulty "Easy".
 */
function runGameEasy() {
    gameArea.innerHTML = '';
    gameArea.classList.add("easy");
    gameAreaRight.classList.remove("hidden");
    gameAreaContainer.classList.remove("hidden");
    /*
    Generate the cards.
    Inspiration for the code taken from a YouTube tutorial by developedbyed: https://www.youtube.com/watch?v=-tlb4tv4mC4&t=2180s
    */
    let gameCards = randomizeEasyImages();
    gameCards.forEach(function (item) {
        let card = document.createElement("div");
        let face = document.createElement("img");
        let back = document.createElement("div");
        //Add classes to the cards
        card.classList = "card";
        face.classList = "face";
        back.classList = "back";
        //Attach images to the front of the cards
        face.src = item.imgSrc;
        console.log(face.src);
        //Assign data types to the cards
        card.setAttribute("data-image", item.name);
        //Append cards to the section
        gameArea.appendChild(card);
        card.appendChild(face);
        card.appendChild(back);
        let cardBack = getCardBack();
        cardBack.forEach(function (item) {
            back.src = item.imgSrc;
            console.log(back.src);
        });
        //Flip the card & run check upon clicking
        card.addEventListener("click", function (e) {
            card.classList.toggle("flipCard");
            checkCards(e);
        });
    });
}

/*
 * Run the game when the user selects the difficulty "Medium".
 */
function runGameMedium() {
    gameArea.innerHTML = '';
    gameArea.classList.add("medium");
    gameAreaContainer.classList.remove("hidden");
    gameAreaRight.classList.remove("hidden");
    /*
    Generate the cards.
    Inspiration for the code taken from a YouTube tutorial by developedbyed: https://www.youtube.com/watch?v=-tlb4tv4mC4&t=2180s
    */
    let gameCards = randomizeMediumImages();
    gameCards.forEach(function (item) {
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
        //Flip the card & run check upon clicking
        card.addEventListener("click", function (e) {
            card.classList.toggle("flipCard");
            checkCards(e);
        });
    });
}

/*
 * Run the game when the user selects the difficulty "Hard".
 */
function runGameHard() {
    gameArea.innerHTML = '';
    gameArea.classList.add("hard");
    gameAreaRight.classList.remove("hidden");
    gameAreaContainer.classList.remove("hidden");
    /*
    Generate the cards
    Inspiration for the code taken from a YouTube tutorial by developedbyed: https://www.youtube.com/watch?v=-tlb4tv4mC4&t=2180s
    */
    let gameCards = randomizeHardImages();
    gameCards.forEach(function (item) {
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
        //Flip the card & run check upon clicking
        card.addEventListener("click", function (e) {
            card.classList.toggle("flipCard");
            checkCards(e);
        });
    });
}

/**
 * Once all cards are matched, the game area is hidden and the winGameModal is populated.
 * The user will be informed of how many moves it took them to clear the game. 
 * The user will be given the option to play again or return to the main menu.
 */
function finishGame() {
    winGameModal.classList.remove("hidden");
    gameArea.classList.add("hidden");
    gameAreaRight.classList.add("hidden");
    gameAreaContainer.classList.add("hidden");
    document.getElementById("final-moves-count").innerText = numberOfMoves;
}

/**
 * Check cards for matches.
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
                        /*
                        Delays the game finishing for 0.75 seconds when the final pair is matched. 
                        Written with help from w3schools: https://www.w3schools.com/jsref/met_win_settimeout.asp
                        */
                        setTimeout(function () {
                            finishGame();
                        }, 750);
                    }
                });

            } else {
                incrementMoves();
                flippedCards.forEach(function (card) {
                    card.classList.remove("flipped");
                    /*
                    Delays the cards flipping back for 1 second once 2 cards that don't match have been selected. 
                    Written with help from w3schools: https://www.w3schools.com/jsref/met_win_settimeout.asp
                    */
                    setTimeout(function () {
                        card.classList.remove("flipCard");
                    }, 1000);
                });
            }
        }
    }
}








