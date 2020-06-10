import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Trophys(props) {
  const { numOfDeliverys, name } = props;

  return (
    <View style={styles.content}>
    <Text style={styles.headText}>{`Hi ${name}`}</Text>
    <Text style={styles.sectionText}>
        We are happy that you are part of our venture!
        with your help we continue to make our community feel and improve the Mutual responsibility in our society.
    </Text>
    <Text style={styles.headText}>My Badges:</Text>
    <View style={styles.badgesContainer}>
        <View style={styles.flexRow}>
        <Icon name='trophy' size={50} color='palevioletred' style={styles.trophys}/>
        <Text style={styles.flexText}>welcome! you are awesome</Text>
        </View>
        <View style={styles.flexRow}>
        <Icon name='trophy' size={50} color={numOfDeliverys > 9 ? 'palevioletred' : 'gray'} style={styles.trophys}/>
        <Text style={styles.flexText}>10 sweet deliverys, keep going!</Text>
        </View>
        <View style={styles.flexRow}>
        <Icon name='trophy' size={50} color={numOfDeliverys > 24 ? 'palevioletred' : 'gray'} style={styles.trophys}/>
        <Text style={styles.flexText}>25 sweet deliverys, you are unstopable!</Text>
        </View>
        <View style={styles.flexRow}>
        <Icon name='trophy' size={50} color={numOfDeliverys > 49 ? 'palevioletred' : 'gray'} style={styles.trophys}/>
        <Text style={styles.flexText}>50 sweet deliverys, baking machine!</Text>
        </View>
        <View style={styles.flexRow}>
        <Icon name='trophy' size={50} color={numOfDeliverys > 74 ? 'palevioletred' : 'gray'} style={styles.trophys}/>
        <Text style={styles.flexText}>75 sweet deliverys, are you a humen or an angel?</Text>
        </View>
        <View style={styles.flexRow}>
        <Icon name='trophy' size={50} color={numOfDeliverys > 99 ? 'palevioletred' : 'gray'} style={styles.trophys}/>
        <Text style={styles.flexText}>100 sweet deliverys, we bet your parents are so proud!</Text>
        </View>
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '80%',
    marginTop: 20
  },
  headText: {
    fontSize: 20,
    marginTop: 20
  },
  sectionText: {
    textAlign: 'center',
    width: '100%',
    fontSize: 16,
    marginTop: 20
  },
  badgesContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '96%',
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row'
  },
  flexText: {
    fontSize: 12,
    marginTop: 23,
    width: '80%',
    fontFamily: 'monospace',
  },
  trophys: {
    margin: 10
  }
});
