var canvas=document.getElementById("gamecanvas");
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
function main()
{
    if(over)
        return;

    //making the background black
    ctx.fillStyle="black";
    ctx.fillRect(0,0,canvas.width,canvas.height);

    //making the food appear in the canvas
    ctx.fillStyle="green";
    ctx.fillRect(food.x,food.y,box,box);

    //making the snake
    for(let i=0;i<snake.length;i++){
        if (i === 0) {
            // Draw the snake head
            ctx.beginPath();
            ctx.fillStyle="yellow";
            ctx.arc(snake[i].x + box / 2, snake[i].y + box / 2, box / 2, 0, 2 * Math.PI); 
            ctx.fill();
        }
        else{
            //rest body of the snake
            ctx.fillStyle="orange";
             ctx.fillRect(snake[i].x,snake[i].y,box,box);
        }
    }

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
    }
    else 
         snake.pop();

    //tracking the snake head
    let newhead={
        x:newX ,
        y:newY
    };

    //checkking if the snake head collaspe
    if (snake.some(pos => pos.x === newhead.x && pos.y === newhead.y)) {
        over = true;
        gameover();
        return;
    }

    //checking if the snake hit the wall
    if(newhead.x>=canvas.width || newhead.y>=canvas.height|| newhead.x<0||newhead.y<0 ){
        over=true;
        gameover();
        return;
    }
    //adding the new head infront of the snake on eating the food
    snake = [newhead].concat(snake);
    //calling the displayscore to display the score    
    displayscore();
}