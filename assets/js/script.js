// Select all buttons and put into an array of buttons
let buttons = document.querySelectorAll("button");

// Loop over each button in the array of buttons
buttons.forEach(button => {
    // Add a click event listener to the current button in the loop
    button.addEventListener("click", function (e) {
        // When clicked, get the data-modal from the clicked button
        const modal = e.target.dataset.modal;

        if (modal === "new-game") {
            selectDifficulty();
        } else if (modal === "about") {
            aboutSection();
        } else if (modal === "instructions") {
            instructionsSection();
        }
    });

});

/**
 * Populate the select difficulty menu
 */
function selectDifficulty() {
    let selectDifficultyMenu = document.getElementById("difficulty");
    selectDifficultyMenu.classList.remove("hidden");
    let mainMenu = document.getElementById("main-menu");
    mainMenu.style.display = "none";
    console.log("Select Difficulty");
}

function aboutSection() {
    console.log("about");
}

function instructionsSection() {
    console.log("instructions");
}

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
let images = getImages();
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
        section.appendChild(card);
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
