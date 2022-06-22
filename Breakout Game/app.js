const container = document.querySelector('.container');
const block = document.createElement('div');
const ball = document.createElement('div');

block.classList.add('block');

container.appendChild(block);
container.appendChild(ball);

///////////////////////////////////////////////////

let speed = 1;
let blockSpeed = 16;
let directionRight; 
let directionUp = true
let directionOfBall = Math.floor(Math.random() * 2); //waarde tussen 0 en 1
if(directionOfBall) {
    directionRight = true
    console.log(directionOfBall); //output: 1
} else {
    directionRight = false 
    //console.log(directionOfBall); //output: 0
} 

///////////////////////////////////////////////////

// TARGETS

const targets = () => {
    let leftSide = 1;
    let topSide = 1;

    let a = 1
    while(a <= 27) { //rijen: 3, kolommen: 9
        let target = document.createElement('div')
        target.classList.add('targets');
        container.appendChild(target);
        target.style.left = 10 + leftSide + 'px'; //verschuiving van links
        target.style.top = 30 + topSide + 'px'; //verschuiving van top
        target.style.backgroundColor = ''; //achtergrond toevoegen van de targets
        leftSide += 42; // targets bij creëren met waarde van 42 (de spaties er tussen)
        if(a % 9 === 0) { // als de rest gelijk is aan 0
            leftSide = 1
            topSide += 30 // spatie tussen de targets
        }
        a++
    }
};
targets();

///////////////////////////////////////////////////

// VERANDERINGEN

// variabelen van veranderingen
let blockWidth;
let blockTop;
let blockRight;
let blockBottom;
let blockLeft;

let ballWidth;
let ballTop;
let ballRight;
let ballBottom;
let ballLeft;

let containerWidth;
let containerHeight;
let containerTop;
let containerRight;
let containerBottom;
let containerLeft;

// veranderingen van de block
blockWidth = parseInt(window.getComputedStyle(block).getPropertyValue('width'));
blockTop = parseInt(window.getComputedStyle(block).getPropertyValue('top'));
blockRight = parseInt(window.getComputedStyle(block).getPropertyValue('right'));
blockBottom = parseInt(window.getComputedStyle(block).getPropertyValue('bottom'));
blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue('left'));
// veranderingen van de bal
ballWidth = parseInt(window.getComputedStyle(ball).getPropertyValue('width'));
ballTop = parseInt(window.getComputedStyle(ball).getPropertyValue('top'));
ballRight = parseInt(window.getComputedStyle(ball).getPropertyValue('right'));
ballBottom = parseInt(window.getComputedStyle(ball).getPropertyValue('bottom'));
ballLeft = parseInt(window.getComputedStyle(ball).getPropertyValue('left'));
// veranderingen van de container
containerWidth = parseInt(window.getComputedStyle(container).getPropertyValue('width'));
containerHeight = parseInt(window.getComputedStyle(container).getPropertyValue('height'));
containerTop = parseInt(window.getComputedStyle(container).getPropertyValue('top'));
containerRight = parseInt(window.getComputedStyle(container).getPropertyValue('right'));
containerBottom = parseInt(window.getComputedStyle(container).getPropertyValue('bottom'));
containerLeft = parseInt(window.getComputedStyle(container).getPropertyValue('left'));

///////////////////////////////////////////////////

// STARTEN VAN DE GAME

let allTargets = document.querySelectorAll('.container .targets');

let game = () => {

    ball.classList.add('ball');
    targets();
    allTargets = document.querySelectorAll('.container .targets');
    let start = setInterval(() => {
        blockWidth = parseInt(window.getComputedStyle(block).getPropertyValue('width'));
        blockTop = parseInt(window.getComputedStyle(block).getPropertyValue('top'));
        blockRight = parseInt(window.getComputedStyle(block).getPropertyValue('right'));
        blockBottom = parseInt(window.getComputedStyle(block).getPropertyValue('bottom'));
        blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue('left'));

        ballWidth = parseInt(window.getComputedStyle(ball).getPropertyValue('width'));
        ballTop = parseInt(window.getComputedStyle(ball).getPropertyValue('top'));
        ballRight = parseInt(window.getComputedStyle(ball).getPropertyValue('right'));
        ballBottom = parseInt(window.getComputedStyle(ball).getPropertyValue('bottom'));
        ballLeft = parseInt(window.getComputedStyle(ball).getPropertyValue('left'));

        containerWidth = parseInt(window.getComputedStyle(container).getPropertyValue('width'));
        containerHeight = parseInt(window.getComputedStyle(container).getPropertyValue('height'));
        containerTop = parseInt(window.getComputedStyle(container).getPropertyValue('top'));
        containerRight = parseInt(window.getComputedStyle(container).getPropertyValue('right'));
        containerBottom = parseInt(window.getComputedStyle(container).getPropertyValue('bottom'));
        containerLeft = parseInt(window.getComputedStyle(container).getPropertyValue('left'));

        if(directionRight && directionUp) {
            ball.style.left = ballLeft + 1 * speed + 'px'; //om het te laten bewegen moet het in px
            ball.style.top = ballTop - 1 * speed + 'px'; // - is naar boven
        } else if(!directionRight && directionUp) {
            ball.style.left = ballLeft - 1 * speed + 'px'; 
            ball.style.top = ballTop - 1 * speed + 'px'; 
        } else if(directionRight && !directionUp) {
            ball.style.left = ballLeft + 1 * speed + 'px';
            ball.style.top = ballTop + 1 * speed + 'px'; // + is naar beneden
        } else if(!directionRight && !directionUp) {
            ball.style.left = ballLeft - 1 * speed + 'px';
            ball.style.top = ballTop + 1 * speed + 'px';
        }
    
        // Bal in container houden
        if(ballLeft < 0 + ballWidth / 2) {
            directionRight = true
        } else if(ballLeft >= containerWidth - ballWidth / 2) {
            directionRight = false
        } else if(ballTop < 0) {
            directionUp =  false;
            directionOfBall = Math.floor(Math.random() * 2); 
            if(directionOfBall) {
                directionRight = true
                console.log(directionOfBall);
            } else {
                directionRight = false 
            } 
        } else if(ballTop > containerHeight - ballWidth) {
            setTimeout(() => {
                initial()
            }, 600)
            clearInterval(start)
        } else if(ballTop > blockTop - ballWidth && ballLeft + blockWidth / 2 > blockLeft && ballRight > blockRight) {
            directionUp = true
            directionOfBall = Math.floor(Math.random() * 2);
            if(directionOfBall) {
                directionRight = true
                console.log(directionOfBall); 
            } else {
                directionRight = false 
            }  
        }
        blockCollition();
    }, 1);
};

///////////////////////////////////////////////////

// KEYS

let containerBounds = container.getBoundingClientRect(); // geeft de sizes en positie tov viewport van de container weer

window.addEventListener('keydown', (e) => {
  if(e.key === 'ArrowRight' && (blockLeft + blockWidth / 2 + blockSpeed < containerWidth)) {
        block.style.left = blockLeft + 1 * blockSpeed + 'px';
  } 
  if(e.key === 'ArrowLeft' && blockLeft > containerBounds.width / 6) {
    block.style.left = blockLeft - 1 * blockSpeed + 'px';
}
});

///////////////////////////////////////////////////

// HERSTART GAME

const initial = () => {
    let allTargets = document.querySelectorAll('.container .targets')
    allTargets.forEach(item => item.remove())
    ball.style.left = '50%' //zodat bamm gecentreerd staat
    ball.style.top = '579px' // 579px naar beneden schuiven op y as tot balletje op block staat.
    block.style.left = '50%' // zodat block gecentreerd staat
    setTimeout(() => {
        game()
    }, 800)
};

///////////////////////////////////////////////////

// COLLITION

const blockCollition = () => {
    allTargets = document.querySelectorAll('.container .targets')
    
    let a = 0
    while(a < allTargets.length) {
        let blockBounds = allTargets[a].getBoundingClientRect();
        let ballBounds = ball.getBoundingClientRect();
        if(ballBounds.top <= blockBounds.bottom && ballBounds.left >= blockBounds.left && ballBounds.right <= blockBounds.right) {
            container.removeChild(allTargets[a])
            up = false
            directionOfBall = Math.floor(Math.random() * 2); 
            if(directionOfBall) {
                directionRight = true
                console.log(directionOfBall); 
            } else {
                directionRight = false 
            } 
        }
        a++;
    }
    if(allTargets.length === 0) {
        setTimeout(() => {
            speed += 1;
            initial();
        },800)
        clearInterval(start);
    }   
};
game();