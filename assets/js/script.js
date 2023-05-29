let section = document.querySelector("section");

/**
 * Get image data 
 */
let getImages = () => [
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
let images = getImages();
let imagesPicklist = [...images, ...images];

/**
 * Randomize the cards
 */
let randomize = () => {
    let cardData = imagesPicklist;
    cardData.sort(() => Math.random() - 0.5);
    return cardData;
};


/*
 * Generate the cards
 */
function cardGenerator() {
    let cardData = randomize();
    //Generate the HTML
    cardData.forEach((item) => {
        let card = document.createElement("div");
        let face = document.createElement("img");
        let back = document.createElement("div");
        card.classList = "card";
        face.classList = "face";
        back.classList = "back";
        //Append images to the cards
        face.src = item.imgSrc;
        //Append cards to the section
        section.appendChild(card);
        card.appendChild(face);
        card.appendChild(back);
    });
};

/*
cardGenerator();
*\