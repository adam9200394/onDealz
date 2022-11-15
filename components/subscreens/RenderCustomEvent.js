import { firebase } from '../data/firebaseConfig';
import { View, Text,  TouchableOpacity, BackHandler } from 'react-native';
import { useState, useEffect } from 'react';
import { TextInput } from 'react-native-paper';
import styles from '../assets/styles';
import { AntDesign } from '@expo/vector-icons';
import { BackArraw } from './Components';




export default RenderCustomEvent = ({location, setStage}) => {

   

    const [eventName, setEventName ] = useState("");
    const [eventDesc, setEventDesc ] = useState("");
    const [EventSelected , setEventSelected ] = useState("Social");
    const Event_types = [{id: 1,type: "Social"}, {id: 2,type: "Casual"}];
    
    const handleSubmitEvent = () => {
        if (eventName == "" || eventName == "" || EventSelected ==""){
            alert("pleas fill all to contiou");
        }
        const Event = {eventName, eventDesc, location, Event_type: EventSelected}
        firebase.database().ref('Events/').push(Event).then((data) => {
            console.log('"the data is:"',data);
            setEventName("");
            setEventDesc("");
            setStage("processing");
            setTimeout(() => {
                setStage("done");
            }, 2000);
            
           
        }).catch(error => alert(error));
    }

    useEffect(() => {
        const backAction = () => {
            setStage("initial")
            return true;
          };
      
          const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
          );
      
          return () => backHandler.remove();
      }, []);
    
    return (
        <View style={[styles.container, styles.darkbg]}>
            <BackArraw setStage={setStage}/>
            <View style={styles.insideContainer}>
                <Text style={styles.t_txt}> type of event</Text>
                <View style={styles.Event_selector}>
                        { Event_types.map((selection) => {
                        let bgColor = 'rgba(73, 48, 95, 1)';
                        let txtcolor = 'white';
                        let bpadding = 5;
                        let bRadiaus = 5;
                        if(selection.type == EventSelected) {
                            bgColor = "rgba(169, 150, 184, 1)";
                            txtcolor = "rgba(54, 37, 69, 1)";
                            bpadding = 7;
                            bRadiaus = 10;
                        }
                    

                        return(
                            <TouchableOpacity key={selection.id} onPress={() => {setEventSelected(selection.type)}}>
                                <View style={[{justifyContent: 'center', backgroundColor: bgColor, borderRadius: bRadiaus, margin: 4}, styles.solid_border]}>
                                    <Text style={{padding: bpadding, color: txtcolor, textAlign: 'center'}}> { selection.type } </Text>
                                </View>
                            </TouchableOpacity>
                        )
                    })}
                </View>
            </View>
            <View style={styles.insideContainer}>
                <Text style={styles.dashed_border}> Event Details </Text>
                <TextInput
                    mode= 'flat'
                    label="Event name"
                    style={{width: 315, margin: 4}}
                    onChangeText={(e) => { setEventName(e)}}
                    selectionColor='green'
                    
                    />
                <TextInput
                    mode= 'flat'
                    label="descripe the Event"
                    style={{width: 315, margin: 4}}
                    onChangeText={(e) => { setEventDesc(e);}}
                    selectionColor='green'
                    multiline
                    numberOfLines={5}
                    
                    />
            </View>
            <TouchableOpacity onPress={handleSubmitEvent}>
                <View style={[styles.button, styles.dashed_border]}>
                    <Text style={{fontSize: 17, textAlign: 'center'}}> submit </Text>
                </View>
            </TouchableOpacity>
            
        </View>
      
    )
}