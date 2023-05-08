let computerMove = '';

let score = JSON.parse(localStorage.getItem('score'));
let result = JSON.parse(localStorage.getItem('result'));
let moves = JSON.parse(localStorage.getItem('moves'));

if (score === null) {
  score = {
    wins: 0,
    losses: 0,
    ties: 0
  }
}
if (result === null) result = '';
if (moves === null) moves = '';

//console.log(score);
//console.log(result);

updateElements();

document.body.addEventListener('keydown', (event) => {
  if (event.key === 'r') {
    playGame('rock');
  } else if (event.key === 'p') {
    playGame('paper');
  } else if (event.key === 's') {
    playGame('scissors');
  }
});

function playGame(playerPick) {
  const computerMove = pickComputerMove();
  moves = `You <img src="images/${playerPick}-emoji.png" class="move-icon"> <img src="images/${computerMove}-emoji.png" class="move-icon"> Computer`;
  document.querySelector('.js-moves').innerHTML = moves;
    

  
  if(playerPick === 'paper') {
    if (computerMove === 'paper') result = `It's a tie!`;
    else if (computerMove === 'scissors') result = 'You lose :(';
    else if (computerMove === 'rock') result = 'You win :)';
  } else if (playerPick === 'rock') {
      if (computerMove === 'rock') result = `It's a tie!`;
      else if (computerMove === 'paper') result = 'You lose :(';
      else if (computerMove === 'scissors') result = 'You win :)';
  } else if(playerPick === 'scissors') {
      if (computerMove === 'scissors') result = `It's a tie!`;
      else if (computerMove === 'rock') result = 'You lose :(';
      else if (computerMove === 'paper') result = 'You win :)';
  }
  
  document.querySelector('.js-result').innerHTML = result;
  


  if (result === `It's a tie!`) {
    score.ties += 1;
  } else if (result === 'You lose :(') {
    score.losses += 1;
  } else if (result === 'You win :)') {
    score.wins += 1;
  }

  localStorage.setItem('score', JSON.stringify(score));
  localStorage.setItem('result', JSON.stringify(result));
  localStorage.setItem('moves', JSON.stringify(moves));

  updateElements();

  
}

function updateElements() {
  document.querySelector('.js-score').innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
  document.querySelector('.js-result').innerHTML = result;
  document.querySelector('.js-moves').innerHTML = moves;
}

function pickComputerMove() {
  const randomNumber = Math.random();
  
  
  if (randomNumber >= 0 && randomNumber <= 1/3) {
    computerMove = 'rock';
  } else if (randomNumber >= 1/3 && randomNumber <= 2/3) {
    computerMove = 'paper';
  } else if (randomNumber >= 2/3 && randomNumber <= 1) {
    computerMove = 'scissors';
  }
  return computerMove;
}

let isAutoPlaying = false;
let intervalId;

function autoPlay() {
  if(!isAutoPlaying) {
    intervalId = setInterval(function() {
      const playerMove = pickComputerMove();
      playGame(playerMove);
    }, 1000);
    isAutoPlaying = true;
  } else {
    clearInterval(intervalId);
    isAutoPlaying = false;
  }
}