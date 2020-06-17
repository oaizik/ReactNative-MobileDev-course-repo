import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import { connect } from 'react-redux';
import Map from './Map';
import MapDialog from './MapDialog';
import LoadingIndicator from '../LoadingIndicator';
import api from '../../api';

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
    const fetch = await api.fetchOpenDeliverys();
    if(fetch === 'error') {
      alert('error fetching open deliverys, please try again later');
    } else {
      setData(fetch);
    };
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
    const response = await api.assignDelivery(selectedId, user._id);
    if(response.address) {
      // do somthing nice for the user
    } else {
      alert('error while assigning delivery, please try later');
    }
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
      {isLoading && <LoadingIndicator text={'loading map...'} />}
      {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}
      {location && <Map location={location} data={data} openPage={openPage} />}
      <MapDialog page={page} name={name} address={address} info={info} type={type} assignTaskClicked={assignTaskClicked} setPage={setPage} cId={cId} />
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
  }
});

const mapStateToProps = (state) => ({
  user: state.user.user
});

export default connect(mapStateToProps)(MapScreen)