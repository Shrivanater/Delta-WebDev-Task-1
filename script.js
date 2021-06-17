const jumble = (arr) => {
    const copy = [...arr];
    for(let i = 0; i < copy.length; i++) {
        let j = Math.floor(Math.random()*copy.length);
        let temp = copy[i];
        copy[i] = copy[j];
        copy[j] = temp;
    }   
    return copy;
}
 
const setId = (items) => {
    for(let i = 0; i < items.length; i++) {
        items[i].setAttribute("id", i)
    }
}

let win = 0;
let go = 0;

let score = 0;
let highScore = 0;
let sec = 0;
let bestTime = 0;

document.getElementById("scoreboard").innerHTML = `No. of Moves: 0`;
document.getElementById("highScore").innerHTML = `Least Moves Taken: `;
document.getElementById("bestTime").innerHTML = `Best Time: `;

let ul = document.querySelectorAll("li");;

setId(ul);

let ul1 = document.querySelectorAll(".board > li");;
const colors1= ["Red", "Red", "Red", "Red", 
                "Blue", "Blue", "Blue", "Blue", 
                "#22c022", "#22c022", "#22c022", "#22c022",
                "Yellow", "Yellow", "Yellow", "Yellow",
                "Orange", "Orange", "Orange", "Orange", 
                "Magenta", "Magenta", "Magenta", "Magenta",
                "Black"]

let ul2 = document.querySelectorAll('.target > li');;
const colors2= ["Red", "Red", "Red", "Red", 
                "Blue", "Blue", "Blue", "Blue", 
                "#22c022", "#22c022", "#22c022", "#22c022",
                "Yellow", "Yellow", "Yellow", "Yellow",
                "Orange", "Orange", "Orange", "Orange", 
                "Magenta", "Magenta", "Magenta", "Magenta"]

let jumbled1 = jumble(colors1);
ul1.forEach((color, i) => {
    color.style.backgroundColor = jumbled1[i];
});

let jumbled2 = jumble(colors2);
ul2.forEach((color, i) => {
    color.style.backgroundColor = jumbled2[i];
}); 

function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
      this.sound.play();
    }
    this.stop = function(){
      this.sound.pause();
    }
}

function initializeClock(id, endtime) {
    clock = document.getElementById(id);
    minutesSpan = clock.querySelector('.minutes');
    secondsSpan = clock.querySelector('.seconds');

    function updateClock() {
        
        if(go === 0){
            minutesSpan.innerHTML = ('00');
            secondsSpan.innerHTML = ('00');
            clearInterval(timeinterval);
        }

        if(go === 1){
            minutesSpan.innerHTML = ('0' + parseInt(sec / 60)).slice(-2);
            secondsSpan.innerHTML = ('0' + (sec % 60)).slice(-2);
        }

        sec++;
    }

    updateClock();
    const timeinterval = setInterval(updateClock, 1000);
}

function reset(){
    go = 0;
    score = 0;
    sec = 0;
    document.getElementById("scoreboard").innerHTML = `No. of Moves: 0`;

    jumbled1 = jumble(colors1);

    ul1.forEach((color, i) => {
        color.style.backgroundColor = jumbled1[i];
    });

    jumbled2 = jumble(colors2);

    ul2.forEach((color, i) => {
        color.style.backgroundColor = jumbled2[i];
    });

    updateClock();
}

function swapTile(tile, x) {
    score++;
    document.getElementById("scoreboard").innerHTML = `No. of Moves: ${score}`;

    let blackTile = document.getElementById(parseInt(tile.id) + x);
    blackTile.style.backgroundColor = tile.style.backgroundColor;
    tile.style.backgroundColor = "black";
    
    let temp = jumbled1[parseInt(tile.id)];
    jumbled1[parseInt(tile.id)] = jumbled1[parseInt(blackTile.id)];
    jumbled1[parseInt(blackTile.id)] = temp;
    tileMoveSound.play();
}

function play(){
    go = 1;

    tileMoveSound = new sound("TileMove.wav");
    victorySound = new sound("FF7Victory.mp3");

    ul1.forEach((tile, i) => {
        tile.addEventListener('click', event => {
            if(go === 1)
                clickTile(tile);
        });
    });

    const deadline = new Date(Date.parse(new Date()) + 60*59*34);
    initializeClock('clockdiv', deadline);

    const clickTile = (tile) => {
        //CORNERS
        if(tile.id === '0'){
            if(document.getElementById(parseInt(tile.id) + 1).style.backgroundColor === "black"){
                swapTile(tile, 1);
            }
            if(document.getElementById(parseInt(tile.id) + 5).style.backgroundColor === "black"){                
                swapTile(tile, 5);
            }
        }

        if(tile.id === '4'){
            if(document.getElementById(parseInt(tile.id) - 1).style.backgroundColor === "black"){                
                swapTile(tile, -1);
            }
            if(document.getElementById(parseInt(tile.id) + 5).style.backgroundColor === "black"){                
                swapTile(tile, 5);
            }
        }

        if(tile.id === '20'){
            if(document.getElementById(parseInt(tile.id) + 1).style.backgroundColor === "black"){
                swapTile(tile, 1);
            }
            if(document.getElementById(parseInt(tile.id) - 5).style.backgroundColor === "black"){
                swapTile(tile, -5);
            }
        }

        if(tile.id === '24'){
            if(document.getElementById(parseInt(tile.id) - 1).style.backgroundColor === "black"){
                swapTile(tile, -1);
            }
            if(document.getElementById(parseInt(tile.id) - 5).style.backgroundColor === "black"){
                swapTile(tile, -5);
            }
        }

        //EDGES
        if(tile.id === '1' || '2' || '3'){
            if(document.getElementById(parseInt(tile.id) + 1).style.backgroundColor === "black"){
                swapTile(tile, 1);
            }
            if(document.getElementById(parseInt(tile.id) + 5).style.backgroundColor === "black"){
                swapTile(tile, 5);
            }
            if(document.getElementById(parseInt(tile.id) - 1).style.backgroundColor === "black"){
                swapTile(tile, -1);
            }
        }

        if(tile.id === '5' || '10' || '15'){
            if(document.getElementById(parseInt(tile.id) + 1).style.backgroundColor === "black"){
                swapTile(tile, 1);
            }
            if(document.getElementById(parseInt(tile.id) + 5).style.backgroundColor === "black"){
                swapTile(tile, 5);
            }
            if(document.getElementById(parseInt(tile.id) - 5).style.backgroundColor === "black"){
                swapTile(tile, -5);
            }
        }

        if(tile.id === '9' || '14' || '19'){
            if(document.getElementById(parseInt(tile.id) - 1).style.backgroundColor === "black"){
                swapTile(tile, -1);
            }
            if(document.getElementById(parseInt(tile.id) + 5).style.backgroundColor === "black"){
                swapTile(tile, 5);
            }
            if(document.getElementById(parseInt(tile.id) - 5).style.backgroundColor === "black"){                
                swapTile(tile, -5);
            }
        }

        if(tile.id === '21' || '22' || '23'){
            if(document.getElementById(parseInt(tile.id) + 1).style.backgroundColor === "black"){
                swapTile(tile, 1)
            }
            if(document.getElementById(parseInt(tile.id) - 1).style.backgroundColor === "black"){
                swapTile(tile, -1);
            }
            if(document.getElementById(parseInt(tile.id) - 5).style.backgroundColor === "black"){                
                swapTile(tile, -5);
            }
        }

        //INNER
        else{
            if(document.getElementById(parseInt(tile.id) + 1).style.backgroundColor === "black"){
                swapTile(tile, 1);
            }
            if(document.getElementById(parseInt(tile.id) + 5).style.backgroundColor === "black"){
                swapTile(tile, 5);
            }
            if(document.getElementById(parseInt(tile.id) - 1).style.backgroundColor === "black"){
                swapTile(tile, -1);
            }
            if(document.getElementById(parseInt(tile.id) - 5).style.backgroundColor === "black"){
                swapTile(tile, -5);
            }
        }


        if(jumbled1[6] === jumbled2[0] && jumbled1[7] === jumbled2[1] &&jumbled1[8] === jumbled2[2] && 
            jumbled1[11] === jumbled2[3] && jumbled1[12] === jumbled2[4] && jumbled1[13] === jumbled2[5] && 
            jumbled1[16] === jumbled2[6] && jumbled1[17] === jumbled2[7] && jumbled1[18] === jumbled2[8]){
            victorySound.play(); 
            if((score < highScore) || (highScore === 0)){
                highScore = score;
                document.getElementById("highScore").innerHTML = `Least Moves Taken: ${highScore}`;
            }
            if((sec < bestTime) || (bestTime === 0)){ 
                bestTime = sec;
                document.getElementById("bestTime").innerHTML = `Best Time:  ${parseInt(sec/60)}:${sec%60}`;    
            }
            alert("You Win!!!");   
            reset();
        }
    }   
    
}



