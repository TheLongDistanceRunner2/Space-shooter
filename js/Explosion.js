class Explosion extends GameObject
{
    /* Each gameObject MUST have a constructor() and a render() method.        */
    /* If the object animates, then it must also have an updateState() method. */

    constructor(explosionImage, centreX, centreY, size, delay = 0)
    {
        super(40, delay); /* as this class extends from GameObject, you must always call super() */

        /* These variables depend on the object */
        this.explosionImage = explosionImage;
        //this.explosionSound = explosionSound;
        this.centreX = centreX;
        this.centreY = centreY;
        this.size = size;
        this.delay = delay;
        this.NUMBER_OF_SPRITES = 74; // the number of gameObjects in the gameObject image
        this.NUMBER_OF_COLUMNS_IN_SPRITE_IMAGE = 9; // the number of columns in the gameObject image
        this.NUMBER_OF_ROWS_IN_SPRITE_IMAGE = 9; // the number of rows in the gameObject image	
        this.START_ROW = 0;
        this.START_COLUMN = 0;

        this.currentgameObject = 0; // the current gameObject to be displayed from the gameObject image  
        this.row = this.START_ROW; // current row in gameObject image
        this.column = this.START_COLUMN; // current column in gameObject image

        this.SPRITE_WIDTH = (this.explosionImage.width / this.NUMBER_OF_COLUMNS_IN_SPRITE_IMAGE);
        this.SPRITE_HEIGHT = (this.explosionImage.height / this.NUMBER_OF_ROWS_IN_SPRITE_IMAGE);

        this.isFirstCallOfUpdateState = true; // used to synchronise explosion sound with start of animation
    }

    updateState()
    {
        if (this.isFirstCallOfUpdateState)
        {
            //this.explosionSound.currentTime = 0;
            //this.explosionSound.play();
            this.isFirstCallOfUpdateState = false;
        }

        if (this.currentgameObject === this.NUMBER_OF_SPRITES)
        {
            this.stopAndHide();
        }
        this.currentgameObject++;

        this.column++;
        if (this.column >= this.NUMBER_OF_COLUMNS_IN_SPRITE_IMAGE)
        {
            this.column = 0;
            this.row++;
        }
    }

    render()
    {
        ctx.drawImage(this.explosionImage, this.column * this.SPRITE_WIDTH, this.row * this.SPRITE_WIDTH, this.SPRITE_WIDTH, this.SPRITE_HEIGHT, this.centreX - parseInt(this.size / 2), this.centreY - parseInt(this.size / 2), this.size, this.size);
    }
}