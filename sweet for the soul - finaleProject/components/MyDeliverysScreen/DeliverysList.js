import React from 'react';
import { StyleSheet, Image, ScrollView } from 'react-native';
import { ListItem } from 'react-native-elements';
import consts from '../../consts/consts.json';

function DeliverysList(props) {
  const { data, openPage } = props;

  return (
    <ScrollView style={styles.scroll}>
      {data.map((item, i) => (
        <ListItem
        onPress={() => openPage(item._id)}
        key={item._id}
        leftIcon={<Image style={styles.image} source={{uri: consts.cake_avatat, }} />}
        title={item.receiverName}
        titleStyle={styles.titleStyle}
        subtitle={'type: ' + item.receiverType}
        subtitleStyle={styles.subtitleStyle}
        contentContainerStyle={styles.contentStyle}
        containerStyle={styles.containerStyle}
        topDivider
        pad={30}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  contentStyle: {
    height: 60,
    display: 'flex',
    justifyContent: 'space-between',
  },
  titleStyle: {
    fontSize: 18
  },
  subtitleStyle: {
    fontSize: 12
  },
  scroll: {
    width: '90%',
    marginTop: 20,
    marginBottom: 100
  },
  containerStyle: {
    width: '100%',
    borderRadius: 10,
    opacity: 0.8
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 50,
  }
});

export default DeliverysList