import React, { useState, useEffect } from 'react'
import { StyleSheet, View, ActivityIndicator, Text } from 'react-native'
import { SearchBar, Button } from 'react-native-elements'
import PropTypes from 'prop-types'
import ListView from './ListView'
import { connect } from 'react-redux'
import { setHistory } from '../redux/redux'
function MainView(props) {
  const { history } = props
  const [isLoading, setIsLoading] = useState(false)
  const [query, setQuery] = useState('')
  const [feedback, setFeedback] = useState('')
  const [toggleView, setToggleView] = useState(true)
  const [data, setData] = useState([])
  const searchTracks = async () => {
    setIsLoading(true)
    try {
      fetch(
        `https://api.soundcloud.com/tracks/?client_id=CW62xLA9h8wXrXC1WIaSX9OWA6novVIE&q=${query}`
      )
        .then((data) => data.json())
        .then((data) => setData(data))
        .then(() => setIsLoading(false))
    } catch (e) {
      console.log(`error ocuured while fetching images: ${e}`)
    }
    if (query !== 'all' && query !== '' && query !== undefined) props.setHistory(query)
  }
  useEffect(() => {
    searchTracks()
  }, [query])
  const showHistory = () => {
    setToggleView(!toggleView)
  }
  const historyPress = (id) => {
    setQuery(history[history.length - id])
    setFeedback(history[history.length - id])
    setToggleView(true)
  }

  return (
    <React.Fragment>
      <View style={styles.header}>
        <Text style={styles.headerText}>Sound Cloud Player</Text>
      </View>
      {toggleView && (
        <View style={styles.margins}>
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
          {!data.length && !isLoading && (
            <View>
              <Text style={styles.helpText}>No Result Where Found for:</Text>
              <Text style={styles.helpText}>{feedback}</Text>
            </View>
          )}
          {isLoading ? (
            <View styles={styles.indicator}>
              <ActivityIndicator size={100} color="#8b0000" />
              <Text style={styles.indicatorText}> Fetching Tracks... </Text>
            </View>
          ) : (
            <View styles={styles.list}>
              <ListView data={data} />
              <Button title="Show History" onPress={showHistory} />
            </View>
          )}
        </View>
      )}
      {!toggleView && (
        <View style={styles.queryView}>
          <Text style={styles.text}>Recent Queries</Text>
          {history[0] === undefined ? (
            <Text style={styles.historyText}>nothing to show yet...</Text>
          ) : (
            <View>
              <Text style={styles.historyText} onPress={() => historyPress(1)}>
                1. {history[history.length - 1]}
              </Text>
              {history[history.length - 2] !== undefined && (
                <Text style={styles.historyText} onPress={() => historyPress(2)}>
                  2. {history[history.length - 2]}
                </Text>
              )}
              {history[history.length - 3] !== undefined && (
                <Text style={styles.historyText} onPress={() => historyPress(3)}>
                  3. {history[history.length - 3]}
                </Text>
              )}
              {history[history.length - 4] !== undefined && (
                <Text style={styles.historyText} onPress={() => historyPress(4)}>
                  4. {history[history.length - 4]}
                </Text>
              )}
              {history[history.length - 5] !== undefined && (
                <Text style={styles.historyText} onPress={() => historyPress(5)}>
                  5. {history[history.length - 5]}
                </Text>
              )}
            </View>
          )}
          <Text style={styles.returnText} onPress={showHistory}>
            back to track list
          </Text>
        </View>
      )}
    </React.Fragment>
  )
}

const styles = StyleSheet.create({
  header: {
    height: 70,
    backgroundColor: 'pink',
    width: '98%',
    marginLeft: '1%',
    borderWidth: 2,
    borderColor: 'red'
  },
  headerText: {
    marginTop: 20,
    fontSize: 24,
    textAlign: 'center',
    fontWeight: 'bold'
  },
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
  indicatorText: {
    textAlign: 'center',
    marginTop: 40,
    fontSize: 30
  },
  queryView: {
    display: 'flex',
    width: '98%',
    marginLeft: '1%'
  },
  text: {
    marginTop: 20,
    fontSize: 24,
    textAlign: 'center'
  },
  historyText: {
    marginTop: 30,
    marginRight: 30,
    fontSize: 19,
    textAlign: 'center'
  },
  returnText: {
    marginTop: 50,
    fontSize: 16,
    textAlign: 'center',
    textDecorationLine: 'underline'
  },
  margins: {
    width: '98%',
    marginLeft: '1%'
  }
})

MainView.propTypes = {
  setHistory: PropTypes.any.isRequired,
  history: PropTypes.array.isRequired
}

const mapStateToProps = (state) => ({
  history: state.history
})

export default connect(mapStateToProps, { setHistory })(MainView)
