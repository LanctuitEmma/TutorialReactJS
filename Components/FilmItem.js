// Components/FilmItem.js

import React from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native'
import { getImageFromApi } from '../API/TMDBApi'
import FadeIn from '../Animations/FadeIn'

export default class FilmItem extends React.Component {
  _displayFavorite() {
    var sourceImage = require('../Images/ic_favorite.png')
    if (this.props.isFilmFavorite) {
      return (
        <Image style={styles.favoris_container}
          source={sourceImage} />
      )
    }
  }

  render() {
    const { film, displayDetailForFilm } = this.props
    return (
      <FadeIn>
        <TouchableOpacity style={styles.main_container}
          onPress={() => displayDetailForFilm(film.id)}>
          <Image
            style={styles.image}
            source={{ uri: getImageFromApi(film.poster_path) }}
          />
          <View syle={styles.content_container}>
            <View style={styles.header_container}>
              {this._displayFavorite()}
              <Text style={styles.title_text}>{film.title} </Text>
              <Text style={styles.vote_text}> {film.vote_average} </Text>
            </View>
            <View style={styles.description_container}>
              <Text style={styles.description_text} numberOfLines={6}> {film.overview} </Text>
            </View>
            <View style={styles.date_container}>
              <Text style={styles.data_text}>Sorti le {film.release_date} </Text>
            </View>
          </View>
        </TouchableOpacity>
      </FadeIn>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    height: 190,
    flexDirection: 'row',
    /* Pas de flex number sinon notre height ne sert a rien, tt les elems seront collés */
  },
  header_container: {
    flexDirection: 'row',
    flex: 3,
  },
  title_text: {
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1,
    flexWrap: 'wrap',
    paddingRight: 5,
  },
  vote_text: {
    fontWeight: 'bold',
    fontSize: 26,
    color: '#666666',
  },
  content_container: {
    flex: 1,
    margin: 5,
  },
  description_container: {
    flex: 7,
    width: 220,
  },
  description_text: {
    fontStyle: 'italic',
    color: '#666666',
  },
  date_container: {
    flex: 1,
  },
  data_text: {
    textAlign: 'right',
    fontSize: 14,
  },
  image: {
    width: 120,
    height: 180,
    margin: 5,
  },
  favoris_container: {
    width: 30,
    height: 30
  }
})
