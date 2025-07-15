const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreDisplay = document.getElementById('score');
const gameOverScreen = document.getElementById('gameOver');
const finalScoreDisplay = document.getElementById('finalScore');
const restartBtn = document.getElementById('restartBtn');
const upBtn = document.getElementById('upBtn');
const downBtn = document.getElementById('downBtn');
const leftBtn = document.getElementById('leftBtn');
const rightBtn = document.getElementById('rightBtn');

const gridSize = 20;
let canvasSize = Math.min(window.innerWidth - 40, 400);
canvas.width = canvasSize;
canvas.height = canvasSize;
const tileCount = canvas.width / gridSize;
let snake = [{ x: 10, y: 10 }];
let food = { x: 15, y: 15 };
let dx = 0;
let dy = 0;
let score = 0;
let gameLoop;

function drawGame() {
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        score += 10;
        scoreDisplay.textContent = score;
        generateFood();
    } else {
        snake.pop();
    }

    ctx.fillStyle = '#00ff00';
    snake.forEach(segment => {
        ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize - 2, gridSize - 2);
    });

    ctx.fillStyle = '#ff0000';
    ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize - 2, gridSize - 2);

    if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount || snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y)) {
        endGame();
    }
}

function generateFood() {
    food.x = Math.floor(Math.random() * tileCount);
    food.y = Math.floor(Math.random() * tileCount);
    if (snake.some(segment => segment.x === food.x && segment.y === food.y)) {
        generateFood();
    }
}

function endGame() {
    clearInterval(gameLoop);
    finalScoreDisplay.textContent = score;
    gameOverScreen.classList.remove('hidden');
}

function resetGame() {
    snake = [{ x: 10, y: 10 }];
    food = { x: 15, y: 15 };
    dx = 0;
    dy = 0;
    score = 0;
    scoreDisplay.textContent = score;
    gameOverScreen.classList.add('hidden');
    gameLoop = setInterval(drawGame, 100);
}

document.addEventListener('keydown', e => {
    switch (e.key) {
        case 'ArrowUp': if (dy !== 1) { dx = 0; dy = -1; } break;
        case 'ArrowDown': if (dy !== -1) { dx = 0; dy = 1; } break;
        case 'ArrowLeft': if (dx !== 1) { dx = -1; dy = 0; } break;
        case 'ArrowRight': if (dx !== -1) { dx = 1; dy = 0; } break;
    }
});

upBtn.addEventListener('click', () => { if (dy !== 1) { dx = 0; dy = -1; } });
downBtn.addEventListener('click', () => { if (dy !== -1) { dx = 0; dy = 1; } });
leftBtn.addEventListener('click', () => { if (dx !== 1) { dx = -1; dy = 0; } });
rightBtn.addEventListener('click', () => { if (dx !== -1) { dx = 1; dy = 0; } });

restartBtn.addEventListener('click', resetGame);

window.addEventListener('resize', () => {
    canvasSize = Math.min(window.innerWidth - 40, 400);
    canvas.width = canvasSize;
    canvas.height = canvasSize;
    drawGame();
});

resetGame();