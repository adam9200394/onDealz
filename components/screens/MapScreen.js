import { useState, useEffect, useContext } from 'react'
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native'
import MapView, { Callout, Circle, Marker } from 'react-native-maps'
import { Paragraph, Button, Portal, ActivityIndicator } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Modal from "react-native-modal";
import * as Location from 'expo-location';
import food from '../../assets/food.png'
import Gadget from '../../assets/Gadget.png'
import service from '../../assets/Service.png'
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { dataContext } from '../data/data';


export default function MapScreen () {
    const [ dailogVisiable, setDailogVisiable ] = useState(false);
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [mainMarker, setmainMarker ] = useState({
        longitude: 55.29976375401019,
        latitude: 25.253976426842886
    });
    const [data, setData ] = useState(undefined);
    const [values, setValues ] = useState(undefined);
    const [markers, setmarkers ] = useState([{type: 'food',location:{latitude: 25.25113844267225, longitude: 55.30140224844217}},
    {type: 'service',location:{latitude: 25.253976426842886, longitude: 55.29976375401019}},
    {type:'gadget',location:{latitude: 25.277414930287193, longitude: 55.28889041393995}},
    {type:'food',location:{latitude: 25.297414930287193, longitude: 55.29889041393995}},
    {type:'service',location:{latitude: 25.298414930287193, longitude: 55.28889041393995}},
    {type:'gadget',location:{latitude: 25.287414930287193, longitude: 55.28889041393995}}]);
    const [loadingVisiable, setLoadingVisiable ] = useState(true);


   /*  {type: 'food',location:{latitude: 25.25113844267225, longitude: 55.30140224844217}},
    {type: 'service',location:{latitude: 25.253976426842886, longitude: 55.29976375401019}},
    {type:'gadget',location:{latitude: 25.277414930287193, longitude: 55.28889041393995}},
    {type:'food',location:{latitude: 25.297414930287193, longitude: 55.29889041393995}},
    {type:'service',location:{latitude: 25.298414930287193, longitude: 55.28889041393995}},
    {type:'gadget',location:{latitude: 25.287414930287193, longitude: 55.28889041393995}} */

    
    let searchRaduis = useContext(dataContext).radius;
    
    const [showLocation, setShowLocation ] = useState({longitude: '', latitude: ''});
  


     
     
    
    


    useEffect(() => {

  
        (async () => {
          let { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
          }
    
          let location = await Location.getCurrentPositionAsync({});
          setLocation(location);
          setLoadingVisiable(false);
          
          setmainMarker({
            longitude: location.coords.longitude,
            latitude: location.coords.latitude
        });
 
        })();
      }, [data, mainMarker]);
    
   
    const initiateDailog = (location) => {
      setShowLocation(location);
      setDailogVisiable(true);
      
    }

   /* const getMarkers = () => {
    if(values == undefined) {
      return
    } else {
      return (
        markers.map((marker) => { 

          let imag_source = null;
           if(marker.type == "Food"){
                 imag_source = food
             } else if (marker.type =="Service") {
                 imag_source = service
             } else {
               imag_source = Gadget
             }
             return (
                <Marker key={marker.location.latitude} title='here' coordinate={{longitude:  marker.location.longitude, latitude: marker.location.longitude}} onPress={() => initiateDailog(marker.location)}> 
                   <View style={styles.markerElement}>
                     <Text style={{color: 'green'}}> Live </Text>
                     <View style={{ borderRadius: 45, width: 45, height: 45, justifyContent: 'center', borderWidth: 1, borderColor: 'blue', borderStyle: 'dashed', padding: 6}}>
                       <Image source={imag_source} style={{width: '100%', height: "100%", alignSelf: 'center'}} />
                     </View>
                     <AntDesign name="caretdown" size={24} color="rgba(48, 25, 68, 1)" style={{ marginTop: -7}} />
                   </View>

                </Marker>
                );
         })
      )
    }
   }
     */
    
    return (
       
            <View style={styles.container}>
                <MapView style={styles.map}
                    initialRegion={{
                        longitude: mainMarker.longitude,
                        latitude: mainMarker.latitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                    userLocationPriority="high" 
                    onPress={(e) => {
                      let arr = ['food', 'Service', 'Gadget'];
                      let type =arr[ Math.floor(Math.random(3))];
                       let newmarker =  {
                           location: {longitude: e.nativeEvent.coordinate.longitude,
                            latitude: e.nativeEvent.coordinate.latitude,},
                            type: type
                        }
                        setmarkers([...markers, newmarker])
                       
                    }}
                >
                    <Marker
                        title="i'm here"
                        coordinate={mainMarker}
                        draggable
                        onDragStart={(e) => {
                            console.log(e.nativeEvent.coordinate)
                        }}
                        onPress = {(e) => {console.log((e.nativeEvent.coordinate))}}
                    >
                      <View style={styles.main_marker}>
                        <Ionicons name="person" size={24} color="white" style={styles.mainMarkerIcone}/>
                        <AntDesign name="caretdown" size={24} color="rgba(166, 40, 255, 0.8)" style={{ marginTop: -7}} />
                      </View> 
                    </Marker>
                  { markers.map((marker) => { 
                     let imag_source = null;
                      if(marker.type == "food"){
                            imag_source = food
                        } else if (marker.type =="service") {
                            imag_source = service
                        } else {
                          imag_source = Gadget
                        }
                        return (
                           <Marker key={marker.location.latitude} title='here' coordinate={marker.location} pinColor="red" onPress={() => initiateDailog(marker.location)}> 
                              <View style={styles.markerElement}>
                                <Text style={{color: 'green'}}> Live </Text>
                                <View style={{ borderRadius: 45, width: 45, height: 45, justifyContent: 'center', borderWidth: 1, borderColor: 'blue', borderStyle: 'dashed', padding: 6}}>
                                  <Image source={imag_source} style={{width: '100%', height: "100%", alignSelf: 'center'}} />
                                </View>
                                <AntDesign name="caretdown" size={24} color="rgba(48, 25, 68, 1)" style={{ marginTop: -7}} />
                              </View>

                           </Marker>
                           )
                    }) } 

                    <Circle
                        center={mainMarker}
                        radius={searchRaduis}
                        fillColor="rgba(0, 108, 142, 0.16)"
                    />
                </MapView>


               
                  <Modal isVisible={dailogVisiable} 
                  onDismiss={() => setDailogVisiable(false)} 
                  animationIn="slideInUp"
                  animationOut= "bounceOut"
                  animationInTiming={1000}
                  style={{ alignItems: 'center', justifyContent: 'center'}}
                  >
                    <View style={{alignItems: 'center', justifyContent: 'center', width: '90%', height: '80%', backgroundColor: 'white', borderRadius: 12}}>
                      <Text>{ showLocation.latitude } and {showLocation.longitude}</Text>
                      <TouchableOpacity style={{position: 'absolute', bottom: "0%", backgroundColor: 'blue', width: '100%', alignItems: "center", padding: 12, borderBottomRightRadius: 12,  borderBottomLeftRadius: 12}  } onPress={() => setDailogVisiable(false)}>
                       <Text style={{color: 'white'}}> get it boy </Text> 
                        </TouchableOpacity>
                    </View>  
                  </Modal>

                  
            <Modal  isVisible={loadingVisiable} style={{width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center', backgroundColor: "rgba(173, 40, 255, 0.1)"}}>
                <ActivityIndicator animating={true} style={{width: 100, height: 100}} color="rgba(216, 197, 232, 1)" size="large"/>
            </Modal>    
                
          
        </View> 
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1
       /*  alignItems: 'center',
        justifyContent: 'center', */
    },

    mapcontainer: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
    
      },
      map: {
        /* width: Dimensions.get('window').width,
        height: Dimensions.get('window').height, */
        width: '100%',
        height: '100%'
      },
      overlay: {

      },
      main_marker: {
        width:70,
        height: 70, 
        justifyContent: "center",

        alignItems: 'center'
      },
      mainMarkerIcone: {
        borderRadius: 100,
        backgroundColor: "rgba(166, 40, 255, 0.95)",
        alignSelf: 'center',
        padding: 8,
      },
      mainMarkerIconeBottome: {
        alignSelf: 'center',
        
        padding: 0
      },
      markerElement : {
        alignItems: 'center'
      }
})