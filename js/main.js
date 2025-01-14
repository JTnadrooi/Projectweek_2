const debugStream = new AsitDebugStream(undefined, "QUIZZA");

debugStream.log("initializing page..");
debugStream.log("creating buttons..");
const buttons = [
    ["share", "top"],
    ["account", "top"],

    ["home", "side"],
    ["leaderbord", "side"],
    ["help", "side_bottom"],
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
                side_bottom: "sideIconContainer"
            };
            return document.getElementById(containers[position]) || null;
        }
        button.style.background = 'url("../media/icons/' + buttonName + '.png") no-repeat center var(--c1)';
        button.style.backgroundSize = buttonName == "account" ? "60%" : "80%";

        const container = getContainer(position);
        container?.appendChild(button);
        if (position == "side_bottom") button.classList.add("iconEnd");
    });
};

function limitTextLength(event) {
    const maxLength = 32;
    const currentText = event.target.innerText;

    if (currentText.length > maxLength) {
        event.target.innerText = currentText.substring(0, maxLength);
    }
}


document.addEventListener("DOMContentLoaded", createButtons);