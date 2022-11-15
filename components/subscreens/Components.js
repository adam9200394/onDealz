import {TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

export const BackArraw = ({setStage}) => {
    
    return(
        <TouchableOpacity style={{margin: 8, marginTop: 25}} onPress={() => { setStage("initial")}}>
            <AntDesign name="arrowleft" size={35} color="white" />
        </TouchableOpacity>
    )
}