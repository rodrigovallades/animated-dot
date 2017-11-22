var moving;

$(document).on('click', function(e){
    
    // run
    if (e.target.id.toLowerCase() == 'run' && !moving) {
        start();
        move();
    }

    // stop
    if (e.target.id.toLowerCase() == 'stop') {
        stop();
    }

    // move to target
    if ($(e.target).hasClass('square')) {
        if (moving) {
            // if the timer is active, reset it
            stop();
            // start it again
            start();
        }
        move(e.target);
    }
});

// this function just moves to the next square, but if you provide a target square, it uses it instead
function move(target) {
    // if target is provided, use it. If not, move to the next square
    var target = target ? target : $('.square.piece').next('.square');
    // if the target is not provided or there is no next square, we reached the end of the animation
    if (target.length || target.outerHTML) {
        $('.square.piece').removeClass('piece');
        $(target).addClass('piece');         
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
    $('.log tbody').prepend('<tr><td>' + message + '</td></tr>')
}