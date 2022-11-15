import React, { useState, createContext } from 'react';
import { firebase } from '../data/firebaseConfig';


export const dataContext = createContext();

const DataContextProvider = ({children}) => {
   
   const [radius, setRadius ] = useState(500)

   const [postMarkerData, setMarkersData ] = useState([]);

   const getMarkersData = () => {
    (async ()  => {

        AsyncStorage.clear();
  
       let done = await firebase.database()
        .ref('Deals/')
        .once('value')
        .then(snapshot => {
          setData(snapshot.val());
          return true;
        }); 
  
        return done;
        
       })();

   }
    
   const modRadius = (val) => {
    setRadius(val)
   }
    
    return ( 
        <dataContext.Provider value={{ radius, modRadius, postMarkerData, getMarkersData }}>
            { children  }
        </dataContext.Provider>
     );
}
 
export default DataContextProvider;