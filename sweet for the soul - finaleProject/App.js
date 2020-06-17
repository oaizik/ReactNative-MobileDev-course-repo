import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Platform, Image } from 'react-native';
import HomeScreen from './components/HomeScreen';
import MapScreen from './components/MapScreen/MapScreen';
import ProfilePage from './components/ProfilePage/ProfilePage';
import InfoScreen from './components/InfoScreen';
import MyDeliverysScreen from './components/MyDeliverysScreen/MyDeliverysScreen';
import { Provider } from 'react-redux'
import store from './redux/store';
import Navigator from './components/Navigator';

export default function App() {

  const [navIndicator, setNavIndicator] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // false by default

  return (
    <Provider store={store}>
      <View style={styles.container}>
        <SafeAreaView style={styles.safe} />
        <View style={styles.header}>
          <View style={styles.logo}>
            <Image style={styles.image} source={{uri: 'https://images.unsplash.com/photo-1587668178277-295251f900ce?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', }} />
          </View>
          <Text style={styles.headerText}>Making Sweet For The Soul</Text>
        </View>
        {navIndicator === 0 && <HomeScreen />}
        {navIndicator === 1 && <InfoScreen />}
        {navIndicator === 2 && <MyDeliverysScreen />}
        {navIndicator === 3 && <MapScreen />}
        {navIndicator === 4 && <ProfilePage isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setNavIndicator={setNavIndicator}/>}
        <Navigator navIndicator={navIndicator} setNavIndicator={setNavIndicator} isLoggedIn={isLoggedIn} />
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  safe: {
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? 30 : 0
  },
  header: {
    height: 50,
    width: '100%',
    backgroundColor: 'palevioletred',
    display: 'flex',
    justifyContent: 'center'
  },
  logo: {
    width: 35,
    height: 35,
    position: 'absolute',
    left: 7,
    top: 9,
  },
  image: {
    width: 35,
    height: 35,
    borderRadius: 50,
  },
  headerText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 20,
    fontWeight: '700',
  }
});
