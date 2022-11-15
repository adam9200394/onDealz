import { View, Text,  TouchableOpacity, ImageBackground } from 'react-native';
import { useState, useEffect, useContext } from 'react';
import * as Location from 'expo-location';
import { firebase } from '../data/firebaseConfig';
import { ActivityIndicator, TextInput } from 'react-native-paper';
import { AntDesign } from '@expo/vector-icons';
import styles from '../assets/styles';
import RenderCustomEvent from '../subscreens/RenderCustomEvent'; 
import { LangContext } from '../data/LangContext';
import imagbg from '../../assets/backimag2.jpg';
import imagbg2 from '../../assets/imgbg4.png';
import imagbg3 from '../../assets/imgbg5.png';
import Deal from '../subscreens/Deal'
import RenderStore from '../subscreens/RenderStore';

export default function ({passFunction }) {
    // errors -----------------------------------------------
    const titl_err = "pls enter a title to continou";
    const desc_err = "pls enter a description to continous";

    let lang = useContext(LangContext);
    lang = lang.lang == "eng" ? lang.eng : lang.arb;
    
    const [ title, setTitle ] = useState('');
    const [ desc, setDesc ] = useState('');
    const [location, setLocation] = useState(null);
    const [ stage , setStage ] = useState("initial");
    const Selections = [
        {id: 1,type: 'Food'},
        {id: 2,type: 'Cloth'},
        {id: 3, type: 'House items'},
        {id: 4, type: 'Gadgets'},
        {id: 5, type:'Service'}
                       ]
    const [selected, setSelected ] = useState('Food');
    const [catSelection, setCatSelection ] = useState(["Food", "Service"])
    const [date, setDate] = useState()
    const [open, setOpen] = useState(false);
    const Event_types = [{id: 1,type: "Social"}, {id: 2,type: "Casual"}];
    
   

    useEffect(() => {
        (async () => {
          let { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
          }
    
          let location = await Location.getCurrentPositionAsync({});
          setLocation(location.coords);
          
 
        })();
      }, []);

    const ClearAll = () => {
        setTitle('');
        setDesc('');
        setSelected('');
    }
// handle submitions ================================================================================
    const handleSubmitDeal = async () => {
        let deal = {title, desc, location, catogary :  selected};
        if(!title) {
            alert(titl_err);
            return;
        } else if (!desc) {
            alert(desc_err)
        }

        firebase.database().ref('Deals/').push(deal).then((data) => {
            console.log('"the data is:"',data);
            ClearAll();
            setStage("processing");
            setTimeout(() => {
                setStage("done");
            }, 2000);
            
           
        }).catch(error => alert(error));
        
                                                          

    }

   

// ================================================functional components =================================================



// ================================================back arraw =============================================================

// ================================================ Store Render function ================================================

    /* const RenderStore = () => {
        return (
            <View style={[styles.container, styles.darkbg]}>
                <BackArraw setStage={setStage} />
                <View style={[styles.insideContainer]}>
                    <Text style={styles.t_txt}> Catogreis </Text>
                    <View style={styles.selector}>
                            { Selections.map((selection) => {
                                 let bgColor = 'rgba(73, 48, 95, 1)';
                                 let txtcolor = 'white';
                                if(catSelection.includes(selection.type)) {
                                    bgColor = "rgba(169, 150, 184, 1)";
                                    txtcolor = "rgba(54, 37, 69, 1)"
                                }
                              
                               const set_selector = () => {
                                    if(!catSelection.includes(selection.type)) {
                                        setCatSelection([...catSelection, selection.type])
                                    } else {
                                      let s = catSelection.pop(selection.type);
                                      setCatSelection([...s])
                                    }
                               } 
                             

                                return(
                                    <TouchableOpacity key={selection.id} onPress={set_selector}>
                                    <View style={[{justifyContent: 'center', backgroundColor: bgColor, borderRadius: 5, margin: 1}, styles.solid_border]}>
                                        <Text style={{padding: 5, color: txtcolor, textAlign: 'center'}}> { selection.type } </Text>
                                    </View>
                                    </TouchableOpacity>
                                )
                            })}
                    </View>

                </View>
                <View style={styles.insideContainer}>
                    <Text style={styles.t_txt}> how many are you selling </Text>
                </View>
                  
            </View>
        )
    }
 */
// =============================================== Render custom Event =====================================================

// ================================================ Main Initial Render function =========================================
    const renderMainModal = () => {
        const navTo = (comp) => {
            setStage("processing");
            console.log("changing stage", comp);
            setTimeout(() => {
                setStage(comp)
            }, 500);
        
        }
        return (
            <View style={[styles.main_modal, styles.darkbg]}>
                <Text style={{fontSize: 25, marginBottom: 20, color: 'white', textDecorationLine: 'underline'}}> Post a new Deal </Text>
                <TouchableOpacity style={styles.main_button} onPress={() => {navTo("Deal")}}>
                    <ImageBackground resizeMode='cover' source={imagbg} style={{flex:1, paddingTop: 12}} >
                        <Text style={[styles.d_text, styles.big_txt]}>{lang.Publish_a_Deal}</Text>
                        <Text style={[styles.d_text, styles.small_txt]}>{lang.deal_on_one_item_type}</Text>
                    </ImageBackground>
                </TouchableOpacity>
                <TouchableOpacity style={styles.main_button} onPress={() => {navTo("Custom")}}>
                    <ImageBackground resizeMode='cover' source={imagbg3} style={{flex:1,  paddingTop: 12}}>
                        <Text style={[styles.d_text, styles.big_txt]}> {lang.Open_a_custom_Event}</Text>
                        <Text style={[styles.d_text, styles.small_txt]}>{lang.custom_event_for_everyone}</Text>
                    </ImageBackground>
                </TouchableOpacity>
                <TouchableOpacity style={styles.main_button} onPress={() => {navTo("Store")}}>
                    <ImageBackground resizeMode='cover' source={imagbg2} style={{flex:1,  paddingTop: 12}}>
                        <Text style={[styles.d_text, styles.big_txt]}> {lang.Open_a_Store} </Text>
                        <Text style={[styles.d_text, styles.small_txt]}> {lang.deal_on_multiple_item_types} </Text>
                    </ImageBackground>
                </TouchableOpacity>
            </View>
        )
    }


// ======================================= Conditional render =============================================
//=========================================================================================================
    const handlRender = () => {
        if(stage == "initial") {
            return(
               renderMainModal()
            )
        }else if(stage == "Deal") {
// ======================================= Deal Render ====================================================
            return (<Deal  location={location} setStage={setStage} /> )
            
        } else if (stage == "processing") {
// ========================================== Loading =========================================================================
            return(
                <View style={[styles.main_modal, {backgroundColor: 'rgba(22, 1, 40, 1)'}]}>
                <ActivityIndicator animating={true} style={{width: 100, height: 100}} color="rgba(216, 197, 232, 1)" size="large"/>
                </View>
            )
           
        } else if (stage == "Store") {
            return( <RenderStore setStage={setStage}  /> )
        } else if (stage == "Custom") {
            return ( <RenderCustomEvent  location={location} setStage={setStage}/>)
        } else {
// ======================================== Submiting ==========================================================================
            return(
                <View style={{width: '100%', height: '100%'}}>
                   <TouchableOpacity onPress={()=> { setStage("initial")}}>
                    <View style={{width: '100%', height: '100%', paddingTop: 100, backgroundColor: 'rgba(22, 1, 40, 1)'}}>
                        <AntDesign name="checkcircleo" size={50} color="white" />
                        <Text style={{textAlign: 'center', fontSize: 35, color: 'white'}}>you'r shit is live now</Text>
                    </View>
                     
                   </TouchableOpacity>
                </View>
            )
            
        }
       
    }
// noice color rgba(249, 32, 249, 1)
    return(

        <View style={styles.container}>
           { handlRender() }
        </View>
    )
}

