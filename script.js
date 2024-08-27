const startBtn = document.getElementById('start')
const result = document.getElementById('result')
const regions = document.querySelectorAll('.region')

let turnPlayer = ''
let vBoard = []

function initializeGame(){
    vBoard = [['', '', ''], ['', '', ''], ['', '', '']]
    turnPlayer = 'player1'

    document.querySelector('h2').innerHTML = 'Vez de: <span id="turn-player"></span>'
    startBtn.innerText = 'COMEÇAR!'
    startBtn.classList.remove('restart')
    updateTitle()
    regions.forEach((region) => {
        region.classList.remove('winner')
        region.innerText = ''
        region.addEventListener('click', handleBoardClick)
    })
}

function getWinRegions() {
    const winRegions = []
    if (vBoard[0][0] && vBoard[0][0] === vBoard[0][1] && vBoard[0][0] === vBoard[0][2])
      winRegions.push("0.0", "0.1", "0.2")
    if (vBoard[1][0] && vBoard[1][0] === vBoard[1][1] && vBoard[1][0] === vBoard[1][2])
      winRegions.push("1.0", "1.1", "1.2")
    if (vBoard[2][0] && vBoard[2][0] === vBoard[2][1] && vBoard[2][0] === vBoard[2][2])
      winRegions.push("2.0", "2.1", "2.2")
    if (vBoard[0][0] && vBoard[0][0] === vBoard[1][0] && vBoard[0][0] === vBoard[2][0])
      winRegions.push("0.0", "1.0", "2.0")
    if (vBoard[0][1] && vBoard[0][1] === vBoard[1][1] && vBoard[0][1] === vBoard[2][1])
      winRegions.push("0.1", "1.1", "2.1")
    if (vBoard[0][2] && vBoard[0][2] === vBoard[1][2] && vBoard[0][2] === vBoard[2][2])
      winRegions.push("0.2", "1.2", "2.2")
    if (vBoard[0][0] && vBoard[0][0] === vBoard[1][1] && vBoard[0][0] === vBoard[2][2])
      winRegions.push("0.0", "1.1", "2.2")
    if (vBoard[0][2] && vBoard[0][2] === vBoard[1][1] && vBoard[0][2] === vBoard[2][0])
      winRegions.push("0.2", "1.1", "2.0")
    return winRegions
  }

function updateTitle(){
    const playerInput = document.getElementById(turnPlayer)
    document.getElementById('turn-player').innerText = playerInput.value
}

function handleWin(regions){
    regions.forEach((region) => {
        document.querySelector(`[data-region="${region}"]`).classList.add('winner')
    })
    const playerName = document.getElementById(turnPlayer).value
    document.querySelector('h2').innerHTML = `${playerName} venceu!`
    startBtn.innerText = 'RECOMEÇAR'
    startBtn.classList.add('restart')
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
        ev.currentTarget.innerText = 'O'
        vBoard[row][column] = 'O'
    }

    console.clear()
    console.table(vBoard)
    disableRegion(ev.currentTarget)
    const winRegions = getWinRegions()
    if(winRegions.length > 0){
        handleWin(winRegions)
    } else if (vBoard.flat().includes('')){
        turnPlayer = turnPlayer === 'player1' ? 'player2' : 'player1'
        updateTitle()
    } else {
        document.querySelector('h2').innerHTML = 'Empate!'
    }
}

function disableRegion(element){
    element.style.cursor = 'default'
    element.removeEventListener('click', handleBoardClick)
}

startBtn.addEventListener('click', initializeGame)