const debugStream = new AsitDebugStream(undefined, "QUIZZA");
let currentQuizId = 0;
debugStream.log("initializing page..");
const buttons = [
    ["account", "top"],

    ["home", "side"],
    ["folderAdd", "side"],
    ["leaderbord", "side"],
    ["help", "side_bottom"],
    ["share", "bottom_left"],
    ["exit", "bottom_right"]
]
function createButtons() {
    debugStream.log("creating buttons..");
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
                if (pos === "side_bottom") button.classList.add("end");
                else if (pos === "bottom_right") button.classList.add("right");
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
    debugStream.log("<succes");
};

// function createQuiz() {
//     let quizModal = document.getElementById("createQuiz");
//     quizModal.style.display = "block";
// }

document.addEventListener("DOMContentLoaded", () => {
    debugStream.log("registered DOMLoad event.");

    createButtons();

    const quizButtons = document.querySelectorAll(".quizTile"); // Hier selecteer je alle knopjes, de quizzes dus.
    quizButtons.forEach(buttonQuizStart => { // Voor elke button voer je code uit
        buttonQuizStart.addEventListener("click", () => { // Als er op een knopje klikt word je gestuurd naar de php quiz pagina en wordt je quizid mee gegeven
            const quizId = buttonQuizStart.id.replace("question-", ""); // Hier haal je de quizid uit de id van de knop
            if (quizId === "create") {
                window.location.href = "createQuiz.php";
                return;
            };
            window.location.href = `quiz.php?quizid=${quizId}`;
        });
    });

    // exit button
    const exitButton = document.getElementById("exitIcon"); // Hier selecteer je de exit knop
    exitButton?.addEventListener("click", () => { // Als je op de exit knop klikt word je naar de index.php gestuurd
        window.location.href = "index.php";
    });

    const homeButton = document.getElementById("homeIcon"); // Hier selecteer je de home knop
    homeButton?.addEventListener("click", () => { // Als je op de home knop klikt word je naar de index.php gestuurd
        window.location.href = "index.php";
    });

    const accountButton = document.getElementById("shareIcon"); // Hier selecteer je de share knop
    accountButton?.addEventListener("click", () => { // Als je op de share knop klikt krijg je een pop-up met de link van de pagina
        const url = window.location.href;
        alert("De quiz link is gekopieerd naar je klembord!");
        navigator.clipboard.writeText(url);
    });
    debugStream.log("<succes");
});


function handleSearchInput(event) {
    const searchValue = event.target.value.trim().toLowerCase();
    const quizTiles = document.querySelectorAll('.quizTile');
    quizTiles.forEach(tile => {
        tile.style.display = tile.textContent.toLowerCase().includes(searchValue) ? 'flex' : 'none';
    });
    const subcontainers = document.querySelectorAll('.subcontainer');
    subcontainers.forEach(container => {
        const hasVisibleTile = Array.from(container.querySelectorAll('.quizTile'))
            .some(tile => tile.style.display === 'flex');
        container.style.display = hasVisibleTile ? 'flex' : 'none';
    });
}

