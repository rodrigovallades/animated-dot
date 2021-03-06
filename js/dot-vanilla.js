var moving;
var startButton = document.querySelector('#run');
var stopButton = document.querySelector('#stop');
var board = document.querySelector('.board');
var squares = document.querySelectorAll('.board .square');

// binding events to the page elements
startButton.addEventListener('click', function(e) {    
    if (!moving) {
        start();
        move();
    }
});

stopButton.addEventListener('click', function(e) {
    stop();
});

board.addEventListener('click', function(e) {
    if (moving) {
        // if the timer is active, reset it
        stop();
        // start it again
        start();
    }
    if (e.target.classList.contains('square')) {        
        move(e.target);
    }
});

// this function just moves to the next square, but if you provide a target square, it uses it instead
function move(target) {
    var piece = document.querySelector('.square.piece');
    // if target is provided, use it. If not, move to the next square
    var target = target ? target : piece.nextElementSibling;
    // if the target is null, it means there is no next square. We reached the end of the animation
    if (target) {        
        piece.classList.remove('piece');
        target.classList.add('piece');
        logMessage('moved');
    } else {
        logMessage('end reached');
        return;
    }
};

// starts moving the dot and triggers a 1 second timer
function start() {    
    moving = setInterval(function() {
        move();        
    }, 1000);
    logMessage('timer started');
};

// stops the timer
function stop() {    
    clearInterval(moving);
    moving = null;
    logMessage('timer cleared');
};

// logs message to the screen and console
function logMessage(message) {
    console.log(message);
    logMsg = document.createElement('tr');
    logMsgTD = document.createElement('td');
    logMsgTD.textContent = message;
    logMsg.appendChild(logMsgTD);
    debug.insertBefore(logMsg, debug.childNodes[0]);
}

(function(global) {
    var debug = document.querySelector('.debug tbody');
    
    // logs message to the screen and console
    function logMessage(message) {
        console.log(message);
        logMsg = document.createElement('tr');
        logMsgTD = document.createElement('td');
        logMsgTD.textContent = message;
        logMsg.appendChild(logMsgTD);
        debug.insertBefore(logMsg, debug.childNodes[0]);
    }
    // Exposing the function to the global object ('window' passed in the IIFE)
    global.logMessage = logMessage;
}(window));