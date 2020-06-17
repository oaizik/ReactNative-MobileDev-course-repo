import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Button } from 'react-native-elements';

function Form(props) {
  const { form, setForm, changeUserName, changeUserPhone, changeUserEmail, changeUserPassword, changeUserAddress, authenticateUser } = props;

  return (
    <View style={styles.content}>
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
    </View>
  );
}

const styles = StyleSheet.create({
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
  }
});

export default Form
