const debugStream = new AsitDebugStream(undefined, "QUIZZA");

debugStream.log("initializing page..");
debugStream.log("creating buttons..");
const buttons = [
    ["share", "top"],
    ["account", "top"],

    ["home", "side"],
    ["folderAdd", "side"],
    ["leaderbord", "side"],
    ["help", "side_bottom"],
    ["help", "bottom_left"],
    ["help", "bottom_right"],
]

function createButtons() {
    buttons.forEach(([buttonName, position]) => {
        const button = document.createElement("button");
        button.classList.add("icon");
        button.id = buttonName + "Icon";

        function getContainer(position) {
            const containers = {
                top: "iconsContainer",
                side: "sideIconContainer",
                side_bottom: "sideIconContainer",
                bottom_left: "bottomIconContainer",
                bottom_right: "bottomIconContainer",
            };
            return document.getElementById(containers[position]) || null;
        }
        button.style.background = 'url("../media/icons/' + buttonName + '.png") no-repeat center var(--c1)';
        button.style.backgroundSize = buttonName == "account" ? "60%" : "80%";

        const container = getContainer(position);
        container?.appendChild(button);
        debugStream.log("processed: " + button);
        if (position == "side_bottom") button.classList.add("iconEnd");
        if (position == "bottom_right") button.classList.add("iconEnd");
    });
};
debugStream.log("<succes");
debugStream.log("<succes");

document.addEventListener("DOMContentLoaded", createButtons);