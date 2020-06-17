import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Dialog from "react-native-dialog";
import consts from '../../consts/consts.json';

function DeliveryDialog(props) {
  const { page, name, address, info, type, deleteTaskClicked, completeTaskClicked, setPage, cId } = props;

  return (
    <Dialog.Container visible={page} contentStyle={styles.dialogStyle}>
      <Image style={styles.dialogImage} source={{uri: consts.dialog_image, }} />
      <Text style={styles.paperHeadText}>{name}</Text>
      <Text style={styles.paperSectionText}>Address: {address}</Text>
      <Text style={styles.paperSectionText}>Info: {info}</Text>
      <Text style={styles.paperSectionText}>Type: {type}</Text>
      <View style={styles.iconsContainer}>
        <Icon name='thumbs-down' size={50} color='red' onPress={() => deleteTaskClicked(cId)}/>
        <Icon name='thumbs-up' size={50} color='green' onPress={() => completeTaskClicked(cId)}/>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.iconsText}>Remove</Text>
        <Text style={styles.iconsText}>Delivered</Text>
      </View>
      <Dialog.Button label="Cancel" style={{marginTop: 50}} onPress={() => setPage(false)}/>
    </Dialog.Container>
  );
}

const styles = StyleSheet.create({
  contentStyle: {
    height: 60,
    display: 'flex',
    justifyContent: 'space-between',
  },
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
    justifyContent: 'space-between',
    marginTop: 40,
    margin: 30
  },
  textContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 20,
    marginRight: 20
  },
  iconsText: {
    textAlign: 'left',
    fontSize: 18
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 50,
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

export default DeliveryDialog