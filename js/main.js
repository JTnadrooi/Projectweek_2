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
    ["help", "bottom_right"],
    ["exit", "bottom_left"]
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

function handleSearchInput(event) {
    const searchValue = event.target.value.toLowerCase();
    // console.log(`Search input changed: ${searchValue}`);
    const quizTiles = document.querySelectorAll('.quizTile');
    const quizTileContainers = document.querySelectorAll('.homeTitleContainer');
    quizTiles.forEach(item => {
        if (searchValue === '' || item.textContent.toLowerCase().includes(searchValue)) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });
    quizTileContainers.forEach(container => {
        // Check if the container has any visible quizTile
        const hasVisibleTile = Array.from(container.querySelectorAll('.quizTile')).some(
            tile => tile.style.display === 'flex'
        );

        if (hasVisibleTile) {
            container.style.display = 'flex'; // Show the container
        } else {
            container.style.display = 'none'; // Hide the container
        }
    });
}



function handleSearchInput(event) {
    const searchValue = event.target.value.toLowerCase(); // Convert to lowercase for case-insensitive search
    debugStream.log(`search input changed: ${searchValue}`);

    // Select all elements with the "quizTile" class
    const quizTiles = document.querySelectorAll('.quizTile');

    // Filter quizTiles based on search input
    quizTiles.forEach(item => {
        if (searchValue === '' || item.textContent.toLowerCase().includes(searchValue)) {
            item.style.display = 'flex'; // Show matching quizTile
        } else {
            item.style.display = 'none'; // Hide non-matching quizTile
        }
    });

    // Select all subcontainer elements and update visibility based on their children
    const subcontainers = document.querySelectorAll('.subcontainer');

    subcontainers.forEach(container => {
        // Check if the container has any visible quizTile
        const hasVisibleTile = Array.from(container.querySelectorAll('.quizTile')).some(
            tile => tile.style.display === 'flex'
        );

        if (hasVisibleTile) {
            container.style.display = 'flex'; // Show the subcontainer
        } else {
            container.style.display = 'none'; // Hide the subcontainer
        }
    });
}

