import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Image, AsyncStorage, Text } from 'react-native'
import { Button } from 'react-native-elements'
import PropTypes from 'prop-types'

function ImageView({ route }) {
  const { item } = route.params
  const [isLiked, setIsLiked] = useState(false)

  async function getLike() {
    const like = await AsyncStorage.getItem(item.id.toString())
    if (like) {
      setIsLiked(true)
    }
  }
  useEffect(() => {
    getLike()
  }, [])
  async function like() {
    await AsyncStorage.setItem(item.id.toString(), JSON.stringify(item))
    setIsLiked(true)
  }
  async function unLike() {
    await AsyncStorage.removeItem(item.id.toString())
    setIsLiked(false)
  }

  return (
    <View style={styles.container}>
      <Image
        style={styles.largeImage}
        source={{
          uri: item.previewURL
        }}
      />
      {!isLiked && (
        <View>
          <Button
            type="clear"
            icon={{
              name: 'favorite',
              size: 80,
              color: 'gray'
            }}
            onPress={async () => await like()}
          />
          <Text style={styles.text}> add to favorites </Text>
        </View>
      )}
      {isLiked && (
        <View>
          <Button
            type="clear"
            icon={{
              name: 'favorite',
              size: 80,
              color: 'red'
            }}
            onPress={async () => await unLike()}
          />
          <Text style={styles.likedText}> this photo is in favorites </Text>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  largeImage: {
    width: '98%',
    margin: 10,
    height: 400
  },
  text: {
    marginTop: 25,
    fontSize: 22
  },
  likedText: {
    marginTop: 25,
    fontSize: 22,
    color: '#800000'
  }
})

ImageView.propTypes = {
  route: PropTypes.object.isRequired
}
export default ImageView
