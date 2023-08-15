import React from 'react'
import { View, StyleSheet } from 'react-native'

export default props => {
    return(
        <View style={styles.container}>
            <View style={[styles.flagpole, props.bigger ? styles.flagpoleBigger : null]} />
            <View style={[styles.flag, props.bigger ? styles.flagBigger : null]} />
            <View style={[styles.base1, props.bigger ? styles.base1Bigger : null]} />
            <View style={[styles.base2, props.bigger ? styles.base2Bigger : null]} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 2*1.3,
    },
    flagpole: {
        position: 'absolute',
        height: 14*1.3,
        width: 2*1.3,
        backgroundColor: '#222',
        alignSelf: 'center',
    },
    flag: {
        position: 'absolute',
        height: 5*1.3,
        width: 6*1.3,
        backgroundColor: '#f22',
        marginLeft: 15
    },
    base1:{
        alignSelf: 'center',
        position: 'absolute',
        height: 2*1.3,
        width: 6*1.3,
        backgroundColor: '#222',
        marginTop: 10*1.3
    },
    base2: {
        alignSelf: 'center',
        position: 'absolute',
        height: 2*1.3,
        width: 10*1.3,
        backgroundColor: '#222',
        marginTop: 12*1.3
    },
    flagpoleBigger: {
        position: 'absolute',
        height: 14*1.3*2,
        width: 2*1.3*2,
        backgroundColor: '#222',
        alignSelf: 'center'
    },
    flagBigger: {
        position: 'absolute',
        height: 5*1.3*2,
        width: 6*1.3*2,
        backgroundColor: '#f22',
        marginLeft: 2
    },
    base1Bigger:{
        alignSelf: 'center',
        position: 'absolute',
        height: 2*1.3*2,
        width: 6*1.3*2,
        backgroundColor: '#222',
        marginTop: 10*1.3*2
    },
    base2Bigger: {
        alignSelf: 'center',
        position: 'absolute',
        height: 2*1.3*2,
        width: 10*1.3*2,
        backgroundColor: '#222',
        marginTop: 12*1.3*2
    },
})