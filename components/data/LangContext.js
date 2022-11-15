import React, { useState, createContext } from 'react';


export const LangContext = createContext();

const LangContextProvider = ({children}) => {
   
    const [ lang, setLang ] = useState("arb")
    const [langs, setlangs ] = useState({
        arb: {
            Publish_a_Deal: "انشر عرض",
            deal_on_one_item_type: "عرض في سلعة واحدة",
            Open_a_custom_Event: "انشر حدث مخصص",
            custom_event_for_everyone: "حدث مخصص في اي شئ",
            Open_a_Store: "افتح متجر",
            deal_on_multiple_item_types: "عروض في سلع مختلفة",
            Press_To_Search: "اضغط لتبحث",
            Post_New_Deal: " نشر عرض جديد"
        },
        eng: {
            Publish_a_Deal: "Publish a Deal",
            deal_on_one_item_type:"deal on one item type",
            Open_a_custom_Event:"Open a custom Event",
            custom_event_for_everyone:"custom event for everyone",
            Open_a_Store:"Open a Store",
            deal_on_multiple_item_types:"deal on multiple item types",
            Press_To_Search:"Press To Search",
            Post_New_Deal:"Post New Deal"
        }
    })
    const modLang = (lang) => {
        setLang(lang);
       
    }
 
    
    return ( 
        <LangContext.Provider value={{ ...langs, modLang, lang }}>
            { children  }
        </LangContext.Provider>
     );
}
 
export default LangContextProvider;