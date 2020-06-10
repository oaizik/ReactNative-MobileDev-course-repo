import React, { useState, useEffect } from 'react'
import { StyleSheet, View, ActivityIndicator, AsyncStorage, Text } from 'react-native'
import { SearchBar, Button } from 'react-native-elements'
import PropTypes from 'prop-types'
import ListView from './ListView'
import GridView from './GridView'

function MainView({ navigation }) {
  const [isLoading, setIsLoading] = useState(false)
  const [query, setQuery] = useState('')
  const [feedback, setFeedback] = useState('')
  const [data, setData] = useState([])
  const [favorites, setFavorites] = useState(true)
  const [view, setView] = useState(true)
  const getImages = async () => {
    setIsLoading(true)
    setFavorites(false)
    try {
      const data = await fetch(
        `https://pixabay.com/api/?key=15980102-2219db5694212423a739c1135&per_page=70&q=${query}`
      )
      data
        .json()
        .then((data) => setData(data.hits))
        .then(() => setIsLoading(false))
    } catch (e) {
      console.log(`error ocuured while fetching images: ${e}`)
    }
  }
  const changeView = (viewIndicator) => {
    setIsLoading(true)
    viewIndicator ? setView(true) : setView(false)
    setIsLoading(false)
  }
  useEffect(() => {
    getImages()
  }, [query])
  const getLikes = async () => {
    setFavorites(true)
    setIsLoading(true)
    const imageTempArray = []
    await AsyncStorage.getAllKeys((err, keys) => {
      AsyncStorage.multiGet(keys, (err, storage) => {
        storage.map((result, i, item) => {
          const tempItem = item[i][1]
          imageTempArray.push(JSON.parse(tempItem))
          setData(imageTempArray)
          return result
        })
      })
    })
    setIsLoading(false)
  }
  React.useLayoutEffect(() => {
    navigation.setOptions({
      // eslint-disable-next-line react/display-name
      headerRight: () => (
        <Button
          type="clear"
          icon={{ name: 'favorite', size: 40, color: 'red' }}
          buttonStyle={styles.likeButton}
          onPress={() => getLikes()}
        />
      )
    })
  }, [navigation])

  return (
    <View>
      <View>
        <SearchBar
          style={styles.search}
          placeholder="Search"
          platform="ios"
          onChangeText={(text) => setFeedback(text)}
          value={feedback}
          onSubmitEditing={() => setQuery(feedback)}
          onClear={() => {
            setQuery('all')
          }}
        />
      </View>
      <View style={styles.navButtons}>
        <View style={styles.gridButton}>
          <Button
            title="Grid View"
            type={view ? 'solid' : 'outline'}
            style={styles.navButton}
            onPress={() => changeView(true)}
          />
        </View>
        <View style={styles.gridButton}>
          <Button
            title="List View"
            type={!view ? 'solid' : 'outline'}
            style={styles.navButton}
            onPress={() => changeView(false)}
          />
        </View>
      </View>
      {!data.length && !isLoading && (
        <View>
          <Text style={styles.helpText}>No Result Where Found for:</Text>
          <Text style={styles.helpText}>{feedback}</Text>
        </View>
      )}
      {isLoading ? (
        <View styles={styles.indicator}>
          <ActivityIndicator size={100} color="#8b0000" />
          <Text style={styles.indicatorText}> Fetching Images... </Text>
        </View>
      ) : (
        <View>
          {view ? (
            <GridView
              data={data}
              favorites={favorites}
              navigation={navigation}
              getImages={getImages}
            />
          ) : (
            <ListView data={data} favorites={favorites} getImages={getImages} />
          )}
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  search: {
    height: 40
  },
  indicator: {
    marginTop: 30
  },
  helpText: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 20
  },
  navButtons: {
    height: 40,
    width: '96%',
    flexDirection: 'row',
    alignSelf: 'center',
    marginBottom: 4
  },
  gridButton: {
    height: 40,
    width: '50%'
  },
  navButton: {
    textTransform: 'capitalize'
  },
  indicatorText: {
    textAlign: 'center',
    marginTop: 40,
    fontSize: 30
  },
  likeButton: {
    marginBottom: 35
  }
})

MainView.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    setOptions: PropTypes.func.isRequired
  }).isRequired
}
export default MainView
