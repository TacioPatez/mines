import { Dimensions } from 'react-native'

const params = {
    blockSize: 40,
    borderSize: 5,
    fontSize: 25,
    headerRatio: 0.15, //proporcao do painel que sera reservado ao cabecalho
    difficultLevel: 0.1,
    getColumnsAmount(){
        const width = Dimensions.get('window').width
        return Math.floor(width / this.blockSize )
    },
    getRowsAmount(){
        const totalHeight = Dimensions.get('window').height
        const boardHeight = totalHeight * (1 - this.headerRatio)
        return Math.floor(boardHeight / this.blockSize)
    }
}

export default params