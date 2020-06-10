import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ActivityIndicator, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import flagBlueImg from '../assets/flag-blue.png';
import flagPinkImg from '../assets/flag-pink.png';
import Icon from 'react-native-vector-icons/FontAwesome';
import Dialog from "react-native-dialog";
import { connect } from 'react-redux';
import consts from '../consts/consts.json';

function MapScreen(props) {
  const { user } = props;
  const [data, setData] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [location, setLocation] = useState(undefined);
  const [geocode, setGeocode] = useState(undefined);
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [cId, setCId] = useState(0);
  const [page, setPage] = useState(false);
  const [name, setName] = useState(undefined);
  const [address, setAddress] = useState(undefined);
  const [info, setInfo] = useState(undefined);
  const [type, setType] = useState(undefined);

  const fetchData = async () => {
    const requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    let response = await fetch(`${consts.server_url}/delivery/open`, requestOptions)
      .then(response => response.json())
      .catch(error => console.log('error', error));
    if (response.length > 0) {
      setData(response);
      console.log(response);
    };
    // setIsLoading(false)
  };

  const openPage = (selectedId) => {
    setCId(selectedId);
    const task = data.filter((item) => item._id === selectedId)
    setName(task[0].receiverName)
    setAddress(task[0].address)
    setInfo(task[0].info)
    setType(task[0].receiverType)
    setPage(true)
  };

  const assignTaskClicked = async (selectedId) => {
    setData(data.filter(item => item._id !== selectedId));
    // API call to assign delivery
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const raw = JSON.stringify({"userId":`${user._id}`});
    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    fetch(`${consts.server_url}/delivery/assign/${selectedId}`, requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
    // do somthing good for the user
    setPage(false);
  };

  const getGeocodeAsync = async (location) => {
    const geocode = await Location.reverseGeocodeAsync(location)
    setGeocode({ geocode })
  };

  const getLocationAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION)
    if (status !== 'granted') {
      setErrorMessage('Permission to access location was denied')
    };
    const location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Highest })
    const { latitude, longitude } = location.coords
    await getGeocodeAsync({ latitude, longitude })
    setLocation({ latitude, longitude })
    setIsLoading(false)
  };

  useEffect(() => {
    if (location === undefined) {
      getLocationAsync()
    }
    fetchData(); 
  }, [location]);

  return (
    <View>
      {isLoading && (
        <View styles={styles.indicator}>
          <ActivityIndicator size={100} color="#8b0000" />
          <Text style={styles.indicatorText}> loading map... </Text>
        </View>
      )}
      {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}
      {location && <MapView
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
      }
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
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    width: 400,
    height: 700
  },
  errorText: {
    fontSize: 26
  },
  paper: {
    position: 'absolute',
    minHeight: 450,
    height: '40%',
    minWidth: 300,
    width: '90%',
    marginLeft: '5%',
    backgroundColor: 'white',
    top: 45,
    zIndex: 3,
    opacity: 0.9,
    borderRadius: 20
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
  indicator: {
    marginTop: 130
  },
  indicatorText: {
    textAlign: 'center',
    marginTop: 40,
    fontSize: 30
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

const mapStateToProps = (state) => ({
  user: state.user.user
});

export default connect(mapStateToProps)(MapScreen)