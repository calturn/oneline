// Global variable defaults
const gameContainer = document.getElementById("game");
let numberOfPlayers = 1;
let playerNames = [];
let maxTurns;
let turnsPerPlayer = 3;
let turnNumber;


// Page content

const mainMenu = `
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


// Game states

const renderPage = (data) => {
    gameContainer.innerHTML = data;
}

const runGame = () => {

}

const startOver = () => {
    renderPage(mainMenu);
    const startGameBtn = document.getElementById("startGame");
    const playerNumberInput = document.getElementById("numberOfPlayers");
    const playerTurnsInput = document.getElementById("numberOfTurns");
    const playerRegister = document.getElementById("playerRegister");

    playerNumberInput.addEventListener("change", () => {
        numberOfPlayers = playerNumberInput.value;
        playerRegister.innerHTML = "";

        for (let count = 0; numberOfPlayers > count; count++) {
            let playerID = count + 1; 
            playerRegister.innerHTML += `
            <label for="player${playerID}Name">Player ${playerID} name:</label>
            <input name="player${playerID}Name" type="text" placeholder="type here..." class="player-input game-settings__input"></input>
            `;
        }
    });

    playerTurnsInput.addEventListener("change", () => {
        turnsPerPlayer = playerTurnsInput.value;
    })

    const checkSettingsValidity = (event) => {
        event.preventDefault();
        console.log(numberOfPlayers, turnsPerPlayer);

        let playerNamesList = document.querySelectorAll(".player-input");
        console.log(playerNamesList);
        for (let index = 0; index < playerNamesList.length; index++) {
            playerNames.push(playerNamesList[index].value);
        }
        console.log(playerNames);

        if (!numberOfPlayers || !turnsPerPlayer) {
            alert("please enter valid game settings")
        } else {
            console.log(`starting game with ${numberOfPlayers} players. Each player will have ${turnsPerPlayer} turns.`);
            console.log("Player names are:")
            for (let i = 0; i < playerNames.length; i++) {
                console.log(playerNames[i]);
            }
        }
    }

    startGameBtn.addEventListener("click", checkSettingsValidity);
}


// Default state

startOver();