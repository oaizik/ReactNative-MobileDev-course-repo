import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, ActivityIndicator } from 'react-native';
import { ListItem } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import Dialog from "react-native-dialog";
import { connect } from 'react-redux';
import consts from '../consts/consts.json';

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
    const requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    let response = await fetch(`${consts.server_url}/delivery/open/user/${user._id}`, requestOptions)
      .then(response => response.json())
      .catch(error => console.log('error', error));
    if (response.length > 0) {
      setData(response);
    };
    setIsLoading(false)
  };

  useEffect(() => {
    fetchData(); 
  }, [])

  const deleteTaskClicked = async (selectedId) => {
    setData(data.filter(item => item._id !== selectedId));
    // API call to update task, delete userId from delivery
    const requestOptions = {
      method: 'POST',
      redirect: 'follow'
    };
    fetch(`https://sweet-for-the-soul-server.herokuapp.com/delivery/cancelAssign/${selectedId}`, requestOptions)
      .then(response => response.json())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
    // do somthing bad for the user
    setPage(false);
  };
  const completeTaskClicked = async (selectedId) => {
    setData(data.filter(item => item._id !== selectedId));
    // API call to complete delivery
    const requestOptions = {
      method: 'POST',
      redirect: 'follow'
    };
    fetch(`${consts.server_url}/delivery/complete/${selectedId}`, requestOptions)
      .then(response => response.json())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
    // API call to increment user deliverys number
    fetch(`${consts.server_url}/user/incdeliveries/${user._id}`, requestOptions)
      .then(response => response.json())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
    // do somthing nice for the user
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
      {isLoading && <View styles={styles.indicator}>
          <ActivityIndicator size={100} color="#8b0000" />
          <Text style={styles.indicatorText}> fetching deliverys... </Text>
        </View>
      }
      <Image style={styles.backgroundImage} source={{uri: consts.background_image, }} />
      <Text style={styles.sectionText}>Sweet Deliverys</Text>
      {data === undefined && <Text style={styles.errorText}>no deliverys to show</Text>}
      {data && <ScrollView style={styles.scroll}>
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
      </ScrollView>}
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
  backgroundImage: {
    width: 400, 
    height: '100%', 
    position: 'absolute',
    opacity: 0.2
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
  },
  indicator: {
    marginTop: 130
  },
  indicatorText: {
    textAlign: 'center',
    marginTop: 40,
    fontSize: 30
  }
});

const mapStateToProps = (state) => ({
  user: state.user.user
});

export default connect(mapStateToProps)(MyDeliverysScreen)