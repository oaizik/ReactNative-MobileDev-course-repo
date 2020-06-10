import React from 'react'
import { StyleSheet, Text, View, FlatList, Image, TouchableHighlight } from 'react-native'
import PropTypes from 'prop-types'

function ListView(props) {
  const { data, favorites, getImages, navigation } = props

  return (
    <View>
      <FlatList
        style={favorites ? null : styles.scroll}
        data={data}
        renderItem={({ item }) => (
          <TouchableHighlight
            style={styles.image}
            onPress={() => navigation.navigate('Image', { item })}
          >
            <Image
              style={styles.gridImg}
              source={{
                uri: item.previewURL
              }}
            />
          </TouchableHighlight>
        )}
        numColumns={3}
        keyExtractor={(item) => item.id}
      />
      {favorites && (
        <Text style={styles.linkText} onPress={() => getImages()}>
          return to Image browser
        </Text>
      )}
    </View>
  )
}
const styles = StyleSheet.create({
  linkText: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 5,
    marginBottom: 5,
    textDecorationLine: 'underline',
    textDecorationColor: 'black'
  },
  gridImg: {
    height: 120,
    width: '100%',
    maxWidth: 120
  },
  image: {
    width: '33%',
    padding: 5
  },
  scroll: {
    marginBottom: 220
  }
})

ListView.propTypes = {
  data: PropTypes.array.isRequired,
  favorites: PropTypes.bool.isRequired,
  getImages: PropTypes.func.isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired
  }).isRequired
}
export default ListView
