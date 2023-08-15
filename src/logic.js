const createBoard = (rows, columns) => {
    return Array(rows).fill(0).map((_,row) => {
        return Array(columns).fill(0).map((_, column) => { // cria matriz e seta os objetos pra cada indice
            return {
                row,
                column,
                opened: false,
                flagged: false,
                mined: false,
                exploded: false,
                nearMines: 0
            }
        })
    })
}

const spreadMines = (board, minesAmount) => { // funcao para selecionar aleatoriamente as minas
    const rows = board.length
    const columns = board[0].length
    let minesPlanted = 0
    while (minesPlanted < minesAmount) {
        const rowSel = parseInt(Math.random() * rows, 10) //seleciona aleatoriamente uma linha -- o 10 eh pra selecionar a base decimal
        const columnSel = parseInt(Math.random() * columns, 10)

        if(!board[rowSel][columnSel].mined){
            board[rowSel][columnSel].mined = true
            minesPlanted++
        }
    }
}

const createMinedBoard = (rows, columns, minesAmount) => {
    const board = createBoard(rows, columns)
    spreadMines(board, minesAmount)
    return board
}

const cloneBoard = board => {   //funcao para clonar o tabuleiro para nao manusear o endereco do tabuleiro raiz
    return board.map( rows => {
        return rows.map(field => {
            return {...field}
        })
    })
}

const getNeighbors = (board, row, column) => {
    const neighbors = []
    const rows = [row -1, row, row + 1]
    const columns = [column -1, column, column + 1]
    rows.forEach(r => {
        columns.forEach(c => {
            const diferent = r !== row || c !== column // checa se e diferente da linha || coluna
            const validRow = r >=0 && r < board.length
            const validColumn = c >=0 && c < board[0].length
            if(diferent && validRow && validColumn){
                neighbors.push(board[r][c])
            }
            
        })
    })
    return neighbors
}

const safeNeighborhood = (board, row, column) => { //olha vizinhaca para checar se ta sem minas
    const safes = (result, neighbor) => result && !neighbor.mined
    return getNeighbors(board, row, column).reduce(safes, true)
}

const openField = (board, row, column) => { // funcao para gatilhar as outras quando o usuario clicar
    const field = board[row][column]
    if(!field.opened){
        field.opened = true
        if(field.mined){ // se tem mina, explode
            field.exploded=true
        } else if (safeNeighborhood(board, row, column)){ // se a vizinhaca for segura, abre elas
            getNeighbors(board, row, column).forEach(n => openField(board, n.row, n.column))
        } else {
            const neighbors = getNeighbors(board, row, column) // scaneia os campos ao redor
            field.nearMines = neighbors.filter(n => n.mined).length
        }
    }
}

const fields = board => [].concat(...board) // concatena todos os campos para facilitar leitura
const hadExplosion = board => fields(board).filter(field => field.exploded).length > 0 // verifica se explodiu pra acabar o jogo
const pendding = field => (field.mined && !field.flagged) || (!field.mined && !field.opened) // verifica se nao tem nenhum campo 
                                                                                            //sem ter sido checado pelo jogador
const wonGame = board  => fields(board).filter(pendding).length === 0 // se nao tiver pendencias, o jogo acaba 
const showMines = board => fields(board).filter(field => field.mined).forEach(field => field.opened = true)

const invertFlag = (board, row, column) => {
    const field = board[row][column]
    field.flagged= !field.flagged
}

const flagsUsed = board => fields(board).filter(field => field.flagged).length

export { createMinedBoard, cloneBoard, openField, hadExplosion, wonGame, showMines, invertFlag, flagsUsed}