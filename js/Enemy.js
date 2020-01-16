let startX;
let startY;

class Enemy extends GameObject
{
    constructor(staticImage, x, y, width, height, type, updateStateMilliseconds) {
        super(updateStateMilliseconds);

        this.staticImage = staticImage;
        this.x = x;
        this.startX = x;
        this.y = y;//this.getRandomArbitrary(50,450);
        this.startY = y;
        this.width = width;
        this.height = height;
        this.type = type;
    }

    updateState() {
        if (this.x > 0.1 * canvas.width) {
            this.x = this.x - 0.02 * canvas.width;
        }
        else {
            this.x = 4.0 * canvas.width;//this.startX;
        }
    }

    render() {
        //enemy gets inside game area:
        if (this.x < 0.82 * canvas.width) {
            //console.log("wchodzimy do przesrzni gry");
            // enemy reaches the end of game area: 
            if (this.x > 0.1 * canvas.width) {
                ctx.drawImage(this.staticImage, this.x, this.y, this.width, this.height);
            }
            // // enemy is out of area so hide him and start again:
            // else {
            //     //super.stopAndHide();
            //     //super.stop();
            //     ctx.drawImage(this.staticImage, this.x, this.y, 60, 50);
            //     super.start();
            // }
        }
    }

    moveToStartPosition() {
                                        // to not to collide with each other:
        this.x = coordinates[_i].getX() + randomX[randomX.length];  
        this.y = coordinates[_i].getY() + randomY[randomY.length];
        
    }

    hide() {
        this.y = 5.0 * canvas.height;
    }

    getX()
    {
        return this.x;
    }

    getY()
    {
        return this.y;
    }

    setX(x)
    {
        this.x = x;
    }

    setY(y)
    {
        this.y = y;
    }

    setWidth(width) {
        this.width = width; 
    }

    getWidth() {
        return this.width;
    }

    setHeight(height) {
        this.height = height;
    }

    getHeight() {
        return this.height;
    }

    setType(type) {
        this.type = type;
    }

    getType() {
        return this.type;
    }

    getRandomArbitrary(min, max) {
        return Math.random() * (max - min) + min;
    }
}