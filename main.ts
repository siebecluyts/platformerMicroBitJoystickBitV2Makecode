joystickbit.onButtonEvent(joystickbit.JoystickBitPin.P15, joystickbit.ButtonType.down, function () {
    if (player.get(LedSpriteProperty.Y) == 3) {
        player.change(LedSpriteProperty.Y, -1)
        basic.pause(200)
        player.change(LedSpriteProperty.Y, 1)
        basic.pause(100)
    }
})
input.onButtonPressed(Button.AB, function () {
    player.change(LedSpriteProperty.Y, -1)
    basic.pause(200)
    player.change(LedSpriteProperty.Y, 1)
})
function start () {
    gameovertexton = 0
    basic.clearScreen()
    joystickbit.initJoystickBit()
    level = 1
    player = game.createSprite(0, 3)
    grond1 = game.createSprite(0, 4)
    grond2 = game.createSprite(1, 4)
    grond3 = game.createSprite(2, 4)
    grond4 = game.createSprite(3, 4)
    grond5 = game.createSprite(4, 4)
    spike1 = game.createSprite(4, 4)
    basic.pause(100)
    spike1.delete()
    led.unplot(2, 3)
    led.unplot(2, 2)
}
let spike1: game.LedSprite = null
let grond5: game.LedSprite = null
let grond4: game.LedSprite = null
let grond3: game.LedSprite = null
let grond2: game.LedSprite = null
let grond1: game.LedSprite = null
let level = 0
let gameovertexton = 0
let player: game.LedSprite = null
start()
basic.forever(function () {
    if (input.buttonIsPressed(Button.B) || joystickbit.getRockerValue(joystickbit.rockerType.X) <= 200) {
        if (player.get(LedSpriteProperty.X) == 4) {
            player.set(LedSpriteProperty.X, 0)
            level += 1
            basic.pause(100)
        } else {
            player.move(1)
            basic.pause(100)
        }
    }
    if (input.buttonIsPressed(Button.A) || joystickbit.getRockerValue(joystickbit.rockerType.X) >= 800) {
        if (!(level == 1) && player.get(LedSpriteProperty.X) == 0) {
            player.set(LedSpriteProperty.X, 4)
            level += -1
            basic.pause(100)
        } else {
            player.move(-1)
            basic.pause(100)
        }
    }
    // Controleer level en maak spike aan indien nodig
    if (level == 2) {
        spike1 = game.createSprite(2, 3)
        if (player.get(LedSpriteProperty.X) == 2 && player.get(LedSpriteProperty.Y) == 3) {
            gameovertexton = 1
            basic.clearScreen()
            basic.showString("Game over!")
            start()
        }
    }
})
basic.forever(function () {
    if (!(level == 2) && (!(player.get(LedSpriteProperty.X) == 2 && player.get(LedSpriteProperty.Y) == 3) && gameovertexton == 0)) {
        led.unplot(2, 3)
    }
    if (level == 2 && (!(player.get(LedSpriteProperty.X) == 2 && (player.get(LedSpriteProperty.Y) == 2 || player.get(LedSpriteProperty.Y) == 3)) && gameovertexton == 0)) {
        led.unplot(2, 2)
    }
    if (!(level == 2) && (!(player.get(LedSpriteProperty.X) == 2 && (player.get(LedSpriteProperty.Y) == 2 || player.get(LedSpriteProperty.Y) == 3)) && gameovertexton == 0)) {
        led.unplot(2, 3)
        led.unplot(2, 2)
    }
})
