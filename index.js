// Constants
let inputDir = { x: 0, y: 0 };
const foodSound = new Audio('food.mp3');
const gameOverSound = new Audio('gameover.mp3');
const moveSound = new Audio('move.mp3');
const musicSound = new Audio('music.mp3');

let initspeed = 5; 
let speed = 5;
let score = 0;
let lastPaintTime = 0;
let snakeArr = [{ x: 13, y: 15 }];
let food = { x: 6, y: 7 };
let gridc = 28;  
let gridr = 28;
let gameStarted = false; 


// Game functions
function main(ctime) {
    window.requestAnimationFrame(main);

    if ((ctime - lastPaintTime) / 1000 < 1 / speed) return;

    lastPaintTime = ctime;
    gameEngine();
}

function isCollide(snake) {
    // Check for collision with walls or itself
    for (let i = 1; i < snakeArr.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }

    if (snake[0].x >= gridc || snake[0].x <= 0 || snake[0].y >= gridr || snake[0].y <= 0) {
        return true;
    }
    return false;
}

function gameEngine() {
    // Game over if collision occurs
    if (isCollide(snakeArr)) {
        gameOverSound.play();
        musicSound.pause();
        inputDir = { x: 0, y: 0 };
        alert("Game Over!");
        snakeArr = [{ x: 13, y: 15 }];
        musicSound.play();
        score = 0;
        updateScore(score);
        speed = initspeed;  
    }

    // If snake eats food
    if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
        snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y });
        let a = 2;
        let b = 16;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) };
        foodSound.play();
        score++;
        if(score%4==0) speed+=2; 
        updateScore(score); 
    }

    // Move the snake
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i + 1] = { ...snakeArr[i] }; // Move segments of the snake
    }
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    // Display snake and food on the board
    let board = document.getElementById('board');
    board.innerHTML = '';
    snakeArr.forEach((e, index) => {
        let snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        snakeElement.classList.add(index === 0 ? 'head' : 'snake');
        board.appendChild(snakeElement);
    });

    let foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}

function updateScore(score) {
    let scoreElement = document.getElementById('scoreValue');
    scoreElement.textContent = score;
}


// Initialize game
window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    //e.preventDefault(); // Prevent default behavior of arrow keys (page scrolling)

    if (e.key === "ArrowUp" || e.key === "ArrowDown") {
        e.preventDefault();
    }

    inputDir = { x: 0, y: 1 }; // Default direction when game starts
    moveSound.play();

    switch (e.key) {
        case "ArrowUp":
            inputDir.x = 0;
            inputDir.y = -1;
            break;
        case "ArrowDown":
            inputDir.x = 0;
            inputDir.y = 1;
            break;
        case "ArrowRight":
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        case "ArrowLeft":
            inputDir.x = -1;
            inputDir.y = 0;
            break;
        default:
            break;
    }

});
