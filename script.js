// GAME

let playerScore = 0
let computerScore = 0
let roundWinner = ''

function playRound(playerSelection, computerSelection) {
  if (playerSelection === computerSelection) {
    roundWinner = 'empatado'
  }
  if (
    (playerSelection === 'Rocha' && computerSelection === 'Tesoura') ||
    (playerSelection === 'Tesoura' && computerSelection === 'Papel') ||
    (playerSelection === 'Papel' && computerSelection === 'Rocha')
  ) {
    playerScore++
    roundWinner = 'Jogador'
  }
  if (
    (computerSelection === 'Rocha' && playerSelection === 'Tesoura') ||
    (computerSelection === 'Tesoura' && playerSelection === 'Papel') ||
    (computerSelection === 'Papel' && playerSelection === 'Rocha')
  ) {
    computerScore++
    roundWinner = 'Computador'
  }
  updateScoreMessage(roundWinner, playerSelection, computerSelection)
}

function getRandomChoice() {
  let randomNumber = Math.floor(Math.random() * 3)
  switch (randomNumber) {
    case 0:
      return 'Rocha'
    case 1:
      return 'Papel'
    case 2:
      return 'Tesoura'
  }
}

function isGameOver() {
  return playerScore === 5 || computerScore === 5
}

// UI

const scoreInfo = document.getElementById('scoreInfo')
const scoreMessage = document.getElementById('scoreMessage')
const playerScorePara = document.getElementById('playerScore')
const computerScorePara = document.getElementById('computerScore')
const playerSign = document.getElementById('playerSign')
const computerSign = document.getElementById('computerSign')
const rockBtn = document.getElementById('rockBtn')
const paperBtn = document.getElementById('paperBtn')
const scissorsBtn = document.getElementById('scissorsBtn')
const endgameModal = document.getElementById('endgameModal')
const endgameMsg = document.getElementById('endgameMsg')
const overlay = document.getElementById('overlay')
const restartBtn = document.getElementById('restartBtn')

rockBtn.addEventListener('click', () => handleClick('Rocha'))
paperBtn.addEventListener('click', () => handleClick('Papel'))
scissorsBtn.addEventListener('click', () => handleClick('Tesoura'))
restartBtn.addEventListener('click', restartGame)
overlay.addEventListener('click', closeEndgameModal)

function handleClick(playerSelection) {
  if (isGameOver()) {
    openEndgameModal()
    return
  }

  const computerSelection = getRandomChoice()
  playRound(playerSelection, computerSelection)
  updateChoices(playerSelection, computerSelection)
  updateScore()

  if (isGameOver()) {
    openEndgameModal()
    setFinalMessage()
  }
}

function updateChoices(playerSelection, computerSelection) {
  switch (playerSelection) {
    case 'Rocha':
      playerSign.textContent = '✊'
      break
    case 'Papel':
      playerSign.textContent = '✋'
      break
    case 'Tesoura':
      playerSign.textContent = '✌'
      break
  }

  switch (computerSelection) {
    case 'Rocha':
      computerSign.textContent = '✊'
      break
    case 'Papel':
      computerSign.textContent = '✋'
      break
    case 'Tesoura':
      computerSign.textContent = '✌'
      break
  }
}

function updateScore() {
  if (roundWinner === 'empatado') {
    scoreInfo.textContent = "Está empatado!"
  } else if (roundWinner === 'Jogador') {
    scoreInfo.textContent = 'Ganhou!!'
  } else if (roundWinner === 'Computador') {
    scoreInfo.textContent = 'Perdeu!'
  }

  playerScorePara.textContent = `Jogador: ${playerScore}`
  computerScorePara.textContent = `Computador: ${computerScore}`
}

function updateScoreMessage(winner, playerSelection, computerSelection) {
  if (winner === 'Jogador') {
    scoreMessage.textContent = `${capitalizeFirstLetter(
      playerSelection
    )} ganha ${computerSelection.toLowerCase()}`
    return
  }
  if (winner === 'Computador') {
    scoreMessage.textContent = `${capitalizeFirstLetter(
      playerSelection
    )} ganha a  ${computerSelection.toLowerCase()}`
    return
  }

  scoreMessage.textContent = `${capitalizeFirstLetter(
    playerSelection
  )} empata com ${computerSelection.toLowerCase()}`
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
}

function openEndgameModal() {
  endgameModal.classList.add('active')
  overlay.classList.add('active')
}

function closeEndgameModal() {
  endgameModal.classList.remove('active')
  overlay.classList.remove('active')
}

function setFinalMessage() {
  return playerScore > computerScore
    ? (endgameMsg.textContent = 'Ganhou!')
    : (endgameMsg.textContent = 'Perdeu...')
}

function restartGame() {
  playerScore = 0
  computerScore = 0
  scoreInfo.textContent = 'Escolha entre pedra, papel ou tesoura'
  scoreMessage.textContent = 'O primeiro a chegar aos 5 pontos ganha o jogo'
  playerScorePara.textContent = 'Jogador: 0'
  computerScorePara.textContent = 'Computador: 0'
  playerSign.textContent = '❔'
  computerSign.textContent = '❔'
  endgameModal.classList.remove('active')
  overlay.classList.remove('active')
}
