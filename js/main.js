const debugStream = new AsitDebugStream(undefined, "QUIZZA");
let currentQuizId = 0;
debugStream.log("initializing page..");
debugStream.log("creating buttons..");
const buttons = [
    ["share", "top"],
    ["account", "top"],

    ["home", "side"],
    ["folderAdd", "side"],
    ["leaderbord", "side"],
    ["help", "side_bottom"],
    ["help", "bottom_right"],
    ["exit", "bottom_left"]
]
function createButtons() {
    buttons.forEach(([buttonName, position]) => {
        function getContainer(pos) {
            const containers = {
                top: "iconsContainer",
                side: "sideIconContainer",
                side_bottom: "sideIconContainer",
                bottom_left: "bottomIconContainer",
                bottom_right: "bottomIconContainer",
            };
            return document.getElementById(containers[pos]) || null;
        }

        function appendButtonToContainer(pos, btn) {
            const container = getContainer(pos);
            if (container) {
                const button = btn.cloneNode(true);
                container.appendChild(button);
                debugStream.log("processed: " + button);
                if (pos === "side_bottom") button.classList.add("iconEnd");
                else if (pos === "bottom_right") button.classList.add("iconRight");
            }
        }

        const baseButton = document.createElement("button");
        baseButton.classList.add("icon");
        baseButton.id = buttonName + "Icon";
        baseButton.style.background = 'url("media/icons/' + buttonName + '.png") no-repeat center var(--c1)';
        baseButton.style.backgroundSize = buttonName === "account" ? "60%" : "80%";

        if (Array.isArray(position)) position.forEach(pos => appendButtonToContainer(pos, baseButton));
        else appendButtonToContainer(position, baseButton);
    });
};

debugStream.log("<succes");
debugStream.log("<succes");

document.addEventListener("DOMContentLoaded", () => {
    createButtons();

    const quizButtons = document.querySelectorAll(".quizTile"); // Hier selecteer je alle knopjes, de quizzes dus.
    quizButtons.forEach(buttonQuizStart => { // Voor elke button voer je code uit
        buttonQuizStart.addEventListener("click", () => { // Als er op een knopje klikt word je gestuurd naar de php quiz pagina en wordt je quizid mee gegeven
            const quizId = buttonQuizStart.id.replace("question-", ""); // Hier haal je de quizid uit de id van de knop
            window.location.href = `quiz.php?quizid=${quizId}`;
        });
    });

    // exit button
    const exitButton = document.getElementById("exitIcon"); // Hier selecteer je de exit knop
    exitButton.addEventListener("click", () => { // Als je op de exit knop klikt word je naar de index.html gestuurd
        window.location.href = "index.html";
    });
});

    