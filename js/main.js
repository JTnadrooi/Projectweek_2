const debugStream = new AsitDebugStream(undefined, "QUIZZA");
let currentQuizId = 0;
debugStream.log("initializing page..");
const buttons = [
    ["share", "top"],
    ["account", "top"],

    ["home", "side"],
    ["folderAdd", "side"],
    ["leaderbord", "side"],
    ["help", "side_bottom"],
    ["help", "bottom_left"],
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

document.addEventListener("DOMContentLoaded", () => {
    debugStream.log("registered DOMLoad event.");

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
    exitButton?.addEventListener("click", () => { // Als je op de exit knop klikt word je naar de index.php gestuurd
        window.location.href = "index.php";
    });

    const accountIcon = document.getElementById('accountIcon');
    const accountContainer = document.getElementById('accountContainer');
    const showContainer = () => {
        accountContainer.classList.add('show');
    };
    const hideContainer = () => {
        accountContainer.classList.remove('show');
    };
    accountIcon.addEventListener('mouseenter', showContainer);
    accountIcon.addEventListener('mouseleave', hideContainer);
    accountContainer.addEventListener('mouseenter', showContainer);
    accountContainer.addEventListener('mouseleave', hideContainer);

    document.getElementById('accountIcon').addEventListener('click', () => {
        const accountContainer = document.getElementById('accountContainer');
        accountContainer.classList.add('shake');
        setTimeout(() => accountContainer.classList.remove('shake'), 500);
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

