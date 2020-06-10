import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { setUser } from '../redux/actions/userActions';
import consts from '../consts/consts.json';
import Trophys from './Trophys';

const mockUser = {
  _id: '5edf6d1115a49b0b0d39dc44',
  name: 'Mitzi aizik',
  email: 'mitzi@mail.com',
  password: '1234',
  phone: '0505888999',
  address: 'kibuts Hoquq',
  numOfDeliverys: 15
}

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
      await props.setUser(mockUser);
      // auth new user, returning user object 
      // if authenticate successfuly save the user object in redux -> await props.setUser(user) -> setIsLoggedIn(true);
      // if authentication failed alert the user for wrong credentials;
    } else {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      const raw = JSON.stringify({"name":`${userName}`,"email":`${userEmail}`,"password":`${userPassword}`,"phone":`${userPhone}`,"address":`${userAddress}`,"isAdmin":false});
      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };
      let response = await fetch(`${consts.server_url}/user/signup`, requestOptions)
        .then(response => response.json())
        .catch(error => console.log('authentication error, ', error));
      if(response && response.user) {
        await props.setUser(response.user);
      } else {
        alert('authentication error, please try again or contact us if this issue continue');
      }
    }
    setIsLoggedIn(true);
    setIsLoading(false);
  };

  return (
    <View style={styles.container}>
      {isLoading && 
        (<View styles={styles.indicator}>
          <ActivityIndicator size={100} color="#8b0000" />
          <Text style={styles.indicatorText}> waiting for authenticatation... </Text>
        </View>)
      }
      <Image style={styles.image} source={{uri: consts.background_image, }} />
      {isLoggedIn ? 
        (<Trophys name={user.name} numOfDeliverys={user.numOfDeliverys} />)
          :
        (<View style={styles.content}>
          <Text style={styles.headText}>Let's start sweetening the world</Text>
          <View style={styles.inputs}>
            {form && <Input onChangeText={value => changeUserName(value)} placeholder='Full name' leftIcon={ <Icon name='child' size={24} color='black' /> } />}
            {form && <Input onChangeText={value => changeUserPhone(value)} placeholder='Phone number' leftIcon={ <Icon name='mobile' size={40} color='black' /> } />}
            <Input onChangeText={value => changeUserEmail(value)} placeholder='E-mail' leftIcon={ <Icon name='envelope' size={24} color='black' /> } />
            <Input onChangeText={value => changeUserPassword(value)} placeholder='Password' leftIcon={ <Icon name='user-secret' size={24} color='black' /> } />
            {form && <Input onChangeText={value => changeUserAddress(value)} placeholder='Street, Number, City' leftIcon={ <Icon name='map-signs' size={24} color='black' /> } />}
            <Button onPress={authenticateUser} style={styles.button} title="Submit" type="outline" />
            <Text style={styles.underText} onPress={() => setForm(!form)}>{form ? 'I allready have an account' : 'Dont have an account yet?'}</Text>
          </View>
        </View>)
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
  inputs: {
    marginTop: 30,
    width: '80%'
  },
  button: {
    height: 40,
    width: 200,
  },
  underText: {
    fontSize: 16,
    marginTop: 30,
    textDecorationLine: 'underline',
    textAlign: 'center'
  },
  image: {
    width: 400, 
    height: '100%', 
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

export default connect(mapStateToProps, { setUser })(ProfilePage)