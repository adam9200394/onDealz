import { StyleSheet, View } from "react-native"
import { Feather } from "@expo/vector-icons";

export default function CustomNav () {
    return (
        <View style={style.container}>
           <View style={style.no}> 
            <Feather name="settings" size={40} color="white"  style={style.Feather}/>
           </View>
           <View style={style.no}> 
            <Feather name="twitter" size={40} color="white" style={style.Feather} />
           </View>
           <View style={[style.no, {borderBottomWidth: 0}]}> 
            <Feather name="facebook" size={40} color="white" />
           </View>
        </View>
    )
}

const style = StyleSheet.create({
    container:{
        flexDirection: 'column',
        height: "100%",
        width: 90,
        paddingTop: 20,
        justifyContent: "center",
        borderRadius: 8

    },
    no : {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 6,
        marginBottom: 6,
        paddingBottom: 6,
        paddingLeft: 6,
        paddingRight: 6
    },
    Feather: {
        borderBottomWidth: .5,
        borderBottomColor: 'white',
        paddingBottom: 6
    }
})