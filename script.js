let score= JSON.parse(localStorage.getItem('score')) || {wins:0, loses:0, ties:0};

    updateScoreElement(); 

    let isAutoPlaying = false;
    let intervalId;

function autoPlay(){
    if (!isAutoPlaying ){
    intervalId= setInterval(() => {
        const playerMove=pickComputerMove();
        playGame(playerMove)}, 1000) ;
        isAutoPlaying=true;
        document.querySelector('.auto-play-button').textContent='Stop Auto Play';
    } else { 
        clearInterval(intervalId);
        isAutoPlaying=false;
        document.querySelector('.auto-play-button').textContent='Auto Play';
        
    }
}

function placeAMove(movement){
        let element=''
    if(movement === 'Rock'){
        element='.js-rock-button'
    } else if (movement === 'Paper'){
        element='.js-paper-button'
    } else if(movement === 'Scissors'){
        element= '.js-scissors-button'
    }
    document.querySelector(element).addEventListener('click', () => {
        playGame(movement) });
}
placeAMove('Rock');
placeAMove('Paper');
placeAMove('Scissors');

document.body.addEventListener('keydown', (event) => {
    if(event.key === 'r'){
        playGame('Rock')
    } else if (event.key === 'p'){
        playGame('Paper')
    } else if (event.key === 's'){
        playGame('Scissors')
    }
})

function playGame(playerMove){
    computerMove=pickComputerMove();

    let result='';
    
    if(playerMove==='Scissors'){
        if (computerMove ==='Rock'){
            result='You lose🚫'
        } else if(computerMove === 'Paper'){
            result='You win🎉'
        } else if (computerMove === 'Scissors'){
            result='Tie.'}
    
    } else if (playerMove==='Paper'){
        
        if (computerMove ==='Rock'){
            result='You win🎉'
        } else if(computerMove === 'Paper'){
            result='Tie.'
        } else if (computerMove === 'Scissors'){
            result='You lose🚫'}
    
    } else if(playerMove==='Rock'){
        
        if(computerMove ==='Rock'){
            result='Tie.';
        } else if(computerMove ==='Paper'){
            result='You lose🚫';
        } else if (computerMove ==='Scissors'){
            result='You win🎉'}
    }

    if (result === 'You win🎉'){
        score.wins+=1;
    } else if(result === 'You lose🚫'){
        score.loses+=1;
    } else if(result === 'Tie.'){
        score.ties+=1;
    }

    localStorage.setItem('score', JSON.stringify(score));

    updateScoreElement();
    
    document.querySelector('.js-result').innerHTML= result;
    document.querySelector('.js-moves').innerHTML = 
    `
    <p class="player-move"><i class="ri-user-line"></i>Player's move is <b> ${playerMove} </b></p>
    <p class="computer-move"><i class="ri-computer-line"></i>Computer's move is <b> ${computerMove} </b></p>
    `
}

function updateScoreElement(){
    document.querySelector('.js-score')
    .innerHTML = `Wins: ${score.wins}, Loses: ${score.loses}, Ties: ${score.ties}`;
}


function pickComputerMove(){
    let computerMove='';
    randomNumber=Math.random();
    
    if(randomNumber >=0 && randomNumber < 1/3){
    computerMove='Rock';
    } else if(randomNumber >= 1/3 && randomNumber < 2/3){
    computerMove='Paper';
    } else if(randomNumber >= 2/3 && randomNumber <1){
    computerMove= 'Scissors';
    }
    return computerMove;
}

document.querySelector('.reset-score-button').addEventListener('click', () => {
    score.wins = 0;
    score.loses = 0;
    score.ties = 0;
    localStorage.removeItem('score');
    updateScoreElement();
    
    document.querySelector('.js-moves').innerHTML = "";
    document.querySelector('.js-result').innerHTML= "";
    updateScoreElement();
})