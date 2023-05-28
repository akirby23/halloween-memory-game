let cardsContainer = document.querySelector(".cards");

/**
 * 
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
let cardData = imagesPicklist;
cardData.sort(() => Math.random() - 0.5);
console.log(cardData);
