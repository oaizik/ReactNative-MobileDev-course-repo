import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import consts from '../consts/consts.json';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{uri: consts.home_image, }} />
      <Text style={styles.sectionText}>
        We are an initiative to relieve loneliness in the company by baking and distributing cakes on weekends
      </Text>
      <Text style={styles.sectionText}>
        Every Friday, we delight hundreds of lonely people and fill with a sense of pride and mutual guarantee
      </Text>
      <Text style={styles.sectionText}>
        Come join us If you want to help us by baking the world a better place!
      </Text>
      <Text style={styles.sectionText}>
        We currently operate in 12 different locations around the country! including:
      </Text>
      <View style={styles.textWrap}>
        <Text style={styles.cities}> Tel-Aviv </Text>
        <Text style={styles.cities}> Ramat-Gan </Text>
        <Text style={styles.cities}> Netanya </Text>
        <Text style={styles.cities}> Raa'nana </Text>
        <Text style={styles.cities}> Hertzelya </Text>
        <Text style={styles.cities}> Kfar-Saba </Text>
        <Text style={styles.cities}> Rehovot </Text>
        <Text style={styles.cities}> Hedera </Text>
        <Text style={styles.cities}> Jerusalem </Text>
        <Text style={styles.cities}> Beer-Sheva </Text>
        <Text style={styles.cities}> Modi'in </Text>
        <Text style={styles.cities}> Ha'Shomron </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    backgroundColor: '#efefff'
  },
  sectionText: {
    textAlign: 'center',
    width: '80%',
    fontSize: 16,
    marginTop: 20,
    fontFamily: 'Roboto'
  },
  textWrap: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '76%',
    justifyContent: 'space-between',
    marginTop: 15
  },
  cities: {
    width: '26%',
    margin: 10,
    fontWeight: '700',
    fontSize: 10,
    fontFamily: 'monospace',
    textAlign: 'center'
  },
  image: {
    width: 400, 
    height: 200, 
    zIndex: 2
  }
});