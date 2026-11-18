
const display = document.getElementById("display");

const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const lapBtn = document.getElementById("lapBtn");
const resetBtn = document.getElementById("resetBtn");

const lapsList = document.getElementById("lapsList");

let startTime = 0;
let elapsedTime = 0;
let timerInterval = null;
let running = false;

let lapCount = 0;
let lastLapTime = 0;

// Format stopwatch time
function formatTime(time) {
    let hours = Math.floor(time / 3600000);
    let minutes = Math.floor((time % 3600000) / 60000);
    let seconds = Math.floor((time % 60000) / 1000);
    let milliseconds = Math.floor((time % 1000) / 10);

    return (
        String(hours).padStart(2, "0") + ":" +
        String(minutes).padStart(2, "0") + ":" +
        String(seconds).padStart(2, "0") + "." +
        String(milliseconds).padStart(2, "0")
    );
}

// Get current elapsed time
function getCurrentTime() {
    return elapsedTime +
        (running ? performance.now() - startTime : 0);
}

// Update display
function updateDisplay() {
    display.textContent = formatTime(getCurrentTime());
}

// Start stopwatch
startBtn.addEventListener("click", function() {
    if (!running) {
        startTime = performance.now();
        running = true;

        timerInterval = setInterval(updateDisplay, 10);
    }
});

// Pause stopwatch
pauseBtn.addEventListener("click", function() {
    if (running) {
        elapsedTime = getCurrentTime();
        running = false;

        clearInterval(timerInterval);
        updateDisplay();
    }
});

// Record lap time
lapBtn.addEventListener("click", function() {

    if (!running) {
        alert("Please start the stopwatch before recording a lap!");
        return;
    }

    const currentTime = getCurrentTime();

    // Calculate individual lap duration
    const lapDuration = currentTime - lastLapTime;

    lapCount++;

    // Remove empty message
    const emptyMessage = lapsList.querySelector(".empty");

    if (emptyMessage) {
        emptyMessage.remove();
    }

    // Create lap record
    const li = document.createElement("li");

    const lapNumber = document.createElement("span");
    lapNumber.textContent = "Lap " + lapCount;

    const lapTime = document.createElement("span");
    lapTime.textContent = formatTime(lapDuration);

    const totalTime = document.createElement("span");
    totalTime.textContent = formatTime(currentTime);

    // Add lap information
    li.appendChild(lapNumber);
    li.appendChild(lapTime);
    li.appendChild(totalTime);

    // Show newest lap first
    lapsList.prepend(li);

    // Update previous lap time
    lastLapTime = currentTime;

});

// Reset stopwatch
resetBtn.addEventListener("click", function() {

    clearInterval(timerInterval);

    running = false;
    startTime = 0;
    elapsedTime = 0;
    lapCount = 0;
    lastLapTime = 0;

    display.textContent = "00:00:00.00";

    lapsList.innerHTML =
        '<li class="empty">No laps recorded yet</li>';

});
