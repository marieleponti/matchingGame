//Based on tutorial by Pamela Price @ Jumpstart Code https://www.youtube.com/channel/UCOqPZ4-ToWpEhrSEJNIbTtQ
"using strict"
let choices = [];
let firstClick = -1;
let secondClick = -1;
let correct = 0;
let timer = null; // for delay
let clock = null; //for clock

const pics = ["estanDisfrazados.png", "estanDisfrazados1.png", "haceManualidades.png", 
"haceManualidades1.png", "recolectaFruta.png", "recolectaFruta1.png", "tocanMusica.png", 
"tocanMusica1.png", "celebran.png", "celebran1.png", "bucean.png",  "bucean1.png", 
"montaBici.png", "montaBici1.png", "montanBici.png", "montanBici1.png"/*, "celebra1.png",
"recolectanFruta.png", "seAbrazan.png"*/]

// event listener when page loads
document.addEventListener("DOMContentLoaded", () => {
    //add event listener to button
    document.getElementById("restart").addEventListener("click", startGame);
    //start game
    startGame();
});

function startGame(){
    //console.log("start");
    //set up pictures for this fame
    choices = [];
    correct = 0;
    seconds = 0;
    clearInterval(clock);
    shuffle(pics);
    //console.log(pics);
    //pick first 8 pics, assign each picture to choices
    let index = 0;
    while (index < 16){
        //add next picture
        choices.push(pics[index]);
        index++;
    }
    //console.log(choices);
    shuffle(choices);
    shuffle(choices);
    // show the "back" image
    for (let i = 0; i < 16; i++){
        let id = i.toString();
        //console.log(id);
        const myimage = document.getElementById(id);
        //show back picture
        myimage.src = 'pics/back.png';
        //so we can see our images to test
        //myimage.src = 'pics/' + choices[i];
        //add click handler to each image
        myimage.addEventListener("click" , checkMatch);
    }
    clock = setInterval(tick, 1000);
}

function checkMatch(event){
    //console.log(event.target.id)
   //console.log(choices[event.target.id])
    let imgClicked = event.target;
    //first click?
    if(firstClick == -1){
        //save position
        firstClick = parseInt(imgClicked.id);
        //console.log("first click " + firstClick);
        //show image
        imgClicked.src='pics/' + choices[firstClick];
    } else if (secondClick == -1){
        //save position
        secondClick = parseInt(imgClicked.id);
        //console.log("second click " + secondClick)
        imgClicked.src='pics/' + choices[secondClick];
        //check for match
        if ((checkMatchAux(choices[firstClick], choices[secondClick])
        || checkMatchAux(choices[secondClick], choices[firstClick])) == true){
            document.getElementById("msg").innerHTML = "¡ENCONTRASTE PAREJAS!";
            correct++;
            if (correct == 8){
                document.getElementById("msg").innerHTML="¡Se acabó el juego!";
                //stop the clock
                clearInterval(clock);
            }
            //remove event listener so can't be reclicked
            document.getElementById(firstClick.toString()).removeEventListener("click", checkMatch);
            document.getElementById(secondClick.toString()).removeEventListener("click", checkMatch);
            //reset for next try
            firstClick = -1;
            secondClick = -1;
        } else{
            //delay, then turn pictures to back
            timer = setTimeout(togglePics, 1000);
            document.getElementById("msg").innerHTML = "INTENTA DE NUEVO.";
        }
    } 
}

//check match aux
function checkMatchAux(img1, img2){
    if (img1=="estanDisfrazados.png" && img2=="estanDisfrazados1.png"){
        return true;
    } else if (img1=="haceManualidades.png" && img2=="haceManualidades1.png"){
        return true;
    } else if (img1=="recolectaFruta.png" && img2=="recolectaFruta1.png"){
        return true;
    } else if (img1=="tocanMusica.png" && img2=="tocanMusica1.png"){
        return true;
    } else if (img1=="celebran.png" && img2=="celebran1.png"){
        return true;
    } else if (img1=="bucean.png" && img2=="bucean1.png"){
        return true;
    } else if (img1=="montanBici.png" && img2=="montanBici1.png"){
        return true;
    } else if (img1=="montaBici.png" && img2=="montaBici1.png"){
        return true;
    } else {
        return false;
    }
}

function togglePics(){
    //show back picture
    document.getElementById(firstClick.toString()).src ='pics/back.png';
    document.getElementById(secondClick.toString()).src ='pics/back.png';
    //stop timer
    clearTimeout(timer);
    firstClick = -1;
    secondClick = -1;
    //clear message
    document.getElementById("msg").innerHTML="";
}

//shuffle
function shuffle(words){
    for (let first = 0; first < words.length; first++){
        let second = Math.floor(Math.random() * words.length);
        //swap
        let temp = words[first];
        words[first] = words[second];
        words[second] = temp;
    }
}

function tick(){
    //increment
    seconds++;
    document.getElementById("clock").innerHTML= seconds + " seconds";
}



