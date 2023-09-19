const WORKING_TIME = 25;
const BREAK_TIME = 5;

const DEBUGGING = false;

const INTERVAL = DEBUGGING ? 1 : 1000; // Should be 1000 if not debugging

const IDLE_STATE = 2
const WORKING_STATE = 0;
const BREAK_STATE = 1;

let seconds = 0;
let minutes = WORKING_TIME;

let intervalID;

let currentState = IDLE_STATE;

// DOM elements

let startButton = document.getElementById("startButton");
let resetButton = document.getElementById("resetButton");
resetButton.classList.add("hidden");

startButton.addEventListener("click", startTimersLoop);
resetButton.addEventListener("click", resetTimer);

let workingStatus = document.getElementById("workingStatus");
let breakStatus = document.getElementById("breakStatus");

let playButtonBlack = document.getElementById("playButtonBlack");
let playButtonBlue = document.getElementById("playButtonBlue");
let restartButtonBlack = document.getElementById("restartButtonBlack");
let restartButtonBlue = document.getElementById("restartButtonBlue");


/* Add events listeners to both buttons so that they turn blue when the mouse hover them*/

startButton.addEventListener("mouseenter", () =>{
    playButtonBlue.classList.toggle("hidden");
    playButtonBlack.classList.toggle("hidden");
})

startButton.addEventListener("mouseleave", () =>{
    playButtonBlue.classList.toggle("hidden");
    playButtonBlack.classList.toggle("hidden");
})

resetButton.addEventListener("mouseenter", () =>{
    restartButtonBlack.classList.toggle("hidden");
    restartButtonBlue.classList.toggle("hidden");
})

resetButton.addEventListener("mouseleave", () =>{
    restartButtonBlack.classList.toggle("hidden");
    restartButtonBlue.classList.toggle("hidden");
})


updateTimerDisplay();

function updateTimerDisplay(){
    let timerElement = document.getElementById("timer");
 
    let secondsString = seconds.toString().padStart(2, '0');
    let minutesString = minutes.toString().padStart(2, '0');

    timerElement.textContent = `${minutesString}:${secondsString}`;
}

function updateStatusDisplay(){
    let workingActive;
    let breakActive;
    switch(currentState){
        case WORKING_STATE:
            workingActive = true;
            breakActive = false;
            break;
        case BREAK_STATE:
            workingActive = false;
            breakActive = true;
            break;
        default:
            workingActive = false;
            breakActive = false;
    }

    makeStatusElementActive(workingStatus, workingActive);
    makeStatusElementActive(breakStatus, breakActive);

    console.log(workingStatus);
    console.log(breakStatus);
}

function makeStatusElementActive(element, active){
    if(active && ! element.classList.contains(active)){
        element.classList.add("active");
    }

    else if(! active && element.classList.remove("active")){
        element.classList.remove("active");
    }
}

function decrementTimer(){
    seconds--;
    if(seconds < 0){
        seconds += 60;
        minutes --;
    }
    updateTimerDisplay();

    if(seconds === 0 && minutes === 0){
        onTimeOut(); // Stops the countdown when it reaches 0
    }
}

function onTimeOut(){
    console.log("coucou");
    clearInterval(intervalID); // Stops the countdown

    currentState = (currentState + 1) % 2; // Toggle the current state
    updateStatusDisplay();

    startTimer();
}

function resetTimer(){
    clearInterval(intervalID);

    seconds = 0;
    minutes = WORKING_TIME;
    updateTimerDisplay();

    currentState = IDLE_STATE;
    updateStatusDisplay();

    toggleButtons();
}

function startTimersLoop(){
    currentState = WORKING_STATE;
    updateStatusDisplay();
    toggleButtons();
    startTimer();
}

function startTimer(){
    minutes = BREAK_TIME;
    seconds = 0;

    if(currentState == WORKING_STATE){
        minutes = WORKING_TIME - 1;
        seconds = 59;
    }

    updateTimerDisplay();

    intervalID = setInterval(() => decrementTimer(), INTERVAL);
}

function toggleButtons(){
    startButton.classList.toggle("hidden");
    resetButton.classList.toggle("hidden");
}