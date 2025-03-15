var canvas=document.getElementById("gameCanvas");
var ctx=canvas.getContext("2d");

//intial size of snake and food
var box=20;
//initial postion of the snake and snake is the array of objectsx
let snake=[{x:200, y:200}];
let direction="right";
//intializing the game variables
let food;
let score=0;
let speed=150;
let interval=setInterval(main,speed);
let over=false;
let nextdirection="right"

// displays food at random position
function showFood(){
    food = {x: Math.floor(Math.random() * box) * box,y: Math.floor(Math.random() * box) * box}

     //checking if the food is not there where the snake is
     while(snake.some(pos=>pos.x===food.x && pos.y===food.y))
        food = {x: Math.floor(Math.random() * box) * box,y: Math.floor(Math.random() * box) * box}

}
// calling the showffod function to display the food in canvas
showFood();
//reading the keyboard inputs
document.addEventListener("keydown",change);

//changing the direction based on the inputs
function change(event){
    let key=event.key;
    //using not euals to right because it directly not moves the back and same with others
    if(key=== 'ArrowLeft' && direction !=="right")
        nextdirection="left";
    else if(key==='ArrowRight' && direction !=="left")
        nextdirection="right";
    else if(key==='ArrowDown' && direction !=="up")
        nextdirection="down";
    else if(key==='ArrowUp' && direction !=="down")
        nextdirection="up";
}

//displaying the score in the game
function displayscore(){
    let msg=document.getElementById("scoremsg");
    msg.innerHTML="Score: "+score;
}

//displaying the message of game over with the score along with msg of how to restart game
function gameover(){
    //adding the blur in the background
    ctx.fillStyle="rgba(0, 0, 0, 0.646)";
    ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.font = "30px Arial";
    //using the red color for game over making it highlight for the user
    ctx.fillStyle="red";
    ctx.fillText("GAME OVER!", canvas.width/4, canvas.height/2);
    ctx.font = "20px Arial";
    ctx.fillStyle="white";
    ctx.fillText("Your Score was "+score , canvas.width/4,canvas.height/2+40);
    ctx.fillText("Press Space to restart", canvas.width/4, canvas.height/2 + 80);
    document.addEventListener("keydown", restart);
}
function restart(event) {
    //cheking the condition for restarting the game
     if (event.key === " " && over) { 
         // Reset the game state
         snake = [{ x: 200, y: 200 }];
         nextdirection=direction="right";
         showFood();
         score = 0;
         speed = 150;
         over = false;
         clearInterval(interval);
        interval = setInterval(main, speed);
     }
}

// drawing the game
function main() {
    if(over)
        return;

    //making the background black
    ctx.fillStyle="black";
    ctx.fillRect(0,0,canvas.width,canvas.height);

    //making the food appear in the canvas
    ctx.fillStyle="red";
    ctx.beginPath();
    ctx.arc(food.x + box / 2, food.y + box / 2, box / 2, 0, 2 * Math.PI);
    ctx.fill();
    ctx.fillStyle="green";
    ctx.beginPath();
    ctx.arc(food.x + box / 1.4, food.y + box / 3, box / 2, 4, 2 * Math.PI);
    ctx.fill();
    ctx.fillStyle="#f04646";
    ctx.beginPath();
    ctx.arc(food.x + box / 3, food.y + box / 3, box / 4, 2, 2 * Math.PI);
    ctx.fill();


    function drawSnake() {
        for (let i = 0; i < snake.length; i++) {
            if (i === 0) {
            // Draw the snake head
            ctx.beginPath();
            ctx.fillStyle="yellow";
            ctx.arc(snake[i].x + box / 2, snake[i].y + box / 2, box / 2, 0, 2 * Math.PI); 
            ctx.fill();
            ctx.strokeStyle = "orange";
            ctx.stroke();
            
            // Draw the eyes
            ctx.fillStyle="gray";
            if (direction === "left" || direction === "right") {
                ctx.beginPath();
                ctx.arc(snake[i].x + box / 4, snake[i].y + box / 3.5, box / 6, 0, 2 * Math.PI);
                ctx.fill();
                ctx.beginPath();
                ctx.arc(snake[i].x + (3 * box) / 4, snake[i].y + box / 3.5, box / 6, 0, 2 * Math.PI);
                ctx.fill();
            } else if (direction === "up" || direction === "down") {
                ctx.beginPath();
                ctx.arc(snake[i].x + box / 3.5, snake[i].y + box / 4, box / 6, 0, 2 * Math.PI);
                ctx.fill();
                ctx.beginPath();
                ctx.arc(snake[i].x + box / 3.5, snake[i].y + (3 * box) / 4, box / 6, 0, 2 * Math.PI);
                ctx.fill();
            }
           // Draw pupils
           ctx.fillStyle = "black";
            if (direction === "left") {
                ctx.beginPath();
                ctx.arc(snake[i].x + box / 4 - box / 16, snake[i].y + box / 3.5, box / 16, 0, 2 * Math.PI);
                ctx.fill();
                ctx.beginPath();
                ctx.arc(snake[i].x + (3 * box) / 4 - box / 16, snake[i].y + box / 3.5, box / 16, 0, 2 * Math.PI);
                ctx.fill();
            } else if (direction === "right") {
                ctx.beginPath();
                ctx.arc(snake[i].x + box / 4 + box / 16, snake[i].y + box / 3.5, box / 16, 0, 2 * Math.PI);
                ctx.fill();
                ctx.beginPath();
                ctx.arc(snake[i].x + (3 * box) / 4 + box / 16, snake[i].y + box / 3.5, box / 16, 0, 2 * Math.PI);
                ctx.fill();
            } else if (direction === "up") {
                ctx.beginPath();
                ctx.arc(snake[i].x + box / 3.5, snake[i].y + box / 4 - box / 16, box / 16, 0, 2 * Math.PI);
                ctx.fill();
                ctx.beginPath();
                ctx.arc(snake[i].x + box / 3.5, snake[i].y + (3 * box) / 4 - box / 16, box / 16, 0, 2 * Math.PI);
                ctx.fill();
            } else if (direction === "down") {
                ctx.beginPath();
                ctx.arc(snake[i].x + box / 3.5, snake[i].y + box / 4 + box / 16, box / 16, 0, 2 * Math.PI);
                ctx.fill();
                ctx.beginPath();
                ctx.arc(snake[i].x + box / 3.5, snake[i].y + (3 * box) / 4 + box / 16, box / 16, 0, 2 * Math.PI);
                ctx.fill();
            }
            // Draw the tongue
            ctx.strokeStyle = "red";
            ctx.beginPath();
            if (direction === "left") {
                ctx.moveTo(snake[i].x, snake[i].y + box / 2);
                ctx.lineTo(snake[i].x - box / 2, snake[i].y + box / 2);
            } else if (direction === "right") {
                ctx.moveTo(snake[i].x + box, snake[i].y + box / 2);
                ctx.lineTo(snake[i].x + box + box / 2, snake[i].y + box / 2);
            } else if (direction === "up") {
                ctx.moveTo(snake[i].x + box / 2, snake[i].y);
                ctx.lineTo(snake[i].x + box / 2, snake[i].y - box / 2);
            } else if (direction === "down") {
                ctx.moveTo(snake[i].x + box / 2, snake[i].y + box);
                ctx.lineTo(snake[i].x + box / 2, snake[i].y + box + box / 2);
            }
            ctx.stroke();
        } else if (i === snake.length - 1) {
            // Draw the tail with a rounded end
            ctx.fillStyle = "yellow";
            ctx.beginPath();
            ctx.arc(snake[i].x + box / 2, snake[i].y + box / 2, box / 3, 0, Math.PI * 2);
            ctx.fill();
            ctx.strokeStyle = "orange";
            ctx.stroke();
        } else {
            // Draw the body
            ctx.fillStyle = "yellow";
            ctx.beginPath();
            ctx.arc(snake[i].x + box / 2, snake[i].y + box / 2, box / 2, 0, Math.PI * 2);
            ctx.fill();
            ctx.strokeStyle = "orange";
            ctx.stroke();

            }

        }
    }
    
    drawSnake();

    //finding the head postion
    let newX=snake[0].x;
    let newY=snake[0].y;

    //moving the snake based on direction
    direction=nextdirection;
    if(direction==="left")
        newX-=box;
    if(direction==="right")
        newX+=box;
    if(direction==="up")
        newY-=box;
    if(direction==="down")
        newY+=box;

    //checking if the snake eats food
    if(newX===food.x && newY=== food.y){
        score++;
        showFood();

        //increasing the speed for more difficulty
        if(score%5===0){
            speed=Math.max(speed-10,30);
            clearInterval(interval);
            interval=setInterval(main,speed);

        }
    //do not remove the last part of the snake
    } else {
         snake.pop();
    }

    //tracking the snake head
    let newhead={
        x:newX ,
        y:newY
    };

    //adding the new head to the snake
    snake.unshift(newhead);

    //checkking if the snake head collides with the body
    for (let i = 1; i < snake.length; i++) {    
        if (snake[i].x === newhead.x && snake[i].y === newhead.y) {
        over = true;
        gameover();
        return;
        }
    }

    //checking if the snake hit the wall
    if(newhead.x>=canvas.width || newhead.y>=canvas.height|| newhead.x<0||newhead.y<0 ){
        over=true;
        gameover();
        return;
    }

    //calling the displayscore to display the score    
    displayscore();
}
