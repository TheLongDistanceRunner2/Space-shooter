class Player extends GameObject
{
    constructor(staticImage, x, y, width, height) {
        super(null);

        this.staticImage = staticImage;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    updateState() {
        this.y = y;
    }

    render() {
        ctx.drawImage(this.staticImage, this.x, this.y, this.width, this.height);
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