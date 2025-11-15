def my_function():
    if player.get(LedSpriteProperty.Y) == 3:
        player.change(LedSpriteProperty.Y, -1)
        basic.pause(200)
        player.change(LedSpriteProperty.Y, 1)
        basic.pause(100)
joystickbit.on_button_event(joystickbit.JoystickBitPin.P15,
    joystickbit.ButtonType.DOWN,
    my_function)

def on_button_pressed_ab():
    player.change(LedSpriteProperty.Y, -1)
    basic.pause(200)
    player.change(LedSpriteProperty.Y, 1)
input.on_button_pressed(Button.AB, on_button_pressed_ab)

def start():
    global level, player, grond1, grond2, grond3, grond4, grond5, spike1
    basic.clear_screen()
    joystickbit.init_joystick_bit()
    level = 1
    player = game.create_sprite(0, 3)
    grond1 = game.create_sprite(0, 4)
    grond2 = game.create_sprite(1, 4)
    grond3 = game.create_sprite(2, 4)
    grond4 = game.create_sprite(3, 4)
    grond5 = game.create_sprite(4, 4)
    spike1 = game.create_sprite(4, 4)
spike1: game.LedSprite = None
grond5: game.LedSprite = None
grond4: game.LedSprite = None
grond3: game.LedSprite = None
grond2: game.LedSprite = None
grond1: game.LedSprite = None
level = 0
player: game.LedSprite = None
start()

def on_forever():
    global level, spike1
    if input.button_is_pressed(Button.B) or joystickbit.get_rocker_value(joystickbit.rockerType.X) <= 200:
        if player.get(LedSpriteProperty.X) == 4:
            player.set(LedSpriteProperty.X, 0)
            level += 1
            basic.pause(100)
        else:
            player.move(1)
            basic.pause(100)
    if input.button_is_pressed(Button.A) or joystickbit.get_rocker_value(joystickbit.rockerType.X) >= 800:
        if not (level == 1) and player.get(LedSpriteProperty.X) == 0:
            player.set(LedSpriteProperty.X, 4)
            level += -1
            basic.pause(100)
        else:
            player.move(-1)
            basic.pause(100)
    # Controleer level en maak spike aan indien nodig
    if level == 2:
        spike1 = game.create_sprite(2, 3)
        if player.get(LedSpriteProperty.X) == 2 and player.get(LedSpriteProperty.Y) == 3:
            basic.clear_screen()
            basic.show_string("Game over!")
            start()
basic.forever(on_forever)
