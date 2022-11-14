//getting Elements
const grid = document.getElementById('grid');
const context = grid.getContext("2d");
const scoreText = document.getElementById('scoreCard');
const startGame = document.getElementById('startGame');
const resetButton = document.getElementById('replayButton');
const UP = document.getElementById('top');
const LEFT = document.getElementById('left');
const DOWN = document.getElementById('bottom');
const RIGHT = document.getElementById('right');
const gridWidth = grid.width;
const gridHeight = grid.height;

//colors  for items
const snakeColor = "#b65c5f";
const snakeBorder = "black";
const foodColor = "#d2c9a5";

//fills board and gives start size
const unitSize = 25;
let running = false;
let xSpeed = unitSize;
let ySpeed = 0;
let foodX;
let foodY;
let score = 0;

//start size of snake (array gives ability to grow)
let snake = [
    {x:unitSize * 4, y:0},
    {x:unitSize * 3, y:0},
    {x:unitSize * 2, y:0},
    {x:unitSize, y:0},
    {x:0, y:0},
]

//event listeners
window.addEventListener("keydown", controlSnake);
resetButton.addEventListener('click', resetGame);
startGame.addEventListener('click', gameStart)

UP.addEventListener("click", () => (ySpeed == -unitSize));
DOWN.addEventListener("click", () => (ySpeed == unitSize));
LEFT.addEventListener("click", () => (xSpeed == unitSize));
RIGHT.addEventListener("click", () => (xSpeed == -unitSize));

//starts game
function gameStart(){
    running = true;
    scoreText.textContent = score;
    makeFood();
    colorFood();
    nextMove();
};

//calls most of the functions when a move is made/game is running
function nextMove(){
    if (running){
        setTimeout(()=>{
            clearGrid();
            colorFood();
            moveSnake();
            colorSnake();
            gameOver();
            nextMove();
        },100);
    }
    else{
        showGameOver();
    }
};

//clears grid for new game
function clearGrid(){
    context.fillStyle = "black";
    context.fillRect(0,0,gridHeight,gridWidth)
};

//makes food a element that occurs on the grid
function makeFood(){
    function ranFood(min,max){
        const randNum = Math.floor((Math.random() * (max - min) + min) / unitSize) * unitSize;
        return randNum
    }
    foodX = ranFood(0, gridWidth - unitSize);
    foodY = ranFood(0, gridWidth - unitSize);
};

//colors the food to make it seen on board
function colorFood(){
    context.fillStyle = foodColor;
    context.fillRect(foodX, foodY, unitSize, unitSize)
};

//causes movement to snake, and adds body parts to eaten food
function moveSnake(){
    const front = {x: snake[0].x + xSpeed,
                   y: snake[0].y + ySpeed};
    snake.unshift(front);
    if(snake[0].x == foodX && snake[0].y == foodY){
        score+=1;
        scoreText.textContent = score;
        makeFood();
    }
    else{
        snake.pop();
    }
};

//function allows the snake to be colored, using canvas commands.
function colorSnake(){
    context.fillStyle = snakeColor;
    context.strokeStyle = snakeBorder;
    snake.forEach(snakeLength =>{
        context.fillRect(snakeLength.x, snakeLength.y, unitSize, unitSize);
        context.strokeRect(snakeLength.x, snakeLength.y, unitSize, unitSize);
    })
};

//ability to control snake with keyboard.
function controlSnake(event){
    const controlPressed = event.keyCode;
    //Numbers gotten when console.log(controlPressed)
    const LEFT = 37;
    const UP = 38;
    const RIGHT = 39;
    const DOWN = 40;

    const goingUP = (ySpeed == -unitSize)
    const goingDOWN = (ySpeed == unitSize)
    const goingRIGHT = (xSpeed == unitSize)
    const goingLEFT = (xSpeed == -unitSize)

    //The && condition will prevent the snake from eating self
    
    switch(true) {
        case(controlPressed == LEFT && !goingRIGHT):
           xSpeed = -unitSize;
           ySpeed = 0;
           break;
        case(controlPressed == UP && !goingDOWN):
           xSpeed = 0;
           ySpeed = -unitSize;
           break;
        case(controlPressed == RIGHT && !goingLEFT):
           xSpeed = unitSize;
           ySpeed = 0;
           break;
        case(controlPressed == DOWN && !goingUP):
           xSpeed = 0;
           ySpeed = unitSize;
           break;
    }

};

//causes game over when snake hits border
function gameOver(){
    switch(true){
        case (snake[0].x < 0):
            running = false;
            break;
        case (snake[0].x >= gridWidth):
            running = false;
            break;
        case (snake[0].y < 0):
            running = false;
            break;
        case (snake[0].y >= gridHeight):
            running = false;
            break;   
      }
    for (let i = 1; i < snake.length; i++){
        if (snake[i].y == snake[0].y && snake[i].x == snake[0].x){
        running = false;
        }
    }
};

//shows game over when borders hit
function showGameOver(){
    alert('GAME OVER')
    running = false;
};

function resetGame(){
    score = 0;
    xSpeed = unitSize;
    ySpeed = 0;
    snake = [
        {x:unitSize * 4, y:0},
        {x:unitSize * 3, y:0},
        {x:unitSize * 2, y:0},
        {x:unitSize, y:0},
        {x:0, y:0},
    ]
    clearGrid();
};
