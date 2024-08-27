const startBtn = document.getElementById('start')
const result = document.getElementById('result')
const regions = document.querySelectorAll('.region')

let turnPlayer = ''
let vBoard = []

function initializeGame(){
    vBoard = [['', '', ''], ['', '', ''], ['', '', '']]
    turnPlayer = 'player1'

    document.querySelector('h2').innerHTML = 'Vez de: <span id="turn-player"></span>'
    updateTitle()
    regions.forEach((region) => {
        region.classList.remove('winner')
        region.innerText = ''
        region.addEventListener('click', handleBoardClick)
    })
}

function updateTitle(){
    const playerInput = document.getElementById(turnPlayer)
    document.getElementById('turn-player').innerText = playerInput.value
}

function handleBoardClick(ev){
    const region = ev.currentTarget.dataset.region
    const rowColumnPair = region.split('.')
    const row = rowColumnPair[0]
    const column = rowColumnPair[1]

    if(turnPlayer === 'player1'){
        ev.currentTarget.innerText = 'X'
        vBoard[row][column] = 'X'
    } else {
        ev.currentTarget.innerText = 'X'
        vBoard[row][column] = 'X'
    }

    console.clear()
    console.table(vBoard)
}

startBtn.addEventListener('click', initializeGame)