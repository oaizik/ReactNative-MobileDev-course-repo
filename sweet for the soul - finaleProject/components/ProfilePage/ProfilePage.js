import React, { useState } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { connect } from 'react-redux';
import { setUser } from '../../redux/actions/userActions';
import consts from '../../consts/consts.json';
import Trophys from './Trophys/Trophys';
import LoadingIndicator from '../LoadingIndicator';
import Form from './Form';
import api from '../../api';

function ProfilePage(props) {
  const { isLoggedIn, setIsLoggedIn, user } = props;
  const [userName, setUserName] = useState(undefined);
  const [userPhone, setUserPhone] = useState(undefined);
  const [userAddress, setUserAddress] = useState(undefined);
  const [userEmail, setUserEmail] = useState(undefined);
  const [userPassword, setUserPassword] = useState(undefined);
  const [form, setForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const changeUserName = val => {
    setUserName(val);
  };
  const changeUserPhone = val => {
    setUserPhone(val);
  };
  const changeUserAddress = val => {
    setUserAddress(val);
  };
  const changeUserEmail = val => {
    setUserEmail(val);
  };
  const changeUserPassword = val => {
    setUserPassword(val);
  };
  
  const authenticateUser = async () => {
    setIsLoading(true);
    if(!form) {
      const fetch = await api.userSignin(userEmail, userPassword);
      if(fetch === 'error') {
        alert('authentication error, please try again or contact us if this issue continue');
      } else {
        await props.setUser(fetch);
        setIsLoggedIn(true);
      }
    } else {
      const fetch = await api.userSingup(userName, userEmail, userPassword, userPhone, userAddress);
      if(fetch === 'error') {
        alert('authentication error, please try again or contact us if this issue continue');
      } else {
        await props.setUser(fetch);
        setIsLoggedIn(true);
      }
    }
    setIsLoading(false);
  };

  return (
    <View style={styles.container}>
      {isLoading && <LoadingIndicator text={'waiting for authenticatation...'} />}
      <Image style={styles.image} source={{uri: consts.background_image, }} />
      {isLoggedIn ? 
        (<Trophys name={user.name} numOfDeliverys={user.numOfDeliveries} />)
          :
        (<Form  form={form} setForm={setForm} changeUserName={changeUserName} changeUserPhone={changeUserPhone} changeUserEmail={changeUserEmail} changeUserPassword={changeUserPassword} changeUserAddress={changeUserAddress} authenticateUser={authenticateUser} />)
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%'
  },
  image: {
    width: 400, 
    height: '100%', 
    position: 'absolute',
    opacity: 0.2
  }
});

const mapStateToProps = (state) => ({
  user: state.user.user
});

export default connect(mapStateToProps, { setUser })(ProfilePage)

