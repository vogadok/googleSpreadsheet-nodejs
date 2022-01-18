const timerOutput = document.querySelector(".timer-output");

// Add start & stop time functionality to buttons
document.querySelector(".start-timer").addEventListener("click", startTimer);

document.querySelector(".stop-timer").addEventListener("click", stopTimer);

// document.querySelector(".reset-timer").addEventListener("click", () => {
//   stopTimer();
//   timerOutput.innerHTML = "00:00";
//   timerOutput.classList.remove("bg-danger");
//   timerOutput.style.backgroundColor = "darkseagreen";
// });

// Timer functions
let sec = 0;
let min = 0;
let timer;
let timeRunning = false;

// start the timer
function startTimer() {
  if (timeRunning == false) {
    timer = setInterval(insertTime, 1000);
    timeRunning = true;

    // code for styling (ignore)
    timerOutput.classList.add("bg-success");
  } else {
    return;
  }
}

// stop the timer
function stopTimer() {
  clearInterval(timer);
  sec = 0;
  min = 0;
  timeRunning = false;

  // code for styling (ignore)
  timerOutput.classList.remove("bg-success");
  timerOutput.classList.add("bg-danger");
}

// insert time into time output html
function insertTime() {
  sec++;

  if (sec < 10) {
    sec = `0${sec}`;
  }

  if (sec >= 60) {
    min++;
    sec = "00";
  }

  // display time
  timerOutput.innerHTML = "0" + min + ":" + sec;
}
