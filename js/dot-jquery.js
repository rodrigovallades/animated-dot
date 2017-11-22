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
            stop();        
            start();
        }
        move(e.target);
    }
});

function move(target) {
    var target = target ? target : $('.square.piece').next('.square');
    if (target.length || target.outerHTML) {
        $('.square.piece').removeClass('piece');
        $(target).addClass('piece');         
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
    $('.log tbody').prepend('<tr><td>' + message + '</td></tr>')
}