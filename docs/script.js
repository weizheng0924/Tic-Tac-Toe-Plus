// This file contains the logic for the Tic-Tac-Toe game, handling player input, checking win conditions, and updating game state.

const cells = document.querySelectorAll('.cell');
const statusDisplay = document.querySelector('.status');
const modeSelect = document.getElementById('mode');
const botSideSelect = document.getElementById('bot-side-select');
const playerSideSelect = document.getElementById('player-side');

let currentPlayer = 'X';
let gameActive = true;
let gameState = ["", "", "", "", "", "", "", "", ""];
let playerMoves = { 'X': [], 'O': [] };
let mode = 'pvp'; // 'pvp' or 'bot'
let playerSide = 'X'; // 'X' or 'O'
let botSide = 'O';

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

modeSelect.addEventListener('change', (e) => {
    mode = e.target.value;
    if (mode === 'bot') {
        botSideSelect.style.display = '';
        playerSide = playerSideSelect.value;
        botSide = playerSide === 'X' ? 'O' : 'X';
        restartGame();
    } else {
        botSideSelect.style.display = 'none';
        restartGame();
    }
});

playerSideSelect.addEventListener('change', (e) => {
    playerSide = e.target.value;
    botSide = playerSide === 'X' ? 'O' : 'X';
    restartGame();
});

function botMove() {
    if (!gameActive) return;
    // 1. 嘗試直接獲勝
    let move = findBestMove(botSide);
    if (move !== null) {
        handleCellClick(cells[move], move);
        return;
    }
    // 2. 阻擋玩家獲勝
    move = findBestMove(playerSide);
    if (move !== null) {
        handleCellClick(cells[move], move);
        return;
    }
    // 3. 佔據中心
    if (gameState[4] === '') {
        handleCellClick(cells[4], 4);
        return;
    }
    // 4. 佔據角落
    const corners = [0,2,6,8];
    for (let idx of corners) {
        if (gameState[idx] === '') {
            handleCellClick(cells[idx], idx);
            return;
        }
    }
    // 5. 其他空格
    const empty = gameState.map((v, i) => v === '' ? i : null).filter(i => i !== null);
    if (empty.length > 0) {
        handleCellClick(cells[empty[0]], empty[0]);
    }
}

// 檢查 side 是否有機會三連線，若有回傳可下的位置
function findBestMove(side) {
    for (const cond of winningConditions) {
        const marks = cond.map(idx => gameState[idx]);
        const count = marks.filter(m => m === side).length;
        const emptyIdx = cond.find(idx => gameState[idx] === '');
        if (count === 2 && emptyIdx !== undefined &&
            cond.filter(idx => gameState[idx] === '').length === 1) {
            return emptyIdx;
        }
    }
    return null;
}

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
    // BOT模式下換 BOT
    if (mode === 'bot' && gameActive && currentPlayer === botSide) {
        setTimeout(botMove, 400);
    }
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
        currentPlayer = 'X';
        gameState = ["", "", "", "", "", "", "", "", ""];
        playerMoves = { 'X': [], 'O': [] };
        statusDisplay.textContent = mode === 'bot'
            ? (playerSide === 'X' ? '你（X）先手' : 'BOT（X）先手')
            : `It's ${currentPlayer}'s turn`;
        cells.forEach(cell => cell.textContent = "");
        clearWinningHighlight();
        // BOT先手
        if (mode === 'bot' && playerSide === 'O') {
            setTimeout(botMove, 500);
        }
    });
}

cells.forEach((cell, index) => {
    cell.onclick = () => {
        if (mode === 'bot' && currentPlayer !== playerSide) return;
        handleCellClick(cell, index);
    };
});

document.querySelector('#restart').addEventListener('click', restartGame);