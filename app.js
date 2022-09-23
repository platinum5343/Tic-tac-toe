let gameActive = true;
let currentPlayer = "x";
let gameState = ["","","","","","","","","",];
const winningConditions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6], 
];
const statusDisplay = document.getElementById("status");

const winningMessage = function() {
    return currentPlayer + "'s Wins!";
}
const drawMessage = function() {
    return "Draw!";
}
const currentPlayerTurn = function(){
    return "It's " + currentPlayer + "'s turn";
}

document.querySelectorAll(".cell").forEach(function(cell) {
    cell.addEventListener("click", CellClick);
});
document.querySelector(",restart").addEventListener("click", RestartGame);

function CellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute("data-cell-index"));
    if(gameState[clickedCellIndex] !== "" || !gameActive) {
        return;
    }
    CellPlayed(clickedCell, clickedCellIndex);
    ResultValidiation();
}
function CellPlayed(clickedCell, clickedCellIndex) {
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
}

statusDisplay.innerHTML = currentPlayerTurn();

function playerChange() {
    if(currentPlayer === "x") {
        currentPlayer = "o";
    } else {
        currentPlayer = "x";
    }
    statusDisplay.innerHTML = currentPlayerTurn();
}

function ResultValidiation() {
    let roundWon = false;
    for(let i=0; i<=7; i++) {
        const winningCondition = winningConditions[i];
        let a = gameState[winningCondition[0]];
        let b = gameState[winningCondition[1]];
        let c = gameState[winningCondition[2]];
        if(a === "" || b === "" || c === ""){
            continue;
        }
        if(a === b && b === c) {
            roundWon = true;
            break;
        }
    }
    if(roundWon){
        statusDisplay.innerHTML = winningMessage();
        gameActive = false;
        return;
    }
    let roundDraw = !gameState.includes("");
    if(roundDraw){
        statusDisplay.innerHTML = drawMessage();
        gameActive = false;
        return;
    }
    playerChange();
}
function RestartGame() {
    let gameActive = true;
    let currentPlayer = "x";
    let gameState = ["","","","","","","","",""];
    statusDisplay.innerHTML = currentPlayerTurn();
    document.querySelectorAll(".cell").forEach(function(cell) {
        cell.innerHTML = "";
    })
}