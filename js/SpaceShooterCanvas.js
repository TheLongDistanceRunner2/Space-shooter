function showText() {
    let tmpLevel = levelNumber;
    gameObjects[NEXT_LEVEL_TEXT].setX(0.4 * canvas.width);
    gameObjects[NEXT_LEVEL_TEXT].setY(0.5 * canvas.height);
    gameObjects[NEXT_LEVEL_TEXT].setTextColor("white");
    gameObjects[NEXT_LEVEL_TEXT].setText("Level: " + tmpLevel);
    gameObjects[NEXT_LEVEL_TEXT].setX(4.4 * canvas.width);
    gameObjects[NEXT_LEVEL_TEXT].setY(4.5 * canvas.height);
}

class SpaceShooterCanvas extends CanvasGame
{
    constructor() {
        super();

        // show text on map:
        setTimeout(showText, 2000);
    }

    collisionDetection() {
        // destroyed all enemies, so finish the game:
        if (enemiesNumber >= 250) {
            // stop all objects:
            gameObjects[PLAYER].stopAndHide();

            for (let i = 0; i < enemiesNumber; i++) {
                enemyShips[i].stopAndHide();
            }

            for (let i = 0; i < numberOfPlayersMissles; i++) {
                playersMissles[i].stopAndHide();
            }

            gameObjects[BACKGROUND].stop();

            // show message:
            gameObjects[WIN_MESSAGE] = new StaticText("GAME OVER!", 0.3 * canvas.width, 0.3 * canvas.height, "Times Roman", 80, "red");
            gameObjects[WIN_MESSAGE].start(); /* render win message */

            // send result to Firebase:
            setScore("Player3", scoredPoints);

            // show buttons:
            gameObjects[PLAY_AGAIN].setX(0.37 * canvas.width);
            gameObjects[PLAY_AGAIN].setY(0.4 * canvas.height);
            gameObjects[PLAY_AGAIN].setWidth(0.25 * canvas.width);
            gameObjects[PLAY_AGAIN].setHeight(0.1 * canvas.height);
            gameObjects[PLAY_AGAIN].setTextColor("red");
            gameObjects[PLAY_AGAIN].start();
            gameObjects[BACK_TO_MENU].setX(0.37 * canvas.width);
            gameObjects[BACK_TO_MENU].setY(0.55 * canvas.height);
            gameObjects[BACK_TO_MENU].setWidth(0.25 * canvas.width);
            gameObjects[BACK_TO_MENU].setHeight(0.1 * canvas.height);
            gameObjects[BACK_TO_MENU].setTextColor("black");
            gameObjects[BACK_TO_MENU].start();
        }

        // no lifes anymore, so finish the game: 
        if (lives == 0) {

            // give 2 seconds to show explosion of player's ship:
            setInterval(function ()
            {
                // stop all objects:
                gameObjects[PLAYER].stopAndHide();

                for (let i = 0; i < enemiesNumber; i++) {
                    enemyShips[i].stopAndHide();
                }

                for (let i = 0; i < numberOfPlayersMissles; i++) {
                    playersMissles[i].stopAndHide();
                }

                gameObjects[BACKGROUND].stop();

                // show message:
                gameObjects[WIN_MESSAGE] = new StaticText("GAME OVER!", 0.3 * canvas.width, 0.3 * canvas.height, "Times Roman", 50, "red");
                gameObjects[WIN_MESSAGE].start(); /* render win message */

                // send result to Firebase:
                setScore("Player3", scoredPoints);

                // show buttons:
                gameObjects[PLAY_AGAIN].setX(0.37 * canvas.width);
                gameObjects[PLAY_AGAIN].setY(0.4 * canvas.height);
                gameObjects[PLAY_AGAIN].setWidth(0.25 * canvas.width);
                gameObjects[PLAY_AGAIN].setHeight(0.1 * canvas.height);
                gameObjects[PLAY_AGAIN].setTextColor("red");
                gameObjects[PLAY_AGAIN].start();
                gameObjects[BACK_TO_MENU].setX(0.37 * canvas.width);
                gameObjects[BACK_TO_MENU].setY(0.55 * canvas.height);
                gameObjects[BACK_TO_MENU].setWidth(0.25 * canvas.width);
                gameObjects[BACK_TO_MENU].setHeight(0.1 * canvas.height);
                gameObjects[BACK_TO_MENU].setTextColor("black");
                gameObjects[BACK_TO_MENU].start();

            }, 2000);
        }

        // next level:
        if (tmpPoints == levelNumber * 10) {
            this.nextLevel();
        }

        _i = 0;

        // collision detection for the player bumping into obstacles or enemies:
        for  (_i; _i < enemiesNumber; _i++) {
            // player hits an obstacle or enemy:
            if (gameObjects[PLAYER].pointIsInsidePlayer(enemyShips[_i].getX(), enemyShips[_i].getY(), enemyShips[_i].getWidth(), enemyShips[_i].getHeight())) { 
                // show explosion:
                gameObjects[EXPLOSION] = new Explosion(explosion, enemyShips[_i].getX(), enemyShips[_i].getY(), 50);
                gameObjects[EXPLOSION].start();

                if (lives == 0) {
                    // show big explosion:
                    gameObjects[BIG_EXPLOSION] = new Explosion(explosion, gameObjects[PLAYER].getX(), gameObjects[PLAYER].getY(), 50);
                    gameObjects[BIG_EXPLOSION].start();
                }

                // shake the device:
                navigator.vibrate([1000]);

                // enemy hit:
                if (enemyShips[_i].getType() == "enemy") {
                    // increment number of destroyed enemies:
                    scoredPoints++;
                    tmpPoints++;

                    // show it on game console:
                    gameObjects[SCORED_POINTS_NUMBER].setText(scoredPoints);
                }
                // decrement number of lives:
                lives--; 

                // hide and stop:
                enemyShips[_i].moveToStartPosition();
                
                // move the enemy to it's start position: ?????
                //enemyShips[_i].moveToStartPosition();
            }
        }

        _i = 0;

        //  collision detection for the missles hiting obstacles or enemies:
        for (let i = 0; i < numberOfPlayersMissles; i++) {
            for (_i = 0; _i < enemiesNumber; _i++) {
                // missle hits enemy or obstacle:
                if(playersMissles[i].pointIsInsidePlayer(enemyShips[_i].getX(), enemyShips[_i].getY(), enemyShips[_i].getWidth(), enemyShips[_i].getHeight())) {  
                    // show explosion:
                    gameObjects[EXPLOSION] = new Explosion(explosion, enemyShips[_i].getX(), enemyShips[_i].getY(), 50);
                    gameObjects[EXPLOSION].start();

                    if (lives == 0) {
                        // show big explosion:
                        gameObjects[BIG_EXPLOSION] = new Explosion(explosion, gameObjects[PLAYER].getX(), gameObjects[PLAYER].getY(), 50);
                        gameObjects[BIG_EXPLOSION].start();
                    }
                    
                    // enemy hit:
                    if (enemyShips[_i].getType() == "enemy") {   
                        // increment number of destroyed enemies:
                        scoredPoints++;
                        tmpPoints++;
                        
                        // show it on game console:
                        gameObjects[SCORED_POINTS_NUMBER].setText(scoredPoints);    
                    }

                    // hide missle and enemy:
                    playersMissles[i].setY(canvas.height * 4.0);
                    enemyShips[_i].moveToStartPosition();
                }
            }
        }
    }

    render() {
        super.render();

        for (let i = 0; i < enemyShips.length; i++)
        {
            if (enemyShips[i].isDisplayed())
            {
                enemyShips[i].render();
            }
        }

        for (let i = 0; i < playersMissles.length; i++)
        {
            if (playersMissles[i].isDisplayed())
            {
                playersMissles[i].render();
            }
        }
    }

    nextLevel() {
        // increment level mnumber:
        levelNumber++;
            
        // show it on game console:
        //gameObjects[LEVEL_NUMBER].setText(levelNumber);

        // show text on map:
        setTimeout(showText, 2000);
        
        // increment number of enemies:
        enemiesNumber += 20;

        // move all the objects to new start positions, so:
        // clear placesOnMap array:
        placesOnMap = [];

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

        // hide all missles:
        for (let i = 0; i < numberOfPlayersMissles; i++) {
            playersMissles[i].setY(4.0 * canvas.height);
        }

        // set tmpPoints to 0:
        tmpPoints = 0;
    }
}

