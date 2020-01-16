class Missle extends GameObject
{
    constructor(staticImage, x, y, width, height, flag, updateStateMilliseconds) {
        super(updateStateMilliseconds);

        this.staticImage = staticImage;
        this.x = x;
        this.y = y;//this.getRandomArbitrary(50,450);
        this.width = width;
        this.height = height;
        this.flag = flag;
    }

    updateState() {
        if (this.flag == 0) {
            // player's missle is flying towards enemies:
            this.x += 0.01 * canvas.width;
        }
        // else if (this.flag == 1) {
        //     // enemy's missle is flying towards player:
        //     this.x -= 10;
        // }
    }

    render() {
        if (this.flag == 0) {
            if (this.x < 0.7 * canvas.width) {
                ctx.drawImage(this.staticImage, this.x, this.y, 0.02 * canvas.width, 0.01 * canvas.height);
            }
            else {
                //super.stopAndHide();
                this.y = 5.0 * canvas.height;
            }
        }
        // else if (this.flag == 1) {
        //     if (this.x > 100) {
        //         ctx.drawImage(this.staticImage, this.x, this.y, 20, 5);
        //     }
        //     else {
        //         super.stopAndHide();
        //     }
        // }
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

    // coordinates of obstacle:
    pointIsInsidePlayer(_x, _y, _width, _height) {
        // collision detected:
        if (this.x < _x + _width && 
            this.x + this.width > _x &&
            this.y < _y + _height && 
            this.y + this.height > _y) {
                return true;
        }
        // collision NOT detected:
        else {
            return false; 
        }
    }

}