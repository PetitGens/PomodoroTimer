let seconds = 0;
let minutes = 25;

let startButton = document.getElementById("startButton");

startButton.addEventListener("click", () => startTimer(25));

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
        clearInterval(); // Stops the countdown when it reaches 0
    }
}

function startTimer(duration){
    minutes = duration - 1;
    seconds = 59;
    updateTimerDisplay();

    setInterval(() => decrementTimer(), 1000);
}