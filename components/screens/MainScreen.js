import { useContext, useState, useEffect } from 'react';
import { StyleSheet, Text, View, Modal, Pressable, TouchableOpacity} from 'react-native';
import { Video } from 'expo-av';
import AnimBtn from '../assets/AnimBtn';
import { normalize } from '../assets/normalize';
import VideoBackground from '../../assets/video/initial.mp4';
import LoadingBackground from '../../assets/video/loading.mp4';
import { LangContext } from '../data/LangContext';
import SettingsScreen from './SettingsScreen';
import { MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';


export default function MainScreen({ navigation }) {
 let lang = useContext(LangContext);
 const setlang = lang.modLang;
 let txtlang = lang.lang == "eng" ? "عربي" : "english";
 lang = lang.lang == "eng" ? lang.eng : lang.arb;
 console.log(backgroundImage);
 let u_lang = useContext(LangContext);
 
 const [backgroundImage, setbackgroundImage] = useState(VideoBackground)
 const [ text, setText ] = useState("")
 const [statustxt, setstatusTxt] = useState('');
 const [settingsScreen, setSettingsScreen ] = useState(false);
 const [postModalVisiable, setPostModalVisiable ] = useState(false);
 const [ notifications, setNotifications ] = useState(true);
 const [backgroundType, setBackgroundType ] = useState(true);



 const [ from, setfrom ] = useState({opacity: .2, scale: .1, borderRadius: 99999});
 const [ to, setTo ] = useState({opacity: 0, scale: 1, borderRadius: 0});



 
useEffect(() => {

/* if(backgroundType) setbackgroundImage(VideoBackground);
else backgroundImage = setbackgroundImage(LoadingBackground); */
       
  if(u_lang.lang == "eng") {
   setText("Press to Search")
   console.log("eng text")
   } else {
     setText("اضعط للبحث")
     console.log(txtlang)
   }
   
   
}, [txtlang])

  const pressHandler = () => {
    setBackgroundType(false);
    if(u_lang.lang == "eng") {
      setText("Searching Near yOu ...")
     } else {
       setText(" يبحث بالقرب منك") ;
     }
   
    setTimeout(() => {
      navigation.navigate('Map')
    }, 5000);
   
   
  }

  const handlePostModal = () => {
   /*  setPostModalVisiable(true);
    setTo({opacity: 1, scale: 1}); */
    navigation.navigate('Post')
  }

  const closePostModal = () => {
    setPostModalVisiable(false)
  }

  const getBell = () => {
    if(notifications) return <MaterialCommunityIcons name="bell-badge" size={35} color="white" />
    else return <MaterialCommunityIcons name="bell-outline" size={35} color="white" />
  }
  return (
    <View style={styles.container}>
        <Video
          isLooping
          source={VideoBackground}
          resizeMode='cover'
          style={StyleSheet.absoluteFillObject}
          shouldPlay
          />
         <Text style={styles.titletxt}> { text } </Text>
         <View style={styles.top_nav}>
           <TouchableOpacity onPress={() => { setSettingsScreen(true) }} style={{marginLeft: 8}}>
              <FontAwesome5 name="user-cog" size={30} color="white" />
            </TouchableOpacity>
            <Text style={{ fontSize: normalize(40), width: '70%', textAlign: 'center', color: 'white'}}>OnDeals</Text>
            <TouchableOpacity onPress={() => { setlang() }} style={{borderRadius: 5, borderWidth: .5, borderColor: 'black', borderStyle: 'dashed', padding: 6, margin: 5, }}>
              {/* <Text>{ txtlang }</Text> */}
              { getBell() }
            </TouchableOpacity>
            
         </View>
       {/*   <View style={[styles.navSeb, styles.elevation]}></View> */}
        {/* gey element   {[...Array(5).keys()].map((index) => {
             let pArray = calculateSpawn();
          

            return(
                <View style={[styles.elevation, {backgroundColor: 'white', width: 100, height: 100, zIndex: 3, borderRadius: 100, position: 'absolute', top: 50, right: 100 }]} key={index}>
                    <Text> forget about it  </Text>
                </View>
            )
          })}
         */}
         {/* <View  style={styles.custom_nav}>
           <CustomNav />
         </View> */}
        
         <AnimBtn onpress={pressHandler} />
         <Text style={styles.status_txt}> { statustxt }</Text>
         <Modal
                animationType="slide"
                visible={settingsScreen}
                onRequestClose={() => {setSettingsScreen(false)}}
                style={styles.modal}
                statusBarTranslucent={true}
            >
              <View style={{flex: 1}}>
                <SettingsScreen />
              </View>

          </Modal>


      <Pressable style={styles.post_deal} onPress={handlePostModal}>
      <View style={{flex: 1}}>
        <Text style={styles.d_text}> {lang.Post_New_Deal }</Text>
        <View style={styles.circle}>
        <MaterialCommunityIcons name="star-plus-outline" size={35} color="white" />
        </View>
       </View>
       </Pressable>

       {/* <Modal style={{flex: 1}}
          animationType="fade"
          visible={postModalVisiable}
          onRequestClose={closePostModal } 
          statusBarTranslucent={true}
        >
          <MotiView style={{flex: 1}} from={from}
                         animate={to}
                         transition={{
                            type: 'timing',
                            duration: 500,
                            easing: Easing.out(Easing.ease),
              
                        }}> 
        <PostModal passFunction={closePostModal} />
         </MotiView>
       </Modal> */}
    </View>


  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
   /*  justifyContent: 'center', */ 
    alignItems: "center",
    width: "100%",
    height: "100%",
    paddingTop: "18%"
  },
  titletxt: {
    color: 'white',
    marginBottom: 36,
    fontSize: 25,
    zIndex: 6,
    position: 'absolute',
    top: '35%'
  },
   Element: {
    position: 'absolute',
    right: 100,
    top: 100
  },
  elevation: {
    shadowColor: 'grey',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 4,
    margin: 6,
    padding: 6,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: 'grey'
  },
  custom_nav : {
    position: 'absolute',
    bottom: 0,
    left: 0,
    height: "30%"
  },
  status_txt: {
    position: 'absolute',
    bottom: "10%",
    fontSize: normalize(30),
    color: 'grey'

  },
  top_nav: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-around',
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 5,
    height: 80,
    width: '100%',
    paddingBottom: 12
  },
  modal: {
   flex: 1,
  /*  width: '100%',
   height: '100%' */
  },
  post_deal: {
    position: 'absolute',
    bottom: "2%",
    right: '2%',
    borderColor: 'white',
    width: '60%',

   
   
  },
  elevation: {
    shadowColor: 'grey',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 1,
    margin: 6,
    padding: 6,
    borderColor: 'grey'
  },
  d_text: {
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
    color: 'white',
    fontSize: 22,
    marginRight: 45,
    marginBottom: 1,
    borderWidth: .8,
    borderStyle: 'solid',
    borderColor: 'white',
    padding: 4,
    borderTopLeftRadius: 100,
    borderTopRightRadius: 100,
    borderBottomLeftRadius: 100,
    backgroundColor:'rgba(94, 34, 149, 0.07)',
    
  },
  circle: {borderRadius: 100, height: 60, width: 60, backgroundColor: 'rgba(48, 25, 68, 1)', alignItems: 'center', justifyContent: 'center', alignSelf: 'flex-end',
  shadowColor: 'black',
  shadowOffset: { width: 0, height: 0 },
  shadowOpacity: 0.3,
  shadowRadius: 5,
  elevation: 4,
},
navSeb: {
  position: 'absolute',
  top: '10%',
  width: '100%',
  height: 0
}
  
});
