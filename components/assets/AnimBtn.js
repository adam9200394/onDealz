import { Feather } from "@expo/vector-icons";
import * as React from 'react';
import {  StyleSheet, View, Pressable, Text } from 'react-native'
import { MotiView } from '@motify/components'
import { Easing } from "react-native-reanimated";
import { Entypo } from '@expo/vector-icons';
import { useEffect, useContext, useState } from "react";
import { LangContext } from '../data/LangContext';
import { AntDesign } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';







const COLOR = 'rgba(48, 25, 68, 1)';

const SIZE = 100;

export default function AnimBtn ({onpress}){

    const [discover, setDiscover ] = useState("Discover");

    let lang = useContext(LangContext);
    let u_lang = '';
    u_lang = lang.lang == "eng" ? lang.eng : lang.arb;


    useEffect(() => {
       
        if(lang.lang == "eng") {
            setDiscover("Discover")
           
        } else {
            setDiscover("اكتشف");
            
        }
    }, [lang])
   
    const [ from, setfrom ] = React.useState({opacity: .5, scale: 1});
    const [ to, setTo ] = React.useState({opacity: 0, scale: 1});
    const [ to1, setTo1 ] = React.useState({opacity: 0, scale: 1});
    const [ to2, setTo2 ] = React.useState({opacity: 0, scale: 1});
    const [ LOOP, setLOOP] = React.useState(false);
    const [pressed, setpressed ] = React.useState("notpressed");
    
    // <AntDesign name="eyeo" size={24} color="black" /> import { AntDesign } from '@expo/vector-icons'; import { EvilIcons } from '@expo/vector-icons'; <EvilIcons name="eye" size={24} color="black" />
    
    const handleTextChange = () => {
         if(pressed == "pressed") return <Entypo name="eye" size={40} color="#fff" />
        else if (pressed == "pressed1"){
             return (

                    <EvilIcons name="eye" size={80} color="white" />
           
             )
            }
        else if(pressed == "notpressed") return <Text style={{color: 'white', fontSize: 20}}> { discover } </Text>
         
       
    }

    return (
        <View style={ style.center }>
             <Pressable onPress={() => {
                setpressed("pressed");
                setTo({opacity: .5, scale: 1.5});
               setTo1({opacity: .5, scale: 2});
               setTo1({opacity: .5, scale: 2.5}); 
               setTimeout(() => {
                setpressed("pressed1")
               },1500);

               setLOOP(true);
               onpress();
                setTimeout(() => {
                setTo({opacity: 0, scale: 1});
                setTo1({opacity: 0, scale: 1});
                setTo2({opacity: 0, scale: 1});
                setLOOP(false);
                setpressed("notpressed")
               }, 5000); 
            }}>
            <View  style={[style.dot, style.center]}> 
                
                
           
            <MotiView 
                         from={from}
                         animate={to}
                         transition={{
                            type: 'timing',
                            duration: 1000,
                            easing: Easing.out(Easing.ease),
                            loop: LOOP
                        }}        
                style={[StyleSheet.absoluteFillObject, style.dot]} />
            <MotiView 
                         from={from}
                         animate={to1}
                         transition={{
                            type: 'timing',
                            duration: 700,
                            easing: Easing.out(Easing.ease),
                            loop: LOOP
                        }}        
                style={[StyleSheet.absoluteFillObject, style.dot2]} />
            <MotiView 
                         from={from}
                         animate={to2}
                         transition={{
                            type: 'timing',
                            duration: 400,
                            easing: Easing.out(Easing.ease),
                            loop: LOOP
                        }}        
                style={[StyleSheet.absoluteFillObject, style.dot3]} />

                { handleTextChange() }    
            </View>
            </Pressable>
            
        </View>
    )
}

const style = StyleSheet.create({
    dot: {
        width: SIZE,
        height: SIZE,
        borderRadius: SIZE,
        backgroundColor: COLOR
    },
    dot2: {
        width: SIZE,
        height: SIZE,
        borderRadius: SIZE,
        backgroundColor: 'rgba(158, 66, 255, 0.95)'
    },
    dot3: {
        width: SIZE,
        height: SIZE,
        borderRadius: SIZE,
        backgroundColor: 'rgba(166, 112, 255, 0.95)'
    },
    center: {
        alignItems: "center",
        justifyContent: "center",
        position: 'absolute',
        top: '50%',
        right: '35%',
        zIndex: 4
    }
})