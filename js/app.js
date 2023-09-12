let seconds = 0;
let minutes = 25;

decrementTimer();
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
}