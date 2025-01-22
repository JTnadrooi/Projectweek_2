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

    const quizButtons = document.querySelectorAll(".quizTile"); 
    quizButtons.forEach(buttonQuizStart => {
        buttonQuizStart.addEventListener("click", () => {
            const quizId = buttonQuizStart.id.replace("question-", "");
            if (quizId === "create") {
                window.location.href = "createQuiz.php";
                return;
            }
            window.location.href = `quiz.php?quizid=${quizId}`;
        });
    });

    const exitButton = document.getElementById("exitIcon"); 
    exitButton?.addEventListener("click", () => {
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

    const homeButton = document.getElementById("homeIcon");
    homeButton?.addEventListener("click", () => {
        window.location.href = "index.php";
    });

    const shareButton = document.getElementById("shareIcon");
    shareButton?.addEventListener("click", () => {
        const url = window.location.href;
        alert("De quiz link is gekopieerd naar je klembord!");
        navigator.clipboard.writeText(url);
    });

    const leaderboardButton = document.getElementById("leaderbordIcon");
    if (leaderboardButton) {
        debugStream.log("Leaderboard button found.");
        leaderboardButton.addEventListener("click", () => {
            debugStream.log("Leaderboard button clicked.");
            window.location.href = "leaderboard.php";
        });
    } else {
        debugStream.log("Leaderboard button not found.");
    }

    const logoutButton = document.getElementById('logoutButton');
    logoutButton?.addEventListener('click', () => {
        window.location.href = "php/logout.php";
    });

    debugStream.log("<success");
});
