// ==UserScript==
// @name         Adventure Land Clean Template
// @version      1.0
// @author       lcarnevalli
// @match        https://adventure.land/*
// @grant        GM_addStyle
// @grant        GM_getValue
// @grant        GM_setValue
// @require https://code.jquery.com/jquery-3.3.1.min.js
// ==/UserScript==
const $ = window.jQuery;

function _isPage(type) {
  return unsafeWindow.location.href.includes(type);
}

function _action(key, condition, callback) {
  unsafeWindow[key] = setInterval(() => {
    console.warn(
      `Execute interval ${key} for adventure land clean template...`
    );
    if (typeof condition === "function" ? condition() : condition) {
      clearInterval(unsafeWindow[key]);
      callback();
    }
  }, 250);
}

function _injectScript(innerHTML) {
  const script = document.createElement("script");
  script.type = "text/javascript";
  script.innerHTML = innerHTML;
  document.getElementsByTagName("head")[0].appendChild(script);
}

_action("hideFPS", () => unsafeWindow.game_loaded == true, function() {
  stage.children.filter(
    child =>
      child.pluginName == "sprite" &&
      child._font == 'normal normal normal 32px "Arial"'
  )[0].visible = false;
});

_action(
  "addButtonOptions",
  () =>
    _isPage("character") && $(".gamebutton:contains(CONF):visible").length > 0,
  function() {
    $(".gamebutton:contains(CONF)").after(
      '<div id="gamebutton_options" style="margin-left: 5px;" class="gamebutton" onclick="btc(event); show_options()">HIDE OPTIONS</div>'
    );
    _injectScript(`
          ${function show_options() {
            if (!window.gamebuttons) {
              window.gamebuttons = $(
                "#toprightcorner .gamebutton:visible:not(#gamebutton_options)"
              );
            }

            if ($(window.gamebuttons[0]).is(":hidden")) {
              window.gamebuttons.show();
              $("#gamebutton_options")[0].innerText = "HIDE OPTIONS";
            } else {
              window.gamebuttons.hide();
              $("#gamebutton_options")[0].innerText = "OPTIONS";
            }
          }}
        `);
  }
);

_action(
  "customizeSkillBar",
  () => _isPage("character") && $("#skillbar").length > 0,
  function() {
    $("#skillbar")
      .parent()
      .css("margin-bottom", "15px");
  }
);

_action(
  "customizeHPMPBar",
  () => _isPage("character") && $(".bshadow2").length > 0,
  function() {
    $(".bshadow2")
      .parent()
      .css("margin-bottom", "-1px");
  }
);

_action(
  "customizeXPBar",
  () => _isPage("character") && $(".xpsui").length > 0,
  function() {
    const xpsui = $(".xpsui")[0];
    $(".xpsui")[0].remove();
    $("#bottommid")[0].append(xpsui);
    $(".vtopx").css("border-bottom", "0");
  }
);

GM_addStyle(`
#topleftcorner,
#toprightcorner,
#topui,
.menu {
  padding: 5px !important;
}

#theskills {
  bottom: 28px !important;
  padding-right: 5px !important;
}

#bottomleftcorner {
  bottom: 28px !important;
  padding-left: 5px !important;
}

#bottomrightcorner {
  bottom: 28px !important;
  padding-right: 5px !important;
}

#bottomleftcorner2 {
  bottom: 67px !important;
  padding-left: 5px !important;
}

#chatinput {
  bottom: 28px !important;
  left: 5px !important;
  border: 3px groove #949494 !important;
}

.vtopx,
.bshadow2 {
  padding: 0px !important;
  border-left: 2px groove #949494 !important;
  border-top: 2px groove #949494 !important;
  border-bottom: 0 !important;
}

.vtopx {
  border-top: 2px groove #949494 !important;
  border-bottom: 0 !important;
}

#bottommid .enableclicks .bshadow2 {
  border-bottom: 2px groove #949494 !important;
}

#bottommid .enableclicks > :last-child, #mpbar {
  border-right: 2px groove #949494 !important;
}

.tint {
  height: 20px !important;
  line-height: 20px !important;
  font-size: 20px !important;
}

#rightcornerui>div {
  border: 3px groove #949494 !important;
  background: url(https://i.stack.imgur.com/pMAiU.jpg) !important;
}

.salesui {
  left: 5px !important;
  bottom: 304px !important;
}

#features {
  left: 5px !important;
  bottom: 28px !important;
}

.xpsui {
  width: auto!important;
  margin-bottom: 0!important;
  border: 0!important;
  padding: 0 !important;
  border-top: 2px groove #949494 !important;
}

#xpui {
  width: 100%!important;
  height: 20px !important;
  line-height: 15px !important;
  font-size: 20px !important;
  color: #ffffff1f !important;
}

#bottommid {
  width: 100%!important;
  right: 0!important;
}

#xpslider {
  height: 20px !important;
}

#topui .largeborder, #features, .salesui, #gamelog, .menu .gamebutton,
#pagewrapped, .menu > :last-child, .newcharacter .gamebutton, .selectioninput,
.imodal, .imodal .gamebutton, #toprightcorner .gamebutton, #topleftcornerui .renderedinfo, #topleftcornerui .gamebutton, .modal .blockbutton, #bottomleftcorner > :first-child,
#theskills > :last-child, #bottomleftcorner2 > :first-child, #bottomleftcorner2 > :last-child, #skillbar > :first-child, #topleftcornerui .slimbutton, #codeui, .engagebutton, .dengagebutton {
  background: url(https://i.stack.imgur.com/pMAiU.jpg) !important;
  border: 3px groove #949494 !important;
}

.CodeMirror-gutters, .CodeMirror-scroll {
  background: url(https://i.stack.imgur.com/pMAiU.jpg) !important;
}

.CodeMirror-gutters .lspacer {
  background: none !important;
}

.renderedinfo > :last-child > div, #bottomleftcorner > :first-child > :nth-child(3), #merchant-item > :first-child, #recipe-item > :first-child {
  border: 0 !important;
}

.textbutton.chartype, .textbutton.gendertype, .friendslist, .renderedinfo > :last-child > div > div, #topleftcornerui > :last-child, #maincode, #topleftcornerui > :first-child, .inventory-item > :first-child, #skills-item > :first-child, #topleftcornerdialog > :first-child {
  border: 3px groove #949494 !important;
}

#bottomleftcorner [ondrop="on_drop(event)"], #bottomrightcorner [ondrop="on_drop(event)"], #theskills [ondrop="on_drop(event)"], #topleftcornerui [style^="position: relative; display:inline-block; margin: 2px;"] {
  border: 5px groove #949494 !important;
}

.noscroll::-webkit-scrollbar, .friendslist::-webkit-scrollbar {
  background: url(https://i.stack.imgur.com/pMAiU.jpg) !important;
}

::-webkit-scrollbar-thumb {
  background: rgba(200, 200, 200, 0.35) !important;
}

#theskills > :last-child > :first-child {
  padding: 4px !important;
  margin-left: 0 !important;
}

.friendslist {
  overflow: overlay !important;
}

#chatwparty:not(.ui-draggable), div[id^='chatwpm']:not(.ui-draggable) {
  bottom: 78px !important;
  left: 5px !important;
}

#chatwparty, div[id^='chatwpm'] {
  background: url(https://i.stack.imgur.com/pMAiU.jpg) !important;
  border: 3px groove #949494 !important;
}

#chatwparty input, div[id^='chatwpm'] input {
  border-top: 3px groove #949494 !important;
}

#chatwparty > :first-child, div[id^='chatwpm'] > :first-child {
  border-bottom: 3px groove #949494 !important;
}
`);
