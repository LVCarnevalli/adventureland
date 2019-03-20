// This script only works if it is executed by the "Code" inside the game.

parent.stage.children.filter(
    child =>
    child.pluginName == "sprite" &&
    child._font == 'normal normal normal 32px "Arial"'
)[0].visible = false;