import React from 'react'
import { StyleSheet, ScrollView } from 'react-native'
import { ListItem } from 'react-native-elements'
import PropTypes from 'prop-types'
import { Audio } from 'expo-av'

function ListView(props) {
  const { data } = props

  const playTrack = async (id) => {
    await Audio.setIsEnabledAsync(false)
    await Audio.setIsEnabledAsync(true)
    await Audio.Sound.createAsync(
      {
        uri: `https://api.soundcloud.com/tracks/${id}/stream?client_id=CW62xLA9h8wXrXC1WIaSX9OWA6novVIE`
      },
      { shouldPlay: true }
    )
  }

  return (
    <ScrollView style={styles.scroll}>
      {data.map((item, i) => (
        <ListItem
          key={i}
          leftAvatar={{ rounded: true, size: 'large', source: { uri: item.user.avatar_url } }}
          title={item.title}
          titleStyle={styles.titleStyle}
          subtitle={`genre: ${item.genre ? item.genre : 'undefined'}, likes: ${item.likes_count}`}
          subtitleStyle={styles.subtitleStyle}
          contentContainerStyle={styles.contentStyle}
          topDivider
          pad={30}
          onPress={() => playTrack(item.id)}
        />
      ))}
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
    fontSize: 16
  },
  subtitleStyle: {
    fontSize: 12
  },
  scroll: {
    height: '78%'
  }
})

ListView.propTypes = {
  data: PropTypes.array.isRequired
}
export default ListView
