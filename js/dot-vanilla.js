var moving;
var startButton = document.querySelector('#run');
var stopButton = document.querySelector('#stop');
var board = document.querySelector('.board');
var squares = document.querySelectorAll('.board .square');
var log = document.querySelector('.log tbody');

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
        stop();
        start();
    }
    if (e.target.classList.contains('square')) {        
        move(e.target);
    }
});

function move(target) {
    var piece = document.querySelector('.square.piece');
    var target = target ? target : piece.nextElementSibling;
    if (target) {        
        piece.classList.remove('piece');
        target.classList.add('piece');
        logMessage('moved');
    } else {
        logMessage('end reached');
        return;
    }
};

function start() {    
    moving = setInterval(function() {
        move();        
    }, 1000);
    logMessage('timer started');
};

function stop() {    
    clearInterval(moving);
    moving = null;
    logMessage('timer cleared');
};

function logMessage(message) {
    console.log(message);
    logMsg = document.createElement('tr');
    logMsgTD = document.createElement('td');
    logMsgTD.textContent = message;
    logMsg.appendChild(logMsgTD);
    log.insertBefore(logMsg, log.childNodes[0]);
}