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
];

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
    debugStream.log("<success");
};

document.addEventListener("DOMContentLoaded", () => {
    debugStream.log("registered DOMLoad event.");

    createButtons();

    const quizButtons = document.querySelectorAll(".quizTile"); // Here you select all buttons, the quizzes.
    quizButtons.forEach(buttonQuizStart => { // For each button, execute code
        buttonQuizStart.addEventListener("click", () => { // When you click on a button, you are directed to the PHP quiz page and the quiz ID is passed
            const quizId = buttonQuizStart.id.replace("question-", ""); // Here you extract the quiz ID from the button's ID
            window.location.href = `quiz.php?quizid=${quizId}`;
        });
    });

    // exit button
    const exitButton = document.getElementById("exitIcon"); // Here you select the exit button
    exitButton?.addEventListener("click", () => { // When you click on the exit button, you are directed to index.php
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
    if (accountIcon && accountContainer) {
        accountIcon.addEventListener('mouseenter', showContainer);
        accountIcon.addEventListener('mouseleave', hideContainer);
        accountContainer.addEventListener('mouseenter', showContainer);
        accountContainer.addEventListener('mouseleave', hideContainer);
        
        document.getElementById('accountIcon').addEventListener('click', () => {
            const accountContainer = document.getElementById('accountContainer');
            accountContainer.classList.add('shake');
            setTimeout(() => accountContainer.classList.remove('shake'), 500);
        });
    }

    // home button
    const homeButton = document.getElementById("homeIcon"); 
    if (homeButton) {
        debugStream.log("Home button found.");
        homeButton.addEventListener("click", () => { // When you click on the home button, you are directed to index.php
            debugStream.log("Home button clicked.");
            window.location.href = "index.php";
        });
    } else {
        debugStream.log("Home button not found.");
    }

    const leaderboardButton = document.getElementById("leaderbordIcon"); 
    if (leaderboardButton) {
        debugStream.log("Leaderboard button found.");
        leaderboardButton.addEventListener("click", () => { // When you click on the leaderboard button, you are directed to leaderboard.php
            debugStream.log("Leaderboard button clicked.");
            window.location.href = "leaderboard.php";
        });
    } else {
        debugStream.log("Leaderboard button not found.");
    }

    debugStream.log("<success");
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

function modalFeedback() {
    const modalFeedback = document.querySelector('#modalFeedback');
    const container = document.querySelector('.modal');

    let feedback = 'NO PASSWORD GIVEN';
    let succes = false;

    modalFeedback.innerHTML = feedback;
    container.classList.add('shake');
    modalFeedback.style.color = succes ? 'yellowgreen' : 'red';
    setTimeout(() => container.classList.remove('shake'), 500);
}

function handleLogin() {
    modalFeedback();
}

function handleRegister() {
    modalFeedback();
}
