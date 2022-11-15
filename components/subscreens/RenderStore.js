import { View, Text, TouchableOpacity, ScrollView, BackHandler} from 'react-native';
import { useState, useContext, useEffect } from 'react';
import { BackArraw } from './Components';
import styles from '../assets/styles';
import { TextInput } from 'react-native';
import { AntDesign, FontAwesome, Fontisto, Feather  } from '@expo/vector-icons';


 export default function  ({setStage}) {
    
    const Selections =
    [
        {id: 1,type: 'Food'},
        {id: 2,type: 'Cloth'},
        {id: 3, type: 'House items'},
        {id: 4, type: 'Gadgets'},
        {id: 5, type:'Service'}
                       
    ]
    const [catSelection, setCatSelection ] = useState(["Food", "Cloth"]);
    const [items , setItems ] = useState([
       
    ]);
    const [id, setID] = useState(0);
    
   
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
      


    const changeItemText = (uid, target, text) => {
       
        let item = items.filter((e) => {
        return e.id == uid
       })[0];
       
       let updatedItems = items.filter((e) => {
        return e.id != uid
       });

        if (target == "name") {
        let newitem = {
            id: item.id,
            desc: item.desc,
            pictures: item.pictures,
            name: text
           }

        setItems([...updatedItems, newitem ]);
        
        
       } else {
       
        let newitem = {
            id: item.id,
            desc: text,
            pictures: item.pictures,
            name: item.name
           }
        setItems([...updatedItems, newitem ]);
        
       
       } 
    
    }
    const addpicture = (id) => {
        let item = items.filter((e) => {
            return e.id == id
           })[0];
           
           let updatedItems = items.filter((e) => {
            return e.id != id
           });

           let newitem = {
            id: item.id,
            desc: item.desc,
            pictures: Math.random() * 10000,
            name: item.name
           }

           setItems([...updatedItems, newitem]);

     
    }

    const deletItem =(id) => {
        
        let updatedItems = items.filter((e) => {
            return e.id != id
           });
        
        setItems([...updatedItems]);
        console.log(items);
    }
    

    const goLive = () => {
        console.log(items);
    }
    const reItems = () => {
        if(items.length > 0 ) {
        return (
        <ScrollView contentContainerStyle={{alignItems: 'center'}}>
        {
        items.map((index) => {
        
           return(
            <View style={{width: '100%', alignItems: 'center',marginTop: 6}} key={index.id}>
                <View style={styles.viewHeader}>
                        <Text style={styles.picturesView}> new item </Text>


                    <TouchableOpacity onPress={() => {deletItem(index.id)}}>
                        <Feather name="x" size={30} color="white" />
                    </TouchableOpacity>
                </View>
                
                {  items[index.id].pictures == '' ? (
                <TouchableOpacity style={styles.addPictures} onPress={() => {addpicture(index.id)}}>
                    <Text style={{color: 'white', fontSize: 15}}> add pictures </Text>
                    <Fontisto name="picture" size={25} color="white" />
                </TouchableOpacity>
                ) : (
                    <View style={styles.addPictures}>
                        <Text style={{color: 'white', fontSize: 15, textDecorationLine: "underline"}}> pictures added </Text>
                        <FontAwesome name="check-square-o" size={24} color="white" />
                     </View>
                ) }
                <TextInput  value={items[index.id].name}  placeholder='item name' style={styles.textInput} onChangeText={(text) => {changeItemText(index.id,"name", text )}}/>
                <TextInput  value={items[index.id].desc}   multiline numberOfLines={4} placeholder='item descripition' style={styles.textInput} onChangeText={(text) => {changeItemText(index.id,"desc", text )}}/>
            </View>
           )
         })
        }
        <TouchableOpacity style={styles.button} onPress={goLive}>
            <Text style={{color: 'white', textAlign: 'center', marginLeft: 4, marginRight: 4, marginTop: 4}}> Next </Text>
            <AntDesign name="arrowright" size={24} color="white" style={{marginLeft: 4, marginRight: 4}} />
        </TouchableOpacity>
         </ScrollView>
        )

        } else {
            return (
                <Text style={{color: 'white', fontSize: 25}}> no items yet</Text>
            )
        }
    }
   const addItem = () => {
    setID(id + 1)
    let item =  {id ,name: '', desc: '', pictures: ''}
    setItems([...items, item]);
   }
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
            
            
            {reItems()}
            
            
            <View style={styles.itemsNumber}>
                <TouchableOpacity onPress={addItem}>
                <Text style={styles.t_txt}> add an item + </Text>
                </TouchableOpacity>
            </View>
            
        </View>
    )
}