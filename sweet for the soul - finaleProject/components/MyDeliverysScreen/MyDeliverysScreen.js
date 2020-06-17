import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { connect } from 'react-redux';
import consts from '../../consts/consts.json';
import DeliveryDialog from './DeliveryDialog';
import DeliverysList from './DeliverysList';
import LoadingIndicator from '../LoadingIndicator';
import api from '../../api';

function MyDeliverysScreen(props) {
  const { user } = props;
  const [data, setData] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [cId, setCId] = useState(0);
  const [page, setPage] = useState(false);
  const [name, setName] = useState(undefined);
  const [address, setAddress] = useState(undefined);
  const [info, setInfo] = useState(undefined);
  const [type, setType] = useState(undefined);

  const fetchData = async () => {
    const fetch = await api.fetchUserDeliverys(user._id);
    if(fetch === 'error') {
      alert('error fetching open deliverys, please try again later');
    } else {
      setData(fetch);
    };
    setIsLoading(false)
  };

  useEffect(() => {
    fetchData(); 
  }, [])

  const deleteTaskClicked = async (selectedId) => {
    setData(data.filter(item => item._id !== selectedId));
    const response = await api.removeDelivery(selectedId);
    if(response.address) {
      // do somthing nice for the user
    } else {
      alert('error while assigning delivery, please try later');
    }
    setPage(false);
  };

  const completeTaskClicked = async (selectedId) => {
    setData(data.filter(item => item._id !== selectedId));
    const response = await api.completeDelivery(selectedId, user._id);
    const inc = await api.completeDelivery(selectedId, user._id);
    if(response.address && inc.address) {
      // do somthing nice for the user
    } else {
      alert('error while updating delivery, please try again later');
    }
    setPage(false);
  };
  
  const openPage = async (selectedId) => {
    setCId(selectedId);
    let task = await data.filter(item => item._id === selectedId);
    setName(task[0].receiverName);
    setAddress(task[0].address);
    setInfo(task[0].info);
    setType(task[0].receiverType);
    setPage(true);
  };

  return (
    <View style={styles.container}>
      {isLoading && <LoadingIndicator text={'fetching deliverys...'} />}
      <Image style={styles.backgroundImage} source={{uri: consts.background_image, }} />
      <Text style={styles.sectionText}>Sweet Deliverys</Text>
      {data === undefined && !isLoading && <Text style={styles.errorText}>no deliverys to show</Text>}
      {data && <DeliverysList data={data} openPage={openPage} />}
      <DeliveryDialog cId={cId} page={page} name={name} address={address} info={info} type={type} deleteTaskClicked={deleteTaskClicked} completeTaskClicked={completeTaskClicked} setPage={setPage} />
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
    fontSize: 18,
    marginTop: 20
  },
  errorText: {
    textAlign: 'center',
    width: '80%',
    fontSize: 14,
    marginTop: 70
  },
  backgroundImage: {
    width: 400, 
    height: '100%', 
    position: 'absolute',
    opacity: 0.2
  }
});

const mapStateToProps = (state) => ({
  user: state.user.user
});

export default connect(mapStateToProps)(MyDeliverysScreen)