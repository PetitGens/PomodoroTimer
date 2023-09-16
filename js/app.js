const WORKING_TIME = 25;
const BREAK_TIME = 5;

const DEBUGGING = true;

const INTERVAL = DEBUGGING ? 1 : 1000; // Should be 1000 if not debugging

const WORKING_STATE = 0;
const BREAK_STATE = 1;

let seconds = 0;
let minutes = WORKING_TIME;

let intervalID;

let currentState = WORKING_STATE;

let startButton = document.getElementById("startButton");
let resetButton = document.getElementById("resetButton");
resetButton.classList.add("hidden");

startButton.addEventListener("click", startTimersLoop);
resetButton.addEventListener("click", resetTimer);

updateTimerDisplay();

function updateTimerDisplay(){
    let timerElement = document.getElementById("timer");
 
    let secondsString = seconds.toString().padStart(2, '0');
    let minutesString = minutes.toString().padStart(2, '0');

    timerElement.textContent = `${minutesString}:${secondsString}`;
}

function decrementTimer(){
    seconds--;
    if(seconds < 0){
        seconds += 60;
        minutes --;
    }
    updateTimerDisplay();

    if(seconds == 0 && minutes == 0){
        onTimeOut(); // Stops the countdown when it reaches 0
    }
}

function onTimeOut(){
    console.log("coucou");
    clearInterval(intervalID); // Stops the countdown

    currentState = (currentState + 1) % 2; // Toggle the current state

    startTimer();
}

function resetTimer(){
    clearInterval(intervalID);

    seconds = 0;
    minutes = WORKING_TIME;
    updateTimerDisplay();

    currentState = WORKING_STATE;

    toggleButtons();
}

function startTimersLoop(){
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