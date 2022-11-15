import { View, StyleSheet } from 'react-native'


const SIZE = 100;

export default function Element () {
    return (
        <View style={styles.Element}>

        </View>
    )
}

const styles = StyleSheet.create({
    Element: {
        width: SIZE,
        height: SIZE,
        borderRadius: SIZE,
        backgroundColor: 'grey'
    }
})