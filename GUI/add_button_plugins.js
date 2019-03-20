// Change the JSON format if add new plugins.
// This script only works if it is executed by the "Code" inside the game.
// The plugins referenced by the URL are not my credits, however this script is.

parent.window.custom_plugins = {
    'gold_meter': {
        'name': '[Spadar] Gold Meter',
        'url': 'https://cdn.jsdelivr.net/gh/Spadar/AdventureLand@55a916ed389630702ae143247b9c919c23785c13/GUI/GoldMeter.js',
        'destroy': () => parent.$("#goldtimer").remove()
    },
    'code_cost_meter': {
        'name': '[Spadar] Code Cost Meter',
        'url': 'https://cdn.jsdelivr.net/gh/Spadar/AdventureLand@f8ce9f6b4d746927ba71f74e9efacfa87f5be0ad/GUI/CodeCostMeter.js',
        'destroy': () => parent.$("#ccmeter").remove()
    },
    'dps_meter': {
        'name': '[Spadar] DPS Meter',
        'url': 'https://cdn.jsdelivr.net/gh/Spadar/AdventureLand@55a916ed389630702ae143247b9c919c23785c13/GUI/DPSMeter.js',
        'destroy': () => parent.$("#dpsmeter").remove()
    },
    'estimated_time_until_level_up': {
        'name': '[JourneyOver] Estimated Time Until Level Up',
        'url': 'https://cdn.jsdelivr.net/gh/JourneyOver/Adventure_Land_Codes@d5f1eb3b8f03281c6aeb6af76ba1a9f8b1962ffb/Code%20Snippits/GUI%20Additions/Estimated%20Time%20Until%20Level%20Up%20GUI.js',
        'destroy': () => parent.$("#xptimer").remove()
    },
    'gamelog_filters': {
        'name': '[JourneyOver] Gamelog Filters',
        'url': 'https://cdn.jsdelivr.net/gh/JourneyOver/Adventure_Land_Codes@949c1c972da37e2aef0e438b02de1dd1a6ee3b43/Code%20Snippits/GUI%20Additions/Gamelog%20Filters.js',
        'destroy': () => parent.$("#gamelog-tab-bar").remove()
    }
};

// The code

on_destroy();
parent.$(".gamebutton:contains(CONF)").after(
    '<div id="gamebutton_plugins" style="margin-left: 5px;" class="gamebutton" onclick="btc(event); parent.window.showPlugins()">PLUGINS</div>'
);

parent.window.addPlugin = function addPlugin(plugin) {
    parent.btc(event);
    localStorage.setItem(`plugin_${plugin}`, '1');
    parent.$(`.off_${plugin}`).hide();
    parent.$(`.on_${plugin}`).show();
    parent.$(`<iframe frameborder="0" scrolling="no" id="plugin_${plugin}"></iframe>`).appendTo("body");
    parent.$(`#plugin_${plugin}`).contents().find("body").append(`<script type="text/javascript" src="${parent.window.custom_plugins[plugin].url}"></script>`);
}

parent.window.removePlugin = function removePlugin(plugin) {
    parent.btc(event);
    localStorage.setItem(`plugin_${plugin}`, '');
    parent.$(`.on_${plugin}`).hide();
    parent.$(`.off_${plugin}`).show();
    parent.$(`#plugin_${plugin}`).remove();
    parent.window.custom_plugins[plugin].destroy();
}

parent.window.initPlugins = function initPlugins() {
    Object.keys(parent.window.custom_plugins).forEach(plugin => {
        if (localStorage.getItem(`plugin_${plugin}`) == 1) {
            parent.window.addPlugin(plugin);
        }
    });
}

parent.window.showPlugins = function showPlugins() {
    parent.show_modal(
        `<div class="basicsettings">
            ${Object.keys(parent.window.custom_plugins).map(plugin => 
	            `<div class="mt4 blockbutton on_${plugin} hidden" onclick='parent.window.removePlugin("${plugin}")'>
	            	${parent.window.custom_plugins[plugin].name}: <span style="color: green">ON</span>
	         	</div>
	         	<div class="mt4 blockbutton off_${plugin}" onclick='parent.window.addPlugin("${plugin}")'>
	            	${parent.window.custom_plugins[plugin].name}: <span style="color: #F54423">OFF</span>
	         	</div>`
        	).join('')}
	    </div>
	    <div class="mt4 blockbutton" style="text-align: left">
			Note: Scripts are credit from their developers, verify Github <a href="https://github.com/Spadar/AdventureLand" target="_blank">Spadar</a>, <a href="https://github.com/JourneyOver/Adventure_Land_Codes" target="_blank">JourneyOver</a> and <a href="https://github.com/LVCarnevalli/adventureland" target="_blank">I am</a>.
		</div>`, {
            wrap: false,
            styles: "width:600px"
        });

    Object.keys(parent.window.custom_plugins).forEach(plugin => {
        if (localStorage.getItem(`plugin_${plugin}`) == 1) {
            parent.$(`.off_${plugin}`).hide();
            parent.$(`.on_${plugin}`).show();
        } else {
            parent.$(`.on_${plugin}`).hide();
            parent.$(`.off_.${plugin}`).show();
        }
    });
}

parent.initPlugins();

function on_destroy() {
    Object.keys(parent.window.custom_plugins).forEach(plugin => {
        if (localStorage.getItem(`plugin_${plugin}`) == 1) {
            parent.$(`#plugin_${plugin}`).remove();
            parent.window.custom_plugins[plugin].destroy();
        }
    });
    parent.$(".gamebutton:contains(PLUGINS)").remove();
}