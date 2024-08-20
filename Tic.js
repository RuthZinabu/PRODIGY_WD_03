document.addEventListener('DOMContentLoaded', () => {
    const tiles = document.querySelectorAll('.tile');
    const gameStatus = document.getElementById('game-status');
    const playAgainBtn = document.getElementById('play-again');
    const difficultySelection = document.getElementById('difficulty-selection');
    const aiButton = difficultySelection.children[0];
    const humanButton = difficultySelection.children[1];

    let board = ['', '', '', '', '', '', '', '', ''];
    let currentPlayer = 'X';
    let gameActive = true;
    let isAI = false;

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

    const handleResultValidation = () => {
        let roundWon = false;
        let winningTiles = [];
        for (let i = 0; i < winningConditions.length; i++) {
            const winCondition = winningConditions[i];
            let a = board[winCondition[0]];
            let b = board[winCondition[1]];
            let c = board[winCondition[2]];
            if (a === '' || b === '' || c === '') {
                continue;
            }
            if (a === b && b === c) {
                roundWon = true;
                winningTiles = winCondition;
                break;
            }
        }

        if (roundWon) {
            gameStatus.textContent = `🎉🎉🎉Player ${currentPlayer} has won! 🎉🎉🎉`;
            gameStatus.classList.add('winner');
            winningTiles.forEach(index => {
                tiles[index].classList.add('highlight');
            });
            gameActive = false;
            return;
        }

        if (!board.includes('')) {
            gameStatus.textContent = `Game ended in a draw!`;
            gameActive = false;
            return;
        }

        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        gameStatus.textContent = `It's ${currentPlayer}'s turn`;

        if (isAI && currentPlayer === 'O') {
            setTimeout(aiMove, 500);
        }
    };

    const aiMove = () => {
        let availableIndices = board.map((tile, index) => tile === '' ? index : null).filter(index => index !== null);
        let randomIndex = availableIndices[Math.floor(Math.random() * availableIndices.length)];
        
        board[randomIndex] = 'O';
        tiles[randomIndex].textContent = 'O';
        tiles[randomIndex].classList.add('ai-move');

        handleResultValidation();
    };

    const handleTileClick = (event) => {
        const clickedTile = event.target;
        const clickedTileIndex = parseInt(clickedTile.getAttribute('data-index'));

        if (board[clickedTileIndex] !== '' || !gameActive || (isAI && currentPlayer === 'O')) {
            return;
        }

        board[clickedTileIndex] = currentPlayer;
        clickedTile.textContent = currentPlayer;
        handleResultValidation();
    };

    const handlePlayAgain = () => {
        board = ['', '', '', '', '', '', '', '', ''];
        gameActive = true;
        currentPlayer = 'X';
        gameStatus.textContent = `It's ${currentPlayer}'s turn`;
        gameStatus.classList.remove('winner');
        tiles.forEach(tile => {
            tile.textContent = '';
            tile.classList.remove('highlight', 'ai-move');
        });
        difficultySelection.style.display = 'block';
    };

    const handlePlayWithAI = () => {
        isAI = true;
        difficultySelection.style.display = 'none';
        gameStatus.textContent = `It's ${currentPlayer}'s turn`;
    };

    const handlePlayWithHuman = () => {
        isAI = false;
        difficultySelection.style.display = 'none';
        gameStatus.textContent = `It's ${currentPlayer}'s turn`;
    };

    tiles.forEach(tile => tile.addEventListener('click', handleTileClick));
    playAgainBtn.addEventListener('click', handlePlayAgain);
    aiButton.addEventListener('click', handlePlayWithAI);
    humanButton.addEventListener('click', handlePlayWithHuman);
});
