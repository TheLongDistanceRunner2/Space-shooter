class GameConsole extends GameObject 
{
    constructor(heartImage) {
        super(null); /* as this class extends from GameObject, you must always call super() */
        this.heartImage = heartImage;
    }

    // setLevelNumber(levelNumber) {
    //     this.levelNumber = levelNumber;
    // }

    // getLevelNumber() {
    //     return this.levelNumber;
    // }

    // setNumberOfDestroyedEnemies(numberOfDestroyedEnemies) {
    //     this.numberOfDestroyedEnemies = numberOfDestroyedEnemies;
    // }

    // getNumberOfDestroyedEnemies() {
    //     return this.numberOfDestroyedEnemies;
    // }

    // setNumberOfLives(numberOfLives) {
    //     this.numberOfLives = numberOfLives;
    // }

    // getNumberOfLives() {
    //     return this.numberOfLives;
    // }

    render() {
        // draw backround image:            
        ctx.fillStyle = "LightGray"; // #D3D3D3
        ctx.fillRect(0, 0, 0.1 * canvas.width, canvas.height);
        ctx.fillRect(0.9 * canvas.width, 0, canvas.width, canvas.height);

        // draw hearts depending on number of lives:
        if (lives == 3) {
            ctx.drawImage(this.heartImage, 0.025 * canvas.width, 0.05 * canvas.height, 0.05 * canvas.width, 0.09 * canvas.height);
            ctx.drawImage(this.heartImage, 0.025 * canvas.width, 0.15 * canvas.height, 0.05 * canvas.width, 0.09 * canvas.height);
            ctx.drawImage(this.heartImage, 0.025 * canvas.width, 0.25 * canvas.height, 0.05 * canvas.width, 0.09 * canvas.height);
        }
        else if(lives == 2) {
            ctx.drawImage(this.heartImage, 0.025 * canvas.width, 0.05 * canvas.height, 0.05 * canvas.width, 0.09 * canvas.height);
            ctx.drawImage(this.heartImage, 0.025 * canvas.width, 0.15 * canvas.height, 0.05 * canvas.width, 0.09 * canvas.height);
        }
        else if(lives == 1) {
            ctx.drawImage(this.heartImage, 0.025 * canvas.width, 0.05 * canvas.height, 0.05 * canvas.width, 0.09 * canvas.height);
        }
    }
}