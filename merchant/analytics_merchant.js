parent.window.preview_render_item = function(json) {
    const item = JSON.parse(json);
    if (item.type == "secondhands") {
        parent.render_item("#topleftcornerdialog", {
            id: "sh" + item.slot_name,
            item: G.items[item.name],
            name: item.name,
            actual: item.slot_actual,
            secondhand: true
        });
    } else {
        parent.render_item("#topleftcornerdialog", {
            id: "item" + item.slot_name,
            item: G.items[item.name],
            name: item.name,
            actual: item.slot_actual,
            slot: item.slot_name,
            from_player: item.from_player
        });
    }
}

parent.window.close_analytics_merchant = function() {
    parent.$("#analytics_merchant").remove();
    parent.$("#topleftcornerdialog .buyitem").remove();
    parent.stop_runner();
}

function sprite(id, type) { // type is top or left
    const position = G.positions[id];
    if (position && position.length == 3 && position[0] == "pack_20") {
        return G.positions[id][type == "left" ? 1 : 2] * 40;
    }
    return 0;
}

function calculatePrice(slot_actual) {
    var adjust = 2;
    if (G.items[slot_actual.name].cash) {
        adjust = 3;
    }
    return parent.calculate_item_value(slot_actual) * adjust * (slot_actual.q || 1);
}

function init(secondhands) {
    const merchantItems = Object.values(parent.entities)
        .filter(char => char.ctype == "merchant")
        .flatMap(char => Object.keys(char.slots)
            .filter(slotName => slotName.includes("trade") && char.slots[slotName] && !char.slots[slotName].b)
            .map(slotName => {
                const slot = char.slots[slotName];
                return {
                    type: "merchant",
                    name: slot.name,
                    price: slot.price,
                    sell: slot.b, // variable .b controll buy or sell
                    level: slot.level,
                    slot_actual: slot,
                    slot_name: slotName,
                    from_player: char.id
                };
            }));

    const secondhandsItems = secondhands.map((slot, index) => {
        return {
            type: "secondhands",
            name: slot.name,
            price: calculatePrice(slot),
            level: slot.level,
            slot_actual: slot,
            slot_name: index
        };
    });

    const items = merchantItems.concat(secondhandsItems);

    items.sort(function(a, b) {
        // sorte by name
        if (a.name > b.name) {
            return 1;
        } else if (a.name < b.name) {
            return -1;
        } else {
            // sort by level
            if (a.level > b.level) {
                return 1;
            } else if (a.level < b.level) {
                return -1;
            } else {
                // sort by price
                if (a.price > b.price) {
                    return 1;
                } else if (a.price < b.price) {
                    return -1;
                }
            }
        }
        return 0;
    });

    parent.$("body").append(`
		<div id="analytics_merchant" style="background-color: black; border: 5px solid gray; padding: 20px; font-size: 24px; overflow: auto; height: 600px; width: 1072px; margin-left: 400px; position: fixed; z-index: 99;">
			<div style="overflow: hidden; height: 40px; width: 40px;">
				<img style="width: 640px; height: 440px; margin-top: -240px; margin-left: -520px;" src="/images/tiles/items/skills_20v3.png?v=5" draggable="false" class="clickable" onclick="parent.window.close_analytics_merchant()">
			</div>
			<div>
				${
					items.map(item => `
						<div data-slot="analytics_merchant_${item.name}" style="position: relative; display: inline-block; margin: 2px; border: 2px solid gray; background: black; width: 250px;" onclick='parent.window.preview_render_item(${JSON.stringify(JSON.stringify(item))})' class="clickable">
							<div style="display: table;">
								<div style="display: table-cell; background: black; overflow: hidden; position: absolute; bottom: 0;">
									<div style="height: 40px; width: 40px;">
										<img style="width: 640px; height: 2160px; margin-top: -${sprite(item.name, 'top')}px; margin-left: -${sprite(item.name, 'left')}px;" src="/images/tiles/items/pack_20.png?v=39" draggable="false">
									</div>
									${item.level && item.level > 0 ? `<div class="iuui clevel${item.level}" style="border-color: gray">${item.level}</div>` : ''}
								</div>
								<div style="display: table-cell; padding-left: 50px;">
									<span class="cbold" style="color: gray">Name:</span> <span style="font-size: 18px">${G.items[item.name].name}</span>
									<br/>
									<span class="cbold" style="color: gray;">Id:</span> <span style="font-size: 18px">${item.name}</span>
									<br/>
									${item.type == "merchant" ? "" : "NPC"} <span style="color: gold">${(item.price).toLocaleString('en')} GOLD</span>
								</div>
							</div>
						</div>				
					`).join('')
				}
			</div>
		</div>
	`);
}

let secondhands = false;
parent.socket.on("secondhands", function(data) {
    if (!secondhands) {
        secondhands = true;
        init(data);
        parent.$("#secondhand0").parent().parent().parent().remove();
    }
});
parent.socket.emit("secondhands");