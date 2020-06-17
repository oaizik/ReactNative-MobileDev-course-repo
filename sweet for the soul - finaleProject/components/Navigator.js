import React from 'react';
import { StyleSheet, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export default function Navigetor(props) {
  const { navIndicator, setNavIndicator, isLoggedIn } = props;

  return (
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
  );
}

const styles = StyleSheet.create({
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
