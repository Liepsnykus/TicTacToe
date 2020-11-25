const gameBoard = document.getElementById ('gameBoard')
const newGame = document.getElementById('newGame')
const p1Score = document.getElementById ('p1Score')
const p2Score = document.getElementById ('p2Score')
const redW = document.getElementById ('redW')
const blueW = document.getElementById ('blueW')
const resetGame = document.getElementById ('resetGame')
const drawG = document.getElementById ('drawG')

let player1ScoreCounter = 0
let player2ScoreCounter = 0

let playTriger = true
let player1Scores = []
let player2Scores = []
let gameTriger = true
let moves = 9
let gotWinner = false

let conditions = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    ['7', '4', '1'],
    ['8', '5', '2'],
    ['9', '6', '3'],
    ['1', '5', '9'],
    ['7', '5', '3']
]
function checkGame() {


    if( !gotWinner && moves == 0 ) {
        draw()
        setTimeout(startOver,2000)
    }      
}

function checkWinner() {
    
    conditions.map ( item => {
        if (player1Scores.includes(item[0]) && player1Scores.includes(item[1]) && player1Scores.includes(item[2])) {
            redWins()
            setTimeout(startOver,2000)
        } 
        if (player2Scores.includes(item[0]) && player2Scores.includes(item[1]) && player2Scores.includes(item[2])) {
            blueWins()
            setTimeout(startOver,2000)
        }
    })
    displayScores()
    checkGame()
}

function redWins () {
    player1ScoreCounter++
    redW.style.display = 'block'
    setTimeout(function () {redW.style.display = 'none'},2000)
    gameTriger = false
    setTimeout(function(){gameTriger = true}, 2000)
    gotWinner = true
}
function blueWins () {
    player2ScoreCounter++
    blueW.style.display = 'block'
    setTimeout(function () {blueW.style.display = 'none'},2000)
    gameTriger = false
    setTimeout(function(){gameTriger = true}, 2000)
    gotWinner = true
}

function draw() {
    drawG.style.display = 'block'
    setTimeout(function () {drawG.style.display = 'none'},2000)
    gameTriger = false
    setTimeout(function(){gameTriger = true}, 2000)
}

function playGame(event) {
    if(gameTriger){
        moves--
      let roundlet = document.createElement ('div')
        playTriger? roundlet.classList.add('redRoundlet') : roundlet.classList.add('blueRoundlet')
        event.target.appendChild(roundlet)
        event.target.removeEventListener('click', playGame)
        playTriger ? player1Scores.push(event.target.id) : player2Scores.push(event.target.id)
        playTriger = !playTriger
        console.log("player1" + player1Scores);
        console.log("player2" + player2Scores);
        

        checkWinner()
    }
    
}

function displayScores() {
    p1Score.innerText = `Score: ${player1ScoreCounter}`
    p2Score.innerText = `Score: ${player2ScoreCounter}`
}


function createTable() {
    for (let x = 0; x < 9; x++) {
        let item = document.createElement ('div')
        item.classList.add('part')
        item.setAttribute('id', x+1)
        gameBoard.appendChild(item)
        item.addEventListener('click', playGame)
    }
    moves = 9

}

createTable()

function startOver() {
    gameBoard.innerHTML = ''
    playTriger = true
    createTable()
    player1Scores = []
    player2Scores = []
    gotWinner = false
}

function reset() {
    gameBoard.innerHTML = ''
    startOver()
    player1ScoreCounter = 0
    player2ScoreCounter = 0
    displayScores()
}

newGame.addEventListener('click', startOver)
resetGame.addEventListener ('click', reset)