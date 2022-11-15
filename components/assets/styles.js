import { StyleSheet } from "react-native"

export default StyleSheet.create({
    container: {
        flex: 1,
        
        /* backgroundColor: 'rgba(0, 0, 0, 0.06)', */
        
    },
    insideContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 4
    },
   
    button: {
        backgroundColor: 'rgba(73, 48, 95, 1)',
        padding: 8,
        borderRadius: 5,
        marginTop: 5,
        marginBottom: 5,
        width: '80%',
        flexDirection: 'row',
        justifyContent: 'center'
        
        
    },
    selector: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    t_txt: {
        color: 'white',
        fontSize: 15,
        padding: 5,
        alignSelf: 'flex-start',
        borderRadius: 5, 
        marginLeft: 8,
        marginTop: 8,
        margin: 5
    },
    pick_time: {
        flexDirection: 'row',
        width: '100%'
    
    },
    datePickerStyle: {
        width: 200,
        marginTop: 20,
      },
      main_modal: {
       alignItems: 'center',
       height:'100%',
       /* justifyContent: 'center', */
       paddingTop: 30
       
       
      },
      main_button: {
       height: 180,
       borderColor: 'grey',
       /* borderTopWidth: 1, */
       /* borderBottomWidth: 1, */
       borderStyle: 'dashed',
       width: '90%',
       justifyContent: 'center',
      /*  backgroundColor: 'white', */
       borderRadius: 5,
       marginBottom: 8,
       marginTop: 8,
       borderRadius: 12,
       overflow: 'hidden',
       borderWidth: 1
      },
      dashed_border: {
        borderWidth: .5,
        borderColor: 'rgba(185, 166, 201, 1)',
        borderStyle: 'dashed'
    },
      solid_border: {
        borderWidth: .5,
        borderColor: 'rgba(185, 166, 201, 1)',
        borderStyle: 'solid'
    },
    store_component: {
        flex: 1,
        alignItems: 'center'
    },
    vert_view: {
        flexDirection: 'row',
        
    },
    d_text: {
        textShadowColor: 'black',
        textShadowOffset: {width: -2, height: 2},
        textShadowRadius: 4,
        color: 'white',
        
      },
    big_txt: {
        alignSelf: 'center', fontSize: 25, color: 'white',
        textDecorationLine: 'underline'
    },
    small_txt:{
        alignSelf: 'flex-end', 
        fontSize: 18,
        color: 'rgba(253, 227, 253, 1)',
        marginRight: 15,
        marginTop: 18

    },
    darkbg: {
        backgroundColor: 'rgba(22, 1, 40, 1)'
    },
    SetttingScreen: {
        flex:  1,
        paddingTop: 35,
        
       
       

    },
    settingElement: {
        flexDirection: 'row',
        width: '100%',
        padding: 4,
        marginTop: 8,
        marginBottom: 8,
        paddingLeft: 12,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    settingsText: {
        fontSize: 16,
        textAlign: 'center',
        marginLeft: 6,
        marginRight: 12,
        width: '30%'

    },
    settingOpation: {
        justifyContent: 'center',
        flexDirection: 'row',
        width: '80%',
        alignItems: 'center'
    },
    Event_selector: {
        flexDirection: 'row',
        alignSelf: 'flex-start'
    },
    itemsNumber: {
        flexDirection: 'row',
        width: '100%',
       margin: 4

    },
    textInput: {width: '90%', borderRadius: 5, margin: 4, backgroundColor: 'white', padding: 5, paddingStart: 12},
    addPictures: {
        flexDirection: 'row',
        width: '100%',
        backgroundColor: 'rgba(74, 23, 113, 1)',
        margin: 4,
        padding: 6,
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    picturesView : {color: 'lightgrey', alignSelf: 'flex-start', paddingStart: 15},
    viewHeader: {
        flexDirection: 'row',
        padding: 4,
        justifyContent: 'space-between',
        width: '100%',
        paddingLeft: 4,
        paddingRight: 15
    },
    card: {
        backgroundColor: 'white',
        padding: 8,
        borderRadius: 5,
        shadowColor: 'grey',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 4,
        flexDirection: 'column',
        alignItems: 'center',
        width: '90%',
        margin: 8
    },
    cardItem: {justifyContent: 'flex-start', flexDirection: 'row', width: '100%', paddingLeft: 12}
      
})

