import { View, StyleSheet, Text } from 'react-native'
import ContentElement from '../assets/ContentElement'

export default function ContentScreen ()  {

    const content = [
        {
        titletext: 'cloth',
        desctext: 'panth for men wide 3 left in stock'
        },
    
        {
        titletext: 'food',
        desctext: ' fried chicken half kilo for 3 aed'
        },
    
        {
        titletext: 'service ',
        desctext: 'cleaning service for houses in bay area for 30 aed'
        },
        {
        titletext: 'sex ',
        desctext: 'a big ass women near your location on call and will be with to suck your dick for 10 aed'
        },
        {
        titletext: 'fuck you',
        desctext: 'a man that will come to your house and tell you fuck you to your face for 1 bilion aed don\'t miss this golden chance.'
        },
    
        
    ]
   
    return (
        <View style={styles.container}>
          {  content.map((index) => {
            console.log("rendered")
            return (
                
                <View key={index.titletext}>

                 <ContentElement titletxt={index.titletext} desctxt={index.desctext} /> 
                    
                </View>
            )
        })
        }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        paddingTop: 18
    },
   
})