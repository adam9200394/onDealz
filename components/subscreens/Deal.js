import { firebase } from '../data/firebaseConfig';
import { View, Text,  TouchableOpacity, TextInput, BackHandler, Alert } from 'react-native';
import { useEffect, useState } from 'react';
import styles from '../assets/styles';
import { AntDesign } from '@expo/vector-icons';
import DatePicker from 'react-native-datepicker';
import { Entypo } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { ActivityIndicator } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import NumericInput from 'react-native-numeric-input'
import { BackArraw } from './Components';






export default function ({location, setStage}) {

    const [ title, setTitle ] = useState('');
    const [ desc, setDesc ] = useState('');
    const [selected, setSelected ] = useState('Food');
    const [date, setDate] = useState(new Date()); 
    const [imageStatus, setImageStatus ] = useState(true);
    const [level, setlevel ]  = useState('post');
    const [prieces, setPrieces ] = useState({old: null, discounted: null});

    const Selections = [
        {id: 1,type: 'Food'},
        {id: 2,type: 'Cloth'},
        {id: 3, type: 'House items'},
        {id: 4, type: 'Gadgets'},
        {id: 5, type:'Service'} 
    ];
    const [q, setQ ] = useState('');
   
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
    
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setDate(currentDate);
        console.log(date);
      };
    
      const showMode = (currentMode) => {
        DateTimePickerAndroid.open({
          value: date,
          onChange,
          mode: currentMode,
          is24Hour: true,
        });
      };
    
      const showDatepicker = () => {
        showMode('date');
      };
    
  
    const ClearAll = () => {
    setTitle('');
    setDesc('');
    setSelected('');
    }
    const handleDisplayDeal = () => {
        if (title == '' || desc == ''  ) {
            alert("a name and a describtion must be entered");
            return
        } else if((prieces.discounted - prieces.old) >= 0) {
            alert("discounted priece cann't be larger than the entered priece")
        } else if (prieces.old == '' || prieces.discounted) {
            alert("please enter the priece and the discounted priece")
            return
        }
        
        setlevel("loading");
       
        setTimeout(() => {
            setlevel("get")
            
        }, 500);
      console.log(prieces);
    }

    useEffect(()=> {
        
    }, [level])
    const handleSubmitDeal = async () => {
        let deal = {title, desc, location, catogary :  selected, prieces, date, quantity: q};
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

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        /* let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        }); */

        let camera = await ImagePicker.launchCameraAsync(ImagePicker.ImagePickerOpations)
    
        console.log(camera);
    
        if (!result.cancelled) {
          setImage(result.uri);
        }
      };

    const handlePriece = (val, type) => {
        if (type == "old") {
            
            let discounted = prieces.discounted;
            setPrieces({discounted: discounted, old: val })
            
        } else if(type == "new") {
            
            let old = prieces.old;
            setPrieces({old: old, discounted: val})
            
        }

    }
    
    const getRender = () => {
        if(level == 'post') {
            return (
                <View style={{padding: 8}}>
                <BackArraw  setStage={setStage}/>
                <Text style={[styles.t_txt, styles.dashed_border]}> Summery: </Text>
                
                <View style={styles.selector}>
                    { Selections.map((selection) => {
                        let bgColor = 'rgba(73, 48, 95, 1)';
                        let txtcolor = 'white';
                        let bpadding = 5;
                        let bRadiaus = 5;
                        if(selection.type == selected) {
                            bgColor = "rgba(169, 150, 184, 1)";
                            txtcolor = "rgba(54, 37, 69, 1)";
                            bpadding = 7;
                            bRadiaus = 10;
                        }
                    

                        return(
                            <TouchableOpacity key={selection.id} onPress={() => {setSelected(selection.type)}}>
                                <View style={[{justifyContent: 'center', backgroundColor: bgColor, borderRadius: bRadiaus, margin: 1, elevation: 4, shadowColor: 'white', shadowOffset: [-1, 2], }, styles.solid_border]}>
                                    <Text style={{padding: bpadding, color: txtcolor, textAlign: 'center'}}> { selection.type } </Text>
                                </View>
                            </TouchableOpacity>
                        )
                    })}
                </View>
                <View style={styles.insideContainer}>
                {imageStatus ? (
                    <View style={[styles.selector, {backgroundColor: 'rgba(91, 9, 118, 0.8)', padding: 8, alignItems: 'center', borderRadius: 5, marginBottom: 8, marginTop: 8}]}> 
                        <Text style={{color: 'white'}}> select image </Text>
                        <TouchableOpacity onPress={() => {console.log('what is happing here'); pickImage(); console.log("aysnc function isn't working")}}> 
                            <Entypo name="image" size={30} color="white" />
                        </TouchableOpacity>
                    </View>
                ) : (
                    <Text style={{color: 'white'}}> image selected</Text>
                )}
                </View>  
                <View style={styles.insideContainer}>
                    <TextInput
                        mode= 'flat'
                        label="Item name"
                        style={styles.textInput}
                        onChangeText={(e) => { setTitle(e)}}
                        numberOfLines={1}
                        placeholder="what is your deal.."
                        
                    
                        />
                    <TextInput
                        mode="flat"
                        label="Descripe your deal .."
                        numberOfLines={4}
                        style={styles.textInput}
                        onChangeText={(e) => { setDesc(e)}}
                        outlineColor='blue'
                        selectionColor='green'
                        multiline={true}
                        placeholder="dicribe your deal.."
                        />
                    

                
                </View>
                <Text style={[styles.t_txt, styles.dashed_border]}> Your Deal  Details </Text>
                <View style={styles.insideContainer}> 
                    <View style={[styles.selector, {backgroundColor: 'rgba(91, 9, 118, 0.8)', padding: 8, alignItems: 'center', borderRadius: 5, marginBottom: 12}]}>
                        <Text style={{color: 'white'}}> Set a Time limt </Text>
                        
                        <TouchableOpacity onPress={showDatepicker}>
                            <AntDesign name="calendar" size={30} color="white" />
                        </TouchableOpacity>
                            
                    </View>
                    <View style={[styles.pick_time, {justifyContent: 'center'}]}>
                                <TextInput
                                    mode= 'flat'
                                    label="old priece"
                                    style={[styles.textInput, {width: '40%'}]}
                                    selectionColor='green'
                                    keyboardType='numeric'
                                    placeholder='old priece..'
                                    onChangeText={(e) => { handlePriece(e, "old")}}
                                
                                    />
                                <TextInput
                                    mode= 'flat'
                                    label="discounted"
                                    style={[styles.textInput, {width: '40%'}]}
                                    selectionColor='green'
                                    keyboardType='numeric'
                                    placeholder='discounted priece..'
                                    onChangeText={(e) => { handlePriece(e, "new")}}

                                />


                    </View>
                    <View style={{flexDirection: 'row', alignContent: 'flex-start', width: '100%', padding: 6, alignItems: 'center'}}>
                        <Text style={{color: 'white'}}>  Quantity</Text>
                        <View style={{marginLeft: 40}}>
                        <NumericInput  type='up-down'
                         onChange={value => setQ(value)} 
                         rounded 
                         valueType='real'
                         textColor='#ffff'
                         rightButtonBackgroundColor='#EA3788' 
                         leftButtonBackgroundColor='#E56B70'
                         />
                         </View>
                    </View>
                </View>
                
                <TouchableOpacity style={[styles.button, {alignSelf: 'center', marginTop: 12}]} onPress={handleDisplayDeal}>
                    <Text style={{color: 'white', textAlign: 'center', marginLeft: 4, marginRight: 4, marginTop: 4}}> Next </Text>
                    <AntDesign name="arrowright" size={24} color="white" style={{marginLeft: 4, marginRight: 4}} />
                </TouchableOpacity>
            </View>
            )
        } else if(level =='get') {
            return (
                <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
                    <View style={styles.card}>
                        <View style={styles.cardItem}>
                            <Text style={{color: 'grey', marginRight: 12}}>name</Text>
                            <Text> {title} </Text>
                        </View>
                        <View style={styles.cardItem}>
                            <Text style={{color: 'grey', marginRight: 12}}>desc</Text>
                            <Text> {desc} </Text>
                        </View>
                        <View style={styles.cardItem}>
                            <Text style={{color: 'grey', marginRight: 12}}> deal </Text>
                            <Text style={{textDecorationLine: 'line-through'}}> {prieces.old} $ </Text>
                            <Text> {prieces.discounted} $ </Text>
                        </View>
                        <View style={styles.cardItem}>
                            <Text style={{color: 'grey', marginRight: 12}}> Quantity </Text>
                            <Text> {q} </Text>
                        </View>
                        <View style={styles.cardItem}>
                            <Text style={{color: 'grey', marginRight: 12}}> Deal end at </Text>
                            {/* <Text> {date} </Text> */}
                        </View>

                        <TouchableOpacity style={[styles.button, {alignSelf: 'center', marginTop: 12}]} onPress={handleSubmitDeal}>
                                <Text style={{color: 'white', textAlign: 'center', marginLeft: 4, marginRight: 4, marginTop: 4}}> go live </Text>
                                <AntDesign name="arrowright" size={24} color="white" style={{marginLeft: 4, marginRight: 4}} />
                        </TouchableOpacity>

                    </View>
                </View>
            )
        } else if(level == 'loading') {
            return (
                <View style={[styles.main_modal, {backgroundColor: 'rgba(22, 1, 40, 1)'}]}>
                    <ActivityIndicator animating={true} style={{width: 100, height: 100}} color="rgba(216, 197, 232, 1)" size="large"/>
                </View>
            )
        }
    }
    return (
        <View style={[styles.container, styles.darkbg]} > 
            { getRender() } 
        </View>
    )
}