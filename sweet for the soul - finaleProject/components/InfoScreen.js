import React from 'react';
import { StyleSheet, Text, View, Linking, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import consts from '../consts/consts.json';

export default function InfoScreen() {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{uri: consts.background_image, }} />
      <Text style={styles.sectionText}>
        Sweet for the soul is a Volunteer Social Initiative to Relieve Loneliness in Society 
        by Baking and Distributing Cakes for People Who Need a Sweet Weekend - Holocaust Survivors, 
        Lone Soldiers and Individual Elderly.
      </Text>
      <Text style={styles.sectionText}>
        Our community already has over 500 volunteers nationwide and we continue to grow!
      </Text>
      <Text style={styles.sectionText}>
        We are attentive here to any problem, suggestion or just to share experiences and keep in touch
      </Text>
      <Text style={styles.contsctText}>
        Feel free to cantact us any time:
      </Text>
      <View style={styles.flexRow}>
        <Icon name='envelope-o' size={44} style={styles.icon} onPress={() => Linking.openURL('mailto:support@sweetSoul.com')}/>
        <Text style={styles.flexText} onPress={() => Linking.openURL('mailto:support@sweetSoul.com')}>support@sweetSoul.com</Text>
      </View>
      <View style={styles.flexRow}>
        <Icon name='whatsapp' size={50} color='#25D366'style={styles.icon}/>
        <Text style={styles.flexText}>+97250743****</Text>
      </View>
      <Text style={styles.contsctText}>
        Find us in the social networks:
      </Text>
      <View style={styles.flexCenteredRow}>
        <Icon name='twitter' size={50} color='#00acee' style={styles.marginIcon}/>
        <Icon name='facebook' size={44} color='#3b5998' style={styles.marginIcon} onPress={() => Linking.openURL('https://www.facebook.com/itosh7')}/>
        <Icon name='instagram' size={50} color='#c13584' style={styles.marginIcon}/>
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
    marginTop: 20
  },
  contsctText: {
    textAlign: 'center',
    width: '80%',
    fontSize: 16,
    marginTop: 30,
    fontWeight: '700',
    fontFamily: 'monospace',
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    width: '70%'
  },
  flexText: {
    marginTop: 23,
    width: '80%',
    fontFamily: 'monospace',
  },
  icon: {
    margin: 10
  },
  marginIcon: {
    margin: 20
  },
  flexCenteredRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '80%',
  },
  image: {
    width: 400, 
    height: '100%', 
    position: 'absolute',
    opacity: 0.2
  }
});