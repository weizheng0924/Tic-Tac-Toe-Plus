// This file contains the logic for the Tic-Tac-Toe game, handling player input, checking win conditions, and updating game state.

const cells = document.querySelectorAll('.cell');
const statusDisplay = document.querySelector('.status');
let currentPlayer = 'X';
let gameActive = true;
let gameState = ["", "", "", "", "", "", "", "", ""];
let playerMoves = { 'X': [], 'O': [] };

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleCellClick(clickedCell, clickedCellIndex) {
    if (gameState[clickedCellIndex] !== "" || !gameActive) {
        return;
    }

    // 新增：記錄玩家下的位置
    playerMoves[currentPlayer].push(clickedCellIndex);
    // 如果超過3子，移除最早的那一子
    if (playerMoves[currentPlayer].length > 3) {
        const removeIndex = playerMoves[currentPlayer].shift();
        gameState[removeIndex] = "";
        cells[removeIndex].textContent = "";
    }

    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;
    checkResult();
}

function highlightWinningCells(indices) {
    indices.forEach(idx => {
        cells[idx].classList.add('win-animate');
    });
}

function clearWinningHighlight() {
    cells.forEach(cell => cell.classList.remove('win-animate'));
}

function boardFadeOutIn(callback) {
    const board = document.querySelector('.board');
    board.classList.add('fade-out');
    setTimeout(() => {
        callback();
        board.classList.remove('fade-out');
        board.classList.add('fade-in');
        setTimeout(() => {
            board.classList.remove('fade-in');
        }, 350);
    }, 350);
}

function checkResult() {
    let roundWon = false;
    let winIndices = [];
    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (gameState[a] === "" || gameState[b] === "" || gameState[c] === "") {
            continue;
        }
        if (gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            roundWon = true;
            winIndices = [a, b, c];
            break;
        }
    }

    if (roundWon) {
        statusDisplay.textContent = `Player ${currentPlayer} has won!`;
        gameActive = false;
        highlightWinningCells(winIndices);
        return;
    }

    if (!gameState.includes("")) {
        statusDisplay.textContent = "It's a draw!";
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay.textContent = `It's ${currentPlayer}'s turn`;
}

function restartGame() {
    boardFadeOutIn(() => {
        gameActive = true;
        currentPlayer = "X";
        gameState = ["", "", "", "", "", "", "", "", ""];
        playerMoves = { 'X': [], 'O': [] };
        statusDisplay.textContent = `It's ${currentPlayer}'s turn`;
        cells.forEach(cell => cell.textContent = "");
        clearWinningHighlight();
    });
}

cells.forEach((cell, index) => {
    cell.addEventListener('click', () => handleCellClick(cell, index));
});

document.querySelector('#restart').addEventListener('click', restartGame);