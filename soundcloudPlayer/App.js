import * as React from 'react'
import { StyleSheet, SafeAreaView, Platform, View } from 'react-native'
import { Provider } from 'react-redux'
import { store } from './redux/redux'
import MainView from './components/MainView'

export default function App() {
  return (
    <Provider store={store}>
      <View>
        <SafeAreaView style={styles.safe} />
        <MainView />
      </View>
    </Provider>
  )
}

const styles = StyleSheet.create({
  safe: {
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? 30 : 0
  }
})
