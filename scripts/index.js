let inputDir = {x: 0, y: 0}
const foodsound = new Audio('music/food.mp3')
const gameover = new Audio('music/gameover.mp3')
const movesound = new Audio('music/move.mp3')
const musicsound = new Audio('music/music.mp3')
let speed = 6
let lastPaintTime = 0
let snakeArr = [
    {x: 13, y: 15}
]
let score = 0;

food = {x: 10, y: 6}
//game functions
function main(ctime){   //ctime = current time
    window.requestAnimationFrame(main)
    if((ctime- lastPaintTime)/1000 < 1/speed){ //until unless the ctime is less than 0.5s
        return
    }
    lastPaintTime = ctime;

    // console.log(ctime)
    gameEngine()
} 

function gameEngine(){
    board.innerHTML = ""
    if(isCollide(snakeArr)){
        gameover.play()
        musicsound.pause()
        inputDir = {x: 0, y: 0}
        alert("gameOver, press any key to play Again")
        snakeArr = [{x: 13, y: 15}]
        musicsound.play()
        score = 0
    }
    
    function isCollide(snakeArr) {
        for(let i = 1; i<snakeArr.length; ++i){
            if(snakeArr[0].x === snakeArr[i].x && snakeArr[0].y === snakeArr[i].y){
                return true;
            }
        }
        if(snakeArr[0].x >=18 || snakeArr[0].x <=0 || snakeArr[0].y <=0 ||  snakeArr[0].y>=18){
            return true;
        }
    }
    
    if(snakeArr[0].y === food.y && snakeArr[0].x === food.x){
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x , y: snakeArr[0].y + inputDir.y})
        let a = 2;
        let b = 16;
        food = {x: Math.round(a+(b-a)*Math.random()), y: Math.round(a+(b-a)*Math.random())}
        foodsound.play()
        score +=score
        console.log(score)
    }
    
    
    for(let i = snakeArr.length - 2; i>=0 ;--i){
        snakeArr[i+1] = {...snakeArr[i]}
    }

    
    snakeArr[0].x  += inputDir.x
    snakeArr[0].y  += inputDir.y 
    snakeArr.forEach((e, index)=>{
        snakeElement = document.createElement('div')
        snakeElement.style.gridRowStart = e.y
        snakeElement.style.gridColumnStart = e.x
        if(index===0){
            snakeElement.classList.add('head')
        }
        else{
            snakeElement.classList.add('snake_back')
            
        }
        board.appendChild(snakeElement)

    })

    foodElement = document.createElement('div')
    foodElement.style.gridRowStart = food.y
    foodElement.style.gridColumnStart = food.x
    foodElement.classList.add('food')
    board.appendChild(foodElement)
}












//main logics starts here
window.requestAnimationFrame(main)

window.addEventListener('keydown', e=>{
    inputDir = {x: 0, y: 1}
    movesound.play();
    switch(e.key){
        case "ArrowUp":
        inputDir.x = 0;
        inputDir.y = -1;
        console.log("ArrrowUp")
        break
        case "ArrowDown":
        console.log("ArrowDown")
        inputDir.x = 0;
        inputDir.y = 1;
        break
        case "ArrowLeft":
        inputDir.x = -1;
        inputDir.y = 0;
        console.log("ArrowLeft")
        break
        case "ArrowRight":
        inputDir.x = 1;
        inputDir.y = 0;
        console.log("ArrowRight")
        break
        default: break;
    }

})