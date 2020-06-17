import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Dialog from "react-native-dialog";
import consts from '../../consts/consts.json';

function MapDialog(props) {
  const { page, name, address, info, type, assignTaskClicked, setPage, cId } = props;
  
  return (
    <Dialog.Container visible={page} contentStyle={styles.dialogStyle}>
      <Image style={styles.dialogImage} source={{uri: consts.dialog_image, }} />
      <Text style={styles.paperHeadText}>{name}</Text>
      <Text style={styles.paperSectionText}>Address: {address}</Text>
      <Text style={styles.paperSectionText}>Info: {info}</Text>
      <Text style={styles.paperSectionText}>Type: {type}</Text>
      <View style={styles.iconsContainer}>
        <Icon name='plus-circle' size={50} onPress={() => assignTaskClicked(cId)}/>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.iconsText}>Sign me up!</Text>
      </View>
      <Dialog.Button label="Cancel" style={{marginTop: 50}} onPress={() => setPage(false)}/>
    </Dialog.Container>
  )
};

const styles = StyleSheet.create({
  paperHeadText: {
    marginTop: 10,
    marginBottom: 30,
    textAlign: 'center',
    fontSize: 26
  },
  paperSectionText: {
    marginTop: 20,
    marginLeft: 20,
    textAlign: 'left',
    fontSize: 18
  },
  iconsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 70,
    margin: 30,
    marginBottom: 5
  },
  textContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  iconsText: {
    textAlign: 'left',
    fontSize: 18
  },
  dialogStyle: {
    borderRadius: 20,
    opacity: 0.9
  },
  dialogImage: {
    width: '100%', 
    height: '110%', 
    position: 'absolute',
    opacity: 0.2
  }
});

export default MapDialog