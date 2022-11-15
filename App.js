import { StatusBar } from 'expo-status-bar';
import { useRef, useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MainScreen from './components/screens/MainScreen';
import MapScreen from './components/screens/MapScreen';
import { Provider as PaperProvider } from 'react-native-paper';
import LangContextProvider from './components/data/LangContext';
import DataContextProvider from './components/data/data';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import * as Location from 'expo-location';
import PostModal from './components/screens/PostModal';


Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function App() {

  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const [location, setLocation] = useState(null);
  const notificationListener = useRef();
  const responseListener = useRef();
  const Stack = createNativeStackNavigator();

  useEffect(() => {

    // get location
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location.coords);
      

    })();

   // get device token

    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

   

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  // uploads device token and device location to firebase;

  /* 
 */

  return (
          <PaperProvider>
          <LangContextProvider>
            <DataContextProvider>
              <View style={styles.container}>
              <NavigationContainer>
                    <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
                      <Stack.Screen name="Home" component={MainScreen} />
                      <Stack.Screen name="Map" component={MapScreen} />
                      <Stack.Screen name="Post" component={PostModal} />
                    </Stack.Navigator>
              </NavigationContainer>  
                  
                <StatusBar style="auto" />
              </View>
            </DataContextProvider>
          </LangContextProvider>
        </PaperProvider>
  );
}

async function registerForPushNotificationsAsync() {
  let token;
  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
