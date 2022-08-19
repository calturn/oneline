// Global variable defaults
const gameContainer = document.getElementById("game");
// the following variables will later be stored in a default game settings object
let numberOfPlayers = 1;
let playerNames = [];
let maxTurns;
let turnsPerPlayer = 3;
let turnNumber;
let story = [];


// Page content

const mainMenu = 
/* html */ `
    <h1 class="main-title">🖊 one line at a time</h1>
    <h2 class="info-title">How to play</h2>
    <p class="info-text">This is a silly group writing game where you tell a story together, one sentence at a time, without being able to see what the other players wrote before you. When everyone has finished all of their turns, the whole story is revealed in all it's nonsensical glory.</p>
    <h2 class="info-title">Setup</h2>
    <form action="" class="game-settings">
        <label for="numberOfPlayers" class="game-settings__label">How many players?</label>
        <input type="number" value="1" min="1" max="10" class="game-settings__input" id="numberOfPlayers" name="numberOfPlayers">
        <div class="game-settings__players" id="playerRegister">
        <label for="player1Name">Player 1 name:</label>
        <input name="player1Name" type="text" placeholder="type here..." class="player-input game-settings__input"></input>
        </div>
        <label for="numberOfTurns" class="game-settings__label">How many turns per player?</label>
        <input type="number" value="3" min="1" max="10"; class="game-settings__input" id="numberOfTurns" name="numberOfTurns">
        <button type="submit" class="game-settings__submit" id="startGame">Start game</button>
    </form>
`;

const mainGame = (allPlayerNames, totalTurns, turnNumber, currentPlayerTurn, currentPlayerName) => {
    return /* html */ `
            <h2 class="info-title"> it's ${currentPlayerName}'s turn to write!</h2>
            <form class="writing-field">
                <label for="textArea" class="writing-field__label"> Continue the story below...</label>
                <textarea id="textArea" name="textArea" class="writing-field__text-area"></textarea>
                <button id="submitTextBtn" type="submit" class="writing-field__submit">Done</button>
            </form>
    `;
}

const storyReveal = (story) => {
    return /* html */ `
        <h2 class="info-title">The whole story</h2>
        <p class="story-text">${story}</p>
        <button id="startOverBtn" type="button" class="restart-button">Start over</button>
        <button id="saveStoryBtn" type="button" class="save-button">Download story</button>
    `;
}

// Game states

const renderPage = (data) => {
    // Render HTML to page
    gameContainer.innerHTML = data;
}

const saveStoryToFile = (content, filename, contentType) => {
    const a = document.createElement("a");
    const file = new Blob([content], {type: contentType});

    a.href = URL.createObjectURL(file);
    a.download = filename;
    a.click();

    URL.revokeObjectURL(a.href);
}

const displayStory = () => {
    let fullStory = story.join(" ");
    renderPage(storyReveal(fullStory));
    document.getElementById("startOverBtn").addEventListener("click", startOver);
    document.getElementById("saveStoryBtn").addEventListener("click", () => {
        saveStoryToFile(fullStory, "one-line-story.txt", "text/plain")
    });
}

const addToStory = (text) => {
    let newEntry = [text];
    // Check for punctuation at end of submission; add "." if absent
    for (let i = 0; i < newEntry[0].length; i++) {
        if (i === (newEntry[0].length - 1)) {
            console.log(`scanning for punctuation at the end of the submission (index ${i}), which is the character "${newEntry[0][i]}".`);
            switch (newEntry[0][i]) {
                case "." :
                    break;
                case "!" :
                    break;
                case "?" :
                    break;
                default :
                    console.log(`No punctuation detected at the end of submitted entry. Added a "." at index ${i + 1}.`);
                    newEntry.push(".");
                    break;
            }
        }
    }
    story.push(newEntry.join(""));
}

const runGame = (playerNames, numberOfPlayers, turnsPerPlayer) => {

    // Inital game variable setup
    story = [];
    let allPlayerNames = playerNames;
    let totalTurns = numberOfPlayers * turnsPerPlayer;
    let initialTurn = 0;
    let currentPlayerTurn = -1;
    let currentPlayerName = allPlayerNames[0];

    // Text submit button
    function getSubmitBtn (turnNumber) {
        let submitTextBtn = document.getElementById("submitTextBtn");
        submitTextBtn.addEventListener("click", (event) => {
            event.preventDefault();
            addToStory(document.getElementById("textArea").value);
            console.log(`New entry added. Story so far: ${story.join(" ")}`);
            let turnIsNow = turnNumber + 1; // Increase the turn counter
            nextTurn(turnIsNow);
        });
    }

    // Player turn
    function nextTurn(turnNumber) {
        if (turnNumber < totalTurns) {
            currentPlayerTurn += 1;
            // Check if all players have had their turn, and if so begin a new round
            if (currentPlayerTurn === allPlayerNames.length) {
                currentPlayerTurn = 0;
            }
            // Set the player name to the current player index
            currentPlayerName = allPlayerNames[currentPlayerTurn];
            console.log(`Current player is ${currentPlayerName}. It's turn number ${turnNumber} out of ${totalTurns}.`);
            // Render html elements
            renderPage(mainGame(allPlayerNames, totalTurns, turnNumber, currentPlayerTurn, currentPlayerName));
            getSubmitBtn(turnNumber);

        } else {
            displayStory();
        }
    }

    nextTurn(initialTurn);
};

const startOver = () => {
    renderPage(mainMenu);
    const startGameBtn = document.getElementById("startGame");
    const playerNumberInput = document.getElementById("numberOfPlayers");
    const playerTurnsInput = document.getElementById("numberOfTurns");
    const playerRegister = document.getElementById("playerRegister");

    // Listen for and get changes to number of players setting
    playerNumberInput.addEventListener("change", () => {
        numberOfPlayers = playerNumberInput.value;
        playerRegister.innerHTML = "";

        // Render input fields based on number of players
        // ! BUG: Currently wipes input fields when changed. There needs to be a way to save field data if entered.
        // Possible fix is using "append child" inputs instead
        for (let count = 0; numberOfPlayers > count; count++) {
            let playerID = count + 1; 
            playerRegister.innerHTML += `
            <label for="player${playerID}Name">Player ${playerID} name:</label>
            <input name="player${playerID}Name" type="text" placeholder="type here..." class="player-input game-settings__input"></input>
            `;
        }
    });

    // Listen for and get changes to player turns setting
    playerTurnsInput.addEventListener("change", () => {
        turnsPerPlayer = playerTurnsInput.value;
    })

    const checkSettingsValidity = (event) => {
        event.preventDefault();
        console.log(numberOfPlayers, turnsPerPlayer);

        // Get player names entered from the DOM
        let playerNamesList = document.querySelectorAll(".player-input");
        console.log(playerNamesList);
        for (let index = 0; index < playerNamesList.length; index++) {
            playerNames.push(playerNamesList[index].value);
        }
        console.log(playerNames);

        // Check for valid game settings before running game
        if (!numberOfPlayers || !turnsPerPlayer) {
            alert("please enter valid game settings")
        } else {
            console.log(`starting game with ${numberOfPlayers} players. Each player will have ${turnsPerPlayer} turns.`);
            console.log("Player names are:")
            for (let i = 0; i < playerNames.length; i++) {
                console.log(playerNames[i]);
            }
            runGame(playerNames, numberOfPlayers, turnsPerPlayer);
        }
    }

    startGameBtn.addEventListener("click", checkSettingsValidity);
}


// Default state

startOver();