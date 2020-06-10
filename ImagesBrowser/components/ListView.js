import React from 'react'
import { StyleSheet, ScrollView, Text } from 'react-native'
import { ListItem } from 'react-native-elements'
import PropTypes from 'prop-types'

function ListView(props) {
  const { data, favorites, getImages } = props

  return (
    <ScrollView style={styles.scroll}>
      {data.map((item, i) => (
        <ListItem
          key={i}
          leftAvatar={{ rounded: true, size: 'large', source: { uri: item.previewURL } }}
          title={item.user}
          titleStyle={styles.titleStyle}
          subtitle={'views: ' + item.views + '  likes: ' + item.likes}
          subtitleStyle={styles.subtitleStyle}
          contentContainerStyle={styles.contentStyle}
          topDivider
          pad={30}
        />
      ))}
      {favorites && (
        <Text style={styles.linkText} onPress={() => getImages()}>
          return to Image browser
        </Text>
      )}
    </ScrollView>
  )
}
const styles = StyleSheet.create({
  contentStyle: {
    height: 60,
    display: 'flex',
    justifyContent: 'space-between'
  },
  titleStyle: {
    fontSize: 22
  },
  subtitleStyle: {
    fontSize: 16
  },
  scroll: {
    marginBottom: 220
  },
  linkText: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 5,
    marginBottom: 5,
    textDecorationLine: 'underline',
    textDecorationColor: 'black',
  }
})

ListView.propTypes = {
  data: PropTypes.array.isRequired,
  favorites: PropTypes.bool.isRequired,
  getImages: PropTypes.func.isRequired
}
export default ListView
