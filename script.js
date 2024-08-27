// Variáveis globais
const startBtn = document.getElementById('start')
const result = document.getElementById('result')
const regions = document.querySelectorAll('.region')
const switchBtn = document.getElementById('switch-btn')
const root = document.querySelector(':root')

let turnPlayer = ''
let vBoard = []

// Inicialização do Game -> reset
function initializeGame(){
  vBoard = [['', '', ''], ['', '', ''], ['', '', '']]
  turnPlayer = 'player1'

  document.querySelector('h2').innerHTML = 'Vez de: <span id="turn-player"></span>'
  startBtn.innerText = 'COMEÇAR!'
  startBtn.classList.remove('restart')
  startBtn.classList.remove('draw')
  updateTitle()
  regions.forEach((region) => {
      region.classList.remove('winner')
      region.innerText = ''
      region.addEventListener('click', handleBoardClick)
  })
}

// Declaração de regiões de vitória
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

// Atualiza elemento html e jogador da vez 
function updateTitle(){
    const playerInput = document.getElementById(turnPlayer)
    document.getElementById('turn-player').innerText = playerInput.value
}

// Adiciona estilização e declaração de jogador vencedor
function handleWin(regions){
    regions.forEach((region) => {
        document.querySelector(`[data-region="${region}"]`).classList.add('winner')
    })
    const playerName = document.getElementById(turnPlayer).value
    document.querySelector('h2').innerHTML = `${playerName} venceu!`
    startBtn.innerText = 'RECOMEÇAR'
    startBtn.classList.add('restart')
}

// Adiciona estilização e declaração de empate
function handleDraw(){
  document.querySelector('h2').innerHTML = 'Empate!'
  startBtn.innerText = "RECOMEÇAR"
  startBtn.classList.add('draw')
}

// Desabilita região de Jogo após clique
function disableRegion(element){
    element.style.cursor = 'default'
    element.removeEventListener('click', handleBoardClick)
}

// Adiciona evento de clique em região de jogo, de acordo com o jogador
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
    handleDraw()
  }
}

// Adiciona evento de troca de tema entre claro e escuro no html
function switchTheme(ev) {
  const theme = ev.currentTarget.dataset.theme;

  if (theme === 'light') {
      root.style.setProperty('--background-color', '#2b2b2b');
      root.style.setProperty('--color', '#b5b5b5');
      root.style.setProperty('--input', '#4e4e4e');
      root.style.setProperty('--region', '#ff9500');
      root.style.setProperty('--draw', '#ff5700');
      root.style.setProperty('--win', 'rgb(0, 150, 0)');

      ev.currentTarget.dataset.theme = 'dark';
      ev.currentTarget.innerText = 'Tema Claro';
  } else {
      root.style.setProperty('--background-color', '#65451F');
      root.style.setProperty('--color', '#EAC696');
      root.style.setProperty('--input', '#C8AE7D');
      root.style.setProperty('--region', '#ffae00');
      root.style.setProperty('--draw', '#ff7300');
      root.style.setProperty('--win', 'rgb(0, 192, 0)');

      ev.currentTarget.dataset.theme = 'light';
      ev.currentTarget.innerText = 'Tema Escuro';
  }
}

// Adiciona eventos principais do jogo para execução
switchBtn.addEventListener('click', switchTheme);
startBtn.addEventListener('click', initializeGame)