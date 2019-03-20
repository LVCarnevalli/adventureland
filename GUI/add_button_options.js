// This script only works if it is executed by the "Code" inside the game.

parent.$(".gamebutton:contains(CONF)").after(
    '<div id="gamebutton_options" style="margin-left: 5px;" class="gamebutton" onclick="btc(event); parent.window.showOptions()">HIDE OPTIONS</div>'
);

parent.window.showOptions = function show_options() {
    if (!parent.window.gamebuttons) {
        parent.window.gamebuttons = parent.$(
            "#toprightcorner .gamebutton:visible:not(#gamebutton_options)"
        );
    }
    if (parent.$(parent.window.gamebuttons[0]).is(":hidden")) {
        parent.window.gamebuttons.show();
        parent.$("#gamebutton_options")[0].innerText = "HIDE OPTIONS";
    } else {
        parent.window.gamebuttons.hide();
        parent.$("#gamebutton_options")[0].innerText = "OPTIONS";
    }
};