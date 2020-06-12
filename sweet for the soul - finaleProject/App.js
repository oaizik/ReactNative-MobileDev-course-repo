import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Platform, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import HomeScreen from './components/HomeScreen';
import MapScreen from './components/MapScreen';
import ProfilePage from './components/ProfilePage';
import InfoScreen from './components/InfoScreen';
import MyDeliverysScreen from './components/MyDeliverysScreen';
import { Provider } from 'react-redux'
import store from './redux/store';

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

        <View style={styles.nav}>
          <View style={styles.navItem}>
            <FontAwesome name="user-circle-o" size={30} color={navIndicator === 4 ? "purple" : "black"} onPress={() => setNavIndicator(4)} />
          </View>
          {isLoggedIn && <View style={styles.navItem}>
            <FontAwesome name="map-o" size={30} color={navIndicator === 3 ? "purple" : "black"} onPress={() => setNavIndicator(3)} />
          </View>}
          {isLoggedIn && <View style={styles.navItem}>
            <FontAwesome name="calendar-check-o" size={30} color={navIndicator === 2 ? "purple" : "black"} onPress={() => setNavIndicator(2)} />
          </View>}
          <View style={styles.navItem}>
            <FontAwesome name="info-circle" size={30} color={navIndicator === 1 ? "purple" : "black"} onPress={() => setNavIndicator(1)} />
          </View>
          <View style={styles.navItem}>
            <FontAwesome name="home" size={30} color={navIndicator === 0 ? "purple" : "black"} onPress={() => setNavIndicator(0)} />
          </View>
        </View>
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
  },
  nav: {
    height: 50,
    width: '100%',
    position: 'absolute',
    bottom: 1,
    backgroundColor: '#c3c3c3',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  navItem: {
    height: '100%',
    width: 60,
    borderColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  }
});
