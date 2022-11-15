import styles from "../assets/styles";
import { View, Text, Pressable } from 'react-native';
import { useContext, useEffect, useState } from "react";
import { LangContext } from '../data/LangContext';
import Slider from '@react-native-community/slider';
import { AntDesign } from '@expo/vector-icons';
import { dataContext } from '../data/data'
import { Switch } from 'react-native-paper';






export default function () {
    let lang = useContext(LangContext);
    const langtype = lang.lang;
    const setlang = lang.modLang;

    let data = useContext(dataContext);
    let radius = data.radius;
    let modRadius = data.modRadius;

   
    const [sliding, setSliding ] = useState(false);
    const [searchRadius, setSearchRadius ] = useState(radius);
    const [isSwitchOn, setIsSwitchOn] = useState(false);
   
    const [arbSelected, setArbSelected] = useState(false);
    const [engSelected, setEngSelected ] = useState(false);
    const [arbStyle, setArbStyle ] = useState({backgroundColor: 'rgba(38, 13, 58, 1)', color: 'white'})
    const [engStyle, setEngStyle ] = useState({backgroundColor: 'white', color: 'black'})
    const changeLang = (lang) =>  {
        setlang(lang);
    }
    const handlelSearchRadius = (val) => {
        setSliding(true);
        setSearchRadius(val);
        modRadius(val);

    }
   
    useEffect(() => {
        setSearchRadius(radius);
        if (langtype == "eng") {
            setEngSelected(true);
            setArbSelected(false);
        } else {
            setArbSelected(true);
            setEngSelected(false);
        }

        if(arbSelected) {
            setArbStyle({backgroundColor: 'rgba(38, 13, 58, 1)', color: 'white'});
            setEngStyle({backgroundColor: 'white', color: 'black'})
        } else if (engSelected) {
            setArbStyle({backgroundColor: 'white', color: 'black'});
            setEngStyle({backgroundColor: 'rgba(38, 13, 58, 1)', color: 'white'})
        }
    }, [arbSelected, engSelected])
    return (
        <View style={styles.SetttingScreen}>
             <View style={styles.settingElement}>
                <Text style={styles.settingsText}> Languge </Text> 
                <View style={styles.settingOpation}>
                    <Pressable style={{width: 70, padding: 6, justifyContent: 'center', backgroundColor: engStyle.backgroundColor, borderRadius: 5}} onPress={() => {changeLang("eng"); setEngSelected(true); setArbSelected(false)}}>
                        <Text style={{ textAlign: 'center', fontSize: 16, color: engStyle.color}} >English</Text>
                    </Pressable>
                    <Pressable style={{width: 70, padding: 6, justifyContent: 'center', backgroundColor: arbStyle.backgroundColor, borderRadius: 5}}  onPress={() => {changeLang("arb"); setArbSelected(true); setEngSelected(false)}}>
                        <Text style={{ textAlign: 'center', fontSize: 16, color: arbStyle.color}} >عربي</Text>
                    </Pressable>

                </View>
            </View>
            <View style={styles.settingElement}>
                {sliding ? (<Text style={[styles.settingsText, {color: 'grey'}]}> {searchRadius} meters </Text>) : 
                (<Text style={styles.settingsText}> Search radius </Text> )
                }
                <Slider
                    style={{width: 200, height: 50, alignSelf: 'flex-end'}}
                    minimumValue={50}
                    maximumValue={5000}
                    minimumTrackTintColor="rgba(206, 157, 243, 1)"
                    maximumTrackTintColor="rgba(104, 78, 124, 1)"
                    thumbTintColor="rgba(38, 13, 58, 1)"
                    onValueChange={(val) => {handlelSearchRadius(val)}}
                    onSlidingComplete={() => {setSliding(false)}}
                    value={searchRadius}
                    step={50}
                    />
               
            </View>
           
            <View style={styles.settingElement}>
                <Text style={styles.settingsText}> Filters </Text> 
                <View style={styles.settingOpation}>
                    <Text style={{fontSize: 16, textAlign: 'center',}}> chose filters </Text>
                    <AntDesign name="caretup" size={20} color="black" style={{marginTop: 4, marginLeft: 4}} />
                </View>
            </View>

            <View style={styles.settingElement}>
                <Text style={[styles.settingsText, {width: '60%'}]}> Search in the background </Text>
                <Switch value={isSwitchOn} style={{marginLeft: 12}} color="rgba(104, 78, 124, 1)" onValueChange={() => setIsSwitchOn(!isSwitchOn)} />


            </View>

            

        </View>

    )
}