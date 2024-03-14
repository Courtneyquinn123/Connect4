const rows = 6;
const columns = 7;
const board = [];
let currentPlayer = 1;

function initializeGame() {
    board.length = 0; // Reset the logic board array
    const gameBoard = document.getElementById('gameBoard');
    gameBoard.innerHTML = ''; // Clear the board display

    // Initialize the logic board and display
    for (let row = 0; row < rows; row++) {
        const rowArray = [];
        for (let col = 0; col < columns; col++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.row = row;
            cell.dataset.column = col;
            cell.addEventListener('click', handleCellClick);
            gameBoard.appendChild(cell);
            rowArray.push(0);
        }
        board.push(rowArray);
    }
    currentPlayer = 1; // Reset to first player
}

function handleCellClick(e) {
    const col = parseInt(e.target.dataset.column);
    for (let row = rows - 1; row >= 0; row--) {
        if (board[row][col] === 0) {
            board[row][col] = currentPlayer;
            const cell = document.querySelector(`[data-row="${row}"][data-column="${col}"]`);
            cell.classList.add(`player${currentPlayer}`);
            if (checkForWin(row, col)) {
                alert(`Player ${currentPlayer} wins!`);
                initializeGame();
                return;
            }
            currentPlayer = currentPlayer === 1 ? 2 : 1;
            break; // Exit the loop after finding the lowest empty cell
        }
    }
}

function checkForWin(row, col) {
    function checkDirection(direction) {
        let count = 0;
        let r = row + direction[0];
        let c = col + direction[1];
        while (r >= 0 && r < rows && c >= 0 && c < columns && board[r][c] === currentPlayer) {
            count++;
            r += direction[0];
            c += direction[1];
        }
        return count;
    }

    function checkWin(directionA, directionB) {
        // Count the number of consecutive discs including the current disc
        return checkDirection(directionA) + 1 + checkDirection(directionB) >= 4;
    }

    // Horizontal check
    if (checkWin([0, -1], [0, 1])) return true;
    // Vertical check
    if (checkWin([-1, 0], [1, 0])) return true;
    // Diagonal (top-left to bottom-right) check
    if (checkWin([-1, -1], [1, 1])) return true;
    // Diagonal (top-right to bottom-left) check
    if (checkWin([-1, 1], [1, -1])) return true;

    return false;
}

document.getElementById('restartButton').addEventListener('click', initializeGame);

initializeGame();
