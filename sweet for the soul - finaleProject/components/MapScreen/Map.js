import React from 'react';
import { StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import flagBlueImg from '../../assets/flag-blue.png';
import flagPinkImg from '../../assets/flag-pink.png';

function Map(props) {
  const { location, data, openPage } = props;
  
  return (
    <MapView
      style={styles.container}
      initialRegion={{
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01
      }}
    >
      <Marker
        title="home"
        key={0}
        coordinate={{
          latitude: location.latitude,
          longitude: location.longitude
        }}
        image={flagBlueImg}
      />
      {data && data.map((item, i) => (
        <Marker
          onPress={() => openPage(item._id)}
          title={item.receiverName}
          key={item._id}
          coordinate={{
            latitude: item.coordinates.latitude,
            longitude: item.coordinates.longitude
          }}
          image={flagPinkImg}
        />
      ))}
    </MapView>
  )
};

const styles = StyleSheet.create({
  container: {
    width: 400,
    height: 700
  }
});

export default Map