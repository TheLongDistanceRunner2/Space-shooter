/* Author: Derek O Reilly, Dundalk Institute of Technology, Ireland.             */
/* There should always be a javaScript file with the same name as the html file. */
/* This file always holds the playGame function().                               */
/* It also holds game specific code, which will be different for each game       */


let game;


/******************** Declare game specific global data and functions *****************/
/* images must be declared as global, so that they will load before the game starts  */
let arrowUpImage = new Image();
arrowUpImage.src = "images/arrowUp.png";

let arrowDownImage = new Image();
arrowDownImage.src = "images/arrowDown.png";

let heartImage = new Image();
heartImage.src = "images/heart.png";

let fireButton = new Image();
fireButton.src = "images/fire.png";

let playerShip = new Image();
playerShip.src = "images/player.png";

let enemyShip = new Image();
enemyShip.src = "images/enemy.png";

let missle = new Image();
missle.src = "images/missle.png";

let obstacle = new Image();
obstacle.src = "images/obstacle2.png";

let scrollingBackgroundImage = new Image();
scrollingBackgroundImage.src = "images/background.png";

let buttonBackground = new Image();
buttonBackground.src = "images/button_background.png";

let explosion = new Image();
explosion.src = "images/explosion.png";


const BACKGROUND = 0;
const GAME_CONSOLE = 1;
const ARROW_UP = 2;
const ARROW_DOWN = 3;
const FIRE = 4; 
const LEVEL_TEXT = 5;
//const LEVEL_NUMBER = 6;
const SCORED_POINTS_TEXT = 6;
const SCORED_POINTS_TEXT_2 = 7;
const SCORED_POINTS_NUMBER = 8;
const PLAYER = 9;
const NEXT_LEVEL_TEXT = 10;
const WIN_MESSAGE = 11;
const PLAY_AGAIN = 12;
const BACK_TO_MENU = 13;
const EXPLOSION = 14;
const BIG_EXPLOSION = 15;
const LEVEL_NUMBER = 16;


// const TEXT_BUTTON = 100;
// const SMALL_TEXT_BUTTON = 101;
// const IMAGE_BUTTON = 102;
// const TEXT_AND_IMAGE_BUTTON = 103;
const MESSAGE = 104;

let enemyShips = [];
var enemiesNumber = 20; // TUTAJ NIE MOZE BYC WIEKSZY NUMER NIZ randomX.size * randomY.size    (31 * 9 = 279, czyli de facto 260)
let coordinates = [];

let playersMissles = [];
var numberOfPlayersMissles = 30;
var shotsFired = 0;

var levelNumber = 1;
var lives = 3;
var scoredPoints = 0;
var tmpPoints = 0;

//-------------------------
var randomX;
var randomY;

function initTabs() {
// canvas.width + canvas.width * 0.1
    randomX = [];
    let b = 0.2;

    for (let a = 0; a < 40; a++) {
        randomX.push(canvas.width + canvas.width * b);
        b += 0.2;
    }

    randomY = [canvas.height * 0.2, 
        canvas.height * 0.3, 
        canvas.height * 0.4, 
        canvas.height * 0.5, 
        canvas.height * 0.6, 
        canvas.height * 0.7];

    // randomX = [canvas.width + canvas.width * 0.1, 
    //             canvas.width + canvas.width * 0.2, 
    //             canvas.width + canvas.width * 0.3, 
    //             canvas.width + canvas.width * 0.4, 
    //             canvas.width + canvas.width * 0.5, 
    //             canvas.width + canvas.width * 0.6, 
    //             canvas.width + canvas.width * 0.7, 
    //             canvas.width + canvas.width * 0.8, 
    //             canvas.width + canvas.width * 0.9, 
    //             canvas.width + canvas.width * 1.0, 
    //             canvas.width + canvas.width * 1.1, 
    //             canvas.width + canvas.width * 1.2, 
    //             canvas.width + canvas.width * 1.3, 
    //             canvas.width + canvas.width * 1.4, 
    //             canvas.width + canvas.width * 1.5, 
    //             canvas.width + canvas.width * 1.6, 
    //             canvas.width + canvas.width * 1.7,
    //             canvas.width + canvas.width * 1.8, 
    //             canvas.width + canvas.width * 1.9, 
    //             canvas.width + canvas.width * 2.0, 
    //             canvas.width + canvas.width * 2.1, 
    //             canvas.width + canvas.width * 2.2, 
    //             canvas.width + canvas.width * 2.3, 
    //             canvas.width + canvas.width * 2.4, 
    //             canvas.width + canvas.width * 2.5, 
    //             canvas.width + canvas.width * 2.6, 
    //             canvas.width + canvas.width * 2.7, 
    //             canvas.width + canvas.width * 2.8, 
    //             canvas.width + canvas.width * 2.9, 
    //             canvas.width + canvas.width * 3.0, 
    //             canvas.width + canvas.width * 3.1];
}


let placesOnMap = [];
var _i = 0;

function setPositions() {
    for (let i = 0; i < randomX.length; i++) {
        for (let j = 0; j < randomY.length; j++) {
            let tmpObj = new PlaceOnMap(randomX[i], randomY[j]);
            placesOnMap.push(tmpObj);
            //console.log("dodano: " + tmpObj.getX() + " " + tmpObj.getY());
        }
    }
}

var randX = 0;
var randY = 0;


function getRandomX() {
    if (randomX.lenght > 0) {
        let tmp = randomX[Math.floor(Math.random()*randomX.length)];
        return tmp;
    }
    else {
        return 0;
    }
}

function getRandomY() {
    if (randomY.length > 0) {
        let tmp = randomY[Math.floor(Math.random()*randomY.length)];
        return tmp;
    }
    else {
        return 0;
    }
}

function getRandomCoordinates() {
    var tmpIndex = Math.floor(Math.random() * placesOnMap.length);
    //console.log(tmpIndex);
    //console.log("rozmiar tablicy: " + placesOnMap.length);
    randX = placesOnMap[tmpIndex].getX();
    randY = placesOnMap[tmpIndex].getY();
    placesOnMap.splice(tmpIndex, 1);
    //console.log("kuniec");
}
//---------------------------

var mouseDown = 0;

function mouse_active() {
    //console.log("Mouse down2");
    var tmpY = gameObjects[PLAYER].getY();

    if(tmpY > 0.1 * canvas.height) {
        tmpY -= 0.05 * canvas.height;
        gameObjects[PLAYER].setY(tmpY);
    }

    if (mouseDown == 1) { 
        setTimeout(mouse_active, 20);
    }
}

//------

var mouseDown2 = 0;

function mouse_active2() {
    //console.log("Mouse down2");
    var tmpY = gameObjects[PLAYER].getY();

    if(tmpY < 0.9 * canvas.height) {
        tmpY += 0.05 * canvas.height;
        gameObjects[PLAYER].setY(tmpY);
    }

    if (mouseDown2 == 1) { 
        setTimeout(mouse_active2, 20);
    }
}

function goBack() {
    window.location = "menu.html";
} 

function playAgain() {
    // // hide message and buttons:
    // gameObjects[WIN_MESSAGE].setY(3000);
    // gameObjects[PLAY_AGAIN].hide();
    // gameObjects[BACK_TO_MENU].hide();
    // // set the variables to start values:
    // levelNumber = 1;
    // lives = 3;
    // scoredPoints = 0;
    // tmpPoints = 0;
    // // restart game:
    // //game.endGame();
    // game.restart();
    window.location = "SpaceShooter.html";

} 

// function getRandomNumber(min, max) {
//     return Math.random() * (max - min) + min;
// }

/******************* END OF Declare game specific data and functions *****************/

/* Always have a playGame() function                                     */
/* However, the content of this function will be different for each game */
function playGame()
{
    /* We need to initialise the game objects outside of the Game class */
    /* This function does this initialisation.                          */
    /* Specifically, this function will:                                */
    /* 1. initialise the canvas and associated variables                */
    /* 2. create the various game gameObjects,                   */
    /* 3. store the gameObjects in an array                      */
    /* 4. create a new Game to display the gameObjects           */
    /* 5. start the Game                                                */



    /* Create the various gameObjects for this game. */
    /* This is game specific code. It will be different for each game, as each game will have it own gameObjects */

    // butons:
    gameObjects[ARROW_UP] = new Button(0, 0.65 * canvas.height, 0.1 * canvas.width, 0.15 * canvas.height, "", arrowUpImage);
    gameObjects[ARROW_DOWN] = new Button(0, 0.81 * canvas.height, 0.1 * canvas.width, 0.15 * canvas.height, "", arrowDownImage);    
    gameObjects[FIRE] = new Button(0.9 * canvas.width, 0.8 * canvas.height, 0.2 * canvas.height, 0.2 * canvas.height, "", fireButton);  
    // texts:
    gameObjects[LEVEL_TEXT] = new StaticText("LEVEL", 0.2 * canvas.width, 0.1 * canvas.height, "Times Roman", 28, "black");


    gameObjects[SCORED_POINTS_TEXT] = new StaticText("Scored", 0.35 * canvas.width, 0.06 * canvas.height, "Times Roman", 20, "white");
    gameObjects[SCORED_POINTS_TEXT_2] = new StaticText("points:", 0.46 * canvas.width, 0.06 * canvas.height, "Times Roman", 20, "white");
    gameObjects[SCORED_POINTS_NUMBER] = new StaticText(scoredPoints, 0.61 * canvas.width, 0.06 * canvas.height, "Times Roman", 20, "white")
    
    gameObjects[PLAYER] = new Player(playerShip, 0.1 * canvas.width, 0.5 * canvas.height, 0.1 * canvas.width, 0.1 * canvas.height);
    gameObjects[NEXT_LEVEL_TEXT] = new StaticText("Level: " + levelNumber, 0.4 * canvas.width, 0.5 * canvas.height, "Times Roman", 40, "white");

    gameObjects[BACKGROUND] = new ScrollingBackgroundImage(scrollingBackgroundImage, 70);
    gameObjects[PLAY_AGAIN] = new Button(2.5 * canvas.width, 2.5 * canvas.height, 2.5 * canvas.width, 2.5 * canvas.height, "   PLAY AGAIN!", buttonBackground);
    gameObjects[PLAY_AGAIN].setFontSize(20);
    gameObjects[BACK_TO_MENU] = new Button(2.5 * canvas.width, 2.5 * canvas.height, 2.5 * canvas.width, 2.5 * canvas.height, " BACK TO MENU", buttonBackground);
    gameObjects[BACK_TO_MENU].setFontSize(20);

    gameObjects[LEVEL_NUMBER] = new StaticText(levelNumber, 2.0 * canvas.width , 2.0 * canvas.height, "Times Roman", 28, "white");
    
    
    // initialize coordinates in tabs:
    initTabs();
    // call function with coordinates:
    setPositions();

    // create the enemy ships:
    for (let i = 0; i < enemiesNumber; i++)
    {
        getRandomCoordinates();
        // add coordinates to array:
        let tmpPlace = new PlaceOnMap(randX, randY);
        coordinates.push(tmpPlace);

        if (i % 2 == 0) {
            enemyShips[i] = new Enemy(enemyShip, randX, randY, 0.1 * canvas.width, 0.1 * canvas.height, "enemy", 100);
            enemyShips[i].start();
        }
        else {
            enemyShips[i] = new Enemy(obstacle, randX, randY, 0.1 * canvas.width, 0.1 * canvas.height, "obstacle", 100);
            enemyShips[i].start();
        }
    }

    // create player's missles:
    for (let i = 0; i < numberOfPlayersMissles; i++) {
        playersMissles[i] = new Missle(missle, 0.1 * canvas.width, 0.1 * canvas.height, 0.2 * canvas.width, 0.1 * canvas.height, 0, 10);
    }

    gameObjects[GAME_CONSOLE] = new GameConsole(heartImage);

 

    /* END OF game specific code. */


    /* Always create a game that uses the gameObject array */
    game = new SpaceShooterCanvas();

    /* Always play the game */
    game.start();

    
    //====================================================================================================================================================
    //   MOUSE DOWN:

    /* If they are needed, then include any game-specific mouse and keyboard listners */
    document.getElementById("gameCanvas")
    //.addEventListener("mousedown", function (e)
    .addEventListener("touchstart", function (e)
    {
        //console.log("Mouse down");
        //if (e.which === 1)  // left mouse button
        if(e.touches.length>=1)
        {
            let canvasBoundingRectangle = document.getElementById("gameCanvas").getBoundingClientRect();
            // let mouseX = e.clientX - canvasBoundingRectangle.left;
            // let mouseY = e.clientY - canvasBoundingRectangle.top;
            let mouseX = e.touches[0].pageX - canvasBoundingRectangle.left; //clientX
            let mouseY = e.touches[0].pageY - canvasBoundingRectangle.top;
            if (gameObjects[ARROW_UP].pointIsInsideBoundingRectangle(mouseX, mouseY))
            {
                // set first flag:
                mouseDown = 1;


                // var tmpY = gameObjects[PLAYER].getY();

                // if(tmpY > 10) {
                //     tmpY -= 20;
                //     gameObjects[PLAYER].setY(tmpY);
                // }
            
                // if (mouseDown == 1) { 
                //     setTimeout(mouse_active, 20);
                // }
            }
            else if (gameObjects[ARROW_DOWN].pointIsInsideBoundingRectangle(mouseX, mouseY))
            {
                // set the second flag:
                mouseDown2 = 1;    
                
                // var tmpY = gameObjects[PLAYER].getY();

                // if(tmpY < 440) {
                //     tmpY += 20;
                //     gameObjects[PLAYER].setY(tmpY);
                // }
            
                // if (mouseDown2 == 1) { 
                //     setTimeout(mouse_active2, 20);
                // }
            }
            else if (gameObjects[FIRE].pointIsInsideBoundingRectangle(mouseX, mouseY))
            {
                //console.log("Fire button pressed!");

                playersMissles[shotsFired].setX(gameObjects[PLAYER].getX() + 50);
                playersMissles[shotsFired].setY(gameObjects[PLAYER].getY() + 20);
                playersMissles[shotsFired].start();

                shotsFired++;

                if (shotsFired == numberOfPlayersMissles) {
                    shotsFired = 0;
                }
                // gameObjects[MESSAGE] = new StaticText("FIRE button was pressed", STATIC_TEXT_CENTRE, 490, "Times Roman", 20, "black");
                // gameObjects[MESSAGE].start();
            }
            // end game buttons:           
            else if (gameObjects[BACK_TO_MENU].pointIsInsideBoundingRectangle(mouseX, mouseY))
            {
                goBack();
            }
            else if (gameObjects[PLAY_AGAIN].pointIsInsideBoundingRectangle(mouseX, mouseY)) 
            {
                playAgain();
            }

            setTimeout(mouse_active, 0);
            setTimeout(mouse_active2, 0);
        }
    });


    //====================================================================================================================================================
    //   MOUSE UP:

    document.getElementById("gameCanvas")
    //.addEventListener("mouseup", function (e)
    .addEventListener("touchend", function (e)
    {
        //console.log("Mouse up");
        mouseDown = 0;
        mouseDown2 = 0;
        
        if (e.touches.length>=1)  // left mouse button
        {
            let canvasBoundingRectangle = document.getElementById("gameCanvas").getBoundingClientRect();
            // let mouseX = e.clientX - canvasBoundingRectangle.left;
            // let mouseY = e.clientY - canvasBoundingRectangle.top;
            let mouseX = e.touches[0].pageX - canvasBoundingRectangle.left; //clientX
            let mouseY = e.touches[0].pageY - canvasBoundingRectangle.top;
            
            if (gameObjects[ARROW_UP].pointIsInsideBoundingRectangle(mouseX, mouseY))
            {
                mouseDown = 0;
            }
            else if (gameObjects[ARROW_DOWN].pointIsInsideBoundingRectangle(mouseX, mouseY))
            {
                mouseDown2 = 0;
            }
            else if (gameObjects[FIRE].pointIsInsideBoundingRectangle(mouseX, mouseY))
            {
                // gameObjects[MESSAGE] = new StaticText("FIRE button was pressed", STATIC_TEXT_CENTRE, 490, "Times Roman", 20, "black");
                // gameObjects[MESSAGE].start();
                
            }
            setTimeout(mouse_active, 0);
            setTimeout(mouse_active2, 0);
        }
    });


    
    document.getElementById("gameCanvas").addEventListener("mousemove", function (e)
    {
        if (e.which === 0) // no button selected
        {
            let canvasBoundingRectangle = document.getElementById("gameCanvas").getBoundingClientRect();
            let mouseX = e.clientX - canvasBoundingRectangle.left;
            let mouseY = e.clientY - canvasBoundingRectangle.top;

            gameObjects[TEXT_BUTTON].pointIsInsideBoundingRectangle(mouseX, mouseY);
            gameObjects[SMALL_TEXT_BUTTON].pointIsInsideBoundingRectangle(mouseX, mouseY);
            gameObjects[IMAGE_BUTTON].pointIsInsideBoundingRectangle(mouseX, mouseY);
            gameObjects[TEXT_AND_IMAGE_BUTTON].pointIsInsideBoundingRectangle(mouseX, mouseY);
        }
    });

    
    //====================================================================================================================================================
    //   KEYBOARD:

    /* If they are needed, then include any game-specific mouse and keyboard listners */
    document.addEventListener("keydown", function (e)
    {
        if (e.keyCode === 38)  // up
        {
            var tmpY = gameObjects[PLAYER].getY();

            if(tmpY > 10) {
                tmpY -= 20;
                gameObjects[PLAYER].setY(tmpY);
            }
        }
        else if (e.keyCode === 40) // down
        {
            var tmpY = gameObjects[PLAYER].getY();

            if(tmpY < 440) {
                tmpY += 20;
                gameObjects[PLAYER].setY(tmpY);
            }
        }
        else if (e.keyCode === 32) // space
        {
            playersMissles[shotsFired].setX(gameObjects[PLAYER].getX() + 50);
            playersMissles[shotsFired].setY(gameObjects[PLAYER].getY() + 20);
            playersMissles[shotsFired].start();

            shotsFired++;

            if (shotsFired == numberOfPlayersMissles) {
                shotsFired = 0;
            }

            //console.log("SPACE pressed!");
            // playersMissles[0].setX(gameObjects[PLAYER].getX());
            // playersMissles[0].setY(gameObjects[PLAYER].getY());
            // playersMissles[0].start();
        }
    });
}

//=======================================================================================================
// touch:



// window.addEventListener("resize", function (e) {
//     canvas.width = canvas.clientWidth;
//     canvas.height = canvas.clientHeight;
// });