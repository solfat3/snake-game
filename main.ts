enum Direction {
    Up, Down, Left, Right
}

info.setScore(0);

let apple = sprites.create(img`
    . . 7 7 . . . .
    . f f f f f f .
    f 2 2 2 2 1 1 f
    f 2 2 2 2 2 2 f
    f 2 2 2 2 2 2 f
    . f 2 2 2 2 f .
    . f 2 2 2 2 f .
    . . f f f f . .
`,SpriteKind.Food)
let ducks: Array<Sprite> = [];
// let playerSprite = ;
 ducks.push(sprites.create(img`
     . . . . . . . . . . b b b . . .
     . . . . . . . . . b b 7 b . . .
     . . . . . . . . . b 7 7 b . . .
     . . . . . . b b b b b b . . . .
     . . . . . b b 7 7 7 7 7 b . . .
     . b b b b b 7 7 7 7 7 7 7 b . .
     . b d 7 b 7 7 7 7 7 7 7 7 b . .
     . . b 7 7 b 7 d 1 f 7 d 4 f . .
     . . b d 7 7 b 1 f f 7 4 4 c . .
     . . . b 7 7 7 d f b 4 4 4 4 b .
     . . . c d 7 7 b 7 4 4 4 4 4 4 b
     . . . . c c b 7 7 7 7 7 7 7 b .
 `, SpriteKind.Player))
let playerSprite = ducks[0];
playerSprite.setFlag(SpriteFlag.StayInScreen, true);
playerSprite.setPosition(0, 0);

sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function(sprite, otherSprite) {
    apple.setPosition(randint(1, 15)*10, randint(1, 11)*10);
     ducks.push(sprites.create(img`
     . . . . . . . . . . b b b . . .
     . . . . . . . . . b b 5 b . . .
     . . . . . . . . . b 5 5 b . . .
     . . . . . . b b b b b b . . . .
     . . . . . b b 5 5 5 5 5 b . . .
     . b b b b b 5 5 5 5 5 5 5 b . .
     . b d 5 b 5 5 5 5 5 5 5 5 b . .
     . . b 5 5 b 5 d 1 f 5 d 4 f . .
     . . b d 5 5 b 1 f f 5 4 4 c . .
     . . . b 5 5 5 d f b 4 4 4 4 b .
     . . . c d 5 5 b 5 4 4 4 4 4 4 b
     . . . . c c b 5 5 5 5 5 5 5 b .
 `, SpriteKind.Player));
    ducks[ducks.length - 1].setPosition(sprite.x, sprite.y)
    info.changeScoreBy(1);
})


let frametime = game.runtime();
let delta = 0
let direction = Direction.Right;

game.onUpdate(function() {
    delta += game.runtime() - frametime;
    frametime = game.runtime();
    let x = playerSprite.x;
    let y = playerSprite.y;
    let previousX = playerSprite.x;
    let previousY = playerSprite.y;
    let speedx = 16;
    let speedy = 12;
    if (controller.anyButton.isPressed()) {
        if (controller.right.isPressed()) {
            direction = Direction.Right
        }
        else if (controller.left.isPressed()) {
            direction = Direction.Left
        }
        else if (controller.up.isPressed()) {
            direction = Direction.Up
        }
        else if (controller.down.isPressed()) {
            direction = Direction.Down
        }
    }

    switch(direction) {
        case Direction.Right: x += speedx; break;
        case Direction.Left: x -= speedx; break;
        case Direction.Up: y -= speedy; break;
        case Direction.Down: y += speedy; break;
    }

    if (delta > 240) {
        let previousX = 0
        let previousY = 0
        for (let i = 0; i < ducks.length; i++) {
            let tempX = ducks[i].x
            let tempY = ducks[i].y
            if (i == 0) {
                ducks[i].setPosition(x, y)
            } else {
                ducks[i].setPosition(previousX, previousY);
            }
            previousX = tempX
            previousY = tempY
        }
        delta = 0
    }
})
