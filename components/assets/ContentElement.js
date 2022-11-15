import {View, StyleSheet, Text } from 'react-native'

export default function ContentElement ({titletxt, desctxt}) {
    return (
        <View style={[styles.container, styles.elevation]}>
            <Text style={styles.txtstyle}>{titletxt}</Text>
            <Text style={styles.txtstyle}>{desctxt}</Text>
        </View>
    )
}

const styles =  StyleSheet.create({
    container: {
        margin: 8,
        padding: 12,
        borderWidth: .5,
        borderColor: 'black',
        borderRadius: 4,
        overflow: 'scroll',
        backgroundColor: 'white'
    },
    txtstyle: {
        margin: 6,
        lineHeight: 25
    },
    elevation: {
        shadowColor: 'grey',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 4,
        margin: 6,
        padding: 6,
        borderColor: 'grey'
      }
})