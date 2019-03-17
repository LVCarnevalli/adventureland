// ==UserScript==
// @name         Adventure Land Clean Template
// @version      0.1
// @author       https://github.com/LVCarnevalli/adventureland
// @match        https://adventure.land/*
// @grant        GM_addStyle
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
#bottomleftcorner2,
#bottomleftcorner,
#theskills,
#topui,
.menu {
	padding: 5px !important;
}

#theskills {
	bottom: 15px !important;
}

#bottomleftcorner {
	bottom: 15px !important;
}

#bottomrightcorner {
	bottom: 15px !important;
	opacity: 0.7 !important;
	padding-right: 5px !important;
}

#bottomleftcorner2 {
	bottom: 15px !important;
	opacity: 0.7 !important;
}

#chatinput {
	bottom: 25px !important;
	left: 10px !important;
	opacity: 0.7 !important;
}

#toprightcorner .gamebutton,
#topleftcornerui .gamebutton {
	line-height: 10px !important;
	font-size: 20px !important;
}

.vtopx,
.bshadow2 {
	border: 0 !important;
	padding: 1px !important;
}

.tint {
	height: 20px !important;
	line-height: 20px !important;
	font-size: 20px !important;
}

#rightcornerui>div {
	border: 0px !important;
}

.salesui {
	left: 5px !important;
	bottom: 291px !important;
}

#features {
	left: 5px !important;
	bottom: 15px !important;
}

.xpsui {
	width: auto!important;
	margin-bottom: 0!important;
	border: 0!important;
	padding: 2px 0 0 0 !important;
}

#xpui {
	width: 100%!important;
	height: 7px !important;
	line-height: 7px !important;
	font-size: 0 !important;
}

#bottommid {
	width: 100%!important;
	right: 0!important
}

#xpslider {
	height: 7px !important;
}
`);
