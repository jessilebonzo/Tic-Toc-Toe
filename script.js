const getCoordinates = (idx) => [ Math.floor(idx / 3), idx % 3 ]

const gameIO = (function(doc) {
  const TicTacToeGame = function() {
    let board = [
      ['', '', ''],
      ['', '', ''],
      ['', '', '']
    ];
  
    let winningStates = [
      [[0,0], [0, 1], [0, 2]],
      [[1,0], [1, 1], [1, 2]],
      [[2,0], [2, 1], [2, 2]],
      [[0,0], [1, 0], [2, 0]],
      [[0,1], [1, 1], [2, 1]],
      [[0,2], [1, 2], [2, 2]],
      [[0,0], [1, 1], [2, 2]],
      [[0,2], [1, 1], [2, 0]],
    ]
  
    const p1 = 'X'
    const p2 = 'O'
    let currentPlayer = p1
    let gameResult = ''

    const getCurrentPlayer = () => currentPlayer

    const updateGameState = (x, y) => {
      if (gameResult !== '' || board[x][y] !== '') {
        return
      }
      board[x][y] = currentPlayer
      validStates = []
  
      // check if any winning states satisfied
      for (const [a, b, c] of winningStates) {
       const cell1 = board[a[0]][a[1]]
       const cell2 = board[b[0]][b[1]]
       const cell3 = board[c[0]][c[1]]
   
       if (cell1 !== '' && cell2 !== '' && cell3 != '') {
         if (cell1 === cell2 && cell2 === cell3) {
           gameResult = currentPlayer
           break
         } else {
           continue
         }
       }
       validStates.push([a, b, c])
      }

      winningStates = validStates

      if (gameResult === '' && winningStates.length === 0) {
        gameResult = 'tie'
      } else {
        currentPlayer = currentPlayer === p1 ? p2 : p1
      }
      console.table(board)
      return gameResult
    }
  
    return {updateGameState, getCurrentPlayer}
  }

  let game = TicTacToeGame();
  const playerContainer = doc.querySelector('.player-container')
  const resultElem = doc.querySelector('.player-container > p')

  const cells = doc.querySelectorAll('.cell')
  cells.forEach((cell, i) => {
    cell.addEventListener('click', (e) => {
      if (doc.querySelector('input')) {
        alert('Submit Names and Press Start First')
        return
      }
      const player = game.getCurrentPlayer()
      let res = game.updateGameState(...getCoordinates(i))
      
      if (res !== undefined) {
        e.target.textContent = player
        if (res !== '') {
          if (res !== 'tie') {
            res = doc.querySelector(`#${res}`).textContent + ' Won!'
          }
          resultElem.textContent = res
        }
      }
    })
  })

  doc.querySelector('button').addEventListener('click', (e) => {
    const p1 = doc.querySelector('#X');
    const p2 = doc.querySelector('#O');

    const p1p = doc.createElement('p');
    p1p.id = 'X'
    const p2p = doc.createElement('p');
    p2p.id = 'O'

    p1p.textContent = p1.value;
    p2p.textContent = p2.value;

    p1.remove()
    p2.remove()

    playerContainer.insertBefore(p2p, playerContainer.children[2]);
    playerContainer.insertBefore(p1p, playerContainer.children[1]);

    const resetButton = doc.createElement('button');
    resetButton.textContent = 'Restart';
    resetButton.addEventListener('click', () => {
      game = TicTacToeGame()
      cells.forEach(cell => {cell.textContent = ''})
      resultElem.textContent = ''
    })
    playerContainer.insertBefore(resetButton, playerContainer.children[4]);
    
    e.target.remove()

  })

})(document)