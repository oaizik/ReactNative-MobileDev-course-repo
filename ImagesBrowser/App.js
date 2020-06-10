import * as React from 'react'
import { StyleSheet, SafeAreaView, Platform } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import MainView from './components/MainView'
import ImageView from './components/ImageView.js'
const Stack = createStackNavigator()
export default function RootStackScreen() {
  return (
    <NavigationContainer>
      <SafeAreaView style={styles.safe} />
      <Stack.Navigator screenOptions={{ headerTitleAlign: 'center' }}>
        <Stack.Screen
          component={MainView}
          name="Home view"
          options={{
            title: 'Images Browser',
            headerTitleStyle: {
              fontWeight: 'bold',
              paddingBottom: 30
            },
            headerStyle: {
              backgroundColor: '#ffa07a'
            },
            headerTintColor: '#000'
          }}
        />
        <Stack.Screen
          name="Image"
          component={ImageView}
          options={{
            title: 'Image Page',
            headerTitleStyle: {
              fontWeight: 'bold',
              paddingBottom: 30
            },
            headerStyle: {
              backgroundColor: '#ffa07a'
            },
            headerTintColor: '#000'
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  safe: {
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? 30 : 0
  }
})
