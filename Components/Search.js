// Components/Search.js

import React from 'react'
import { StyleSheet, View, TextInput, Button, ActivityIndicator, FlatList } from 'react-native'
import FilmList from './FilmList'
import { getFilmsFromApiWithSearchedText } from '../API/TMDBApi'
import { connect } from 'react-redux'

class Search extends React.Component {

  /*DANS LE STATE: On ne gere que les donnes qui, une fois modifiées,
  peuvent affecter le rendu de notre component! Sinon on re-render le 
  conponent, couteux, pour ne rien changer a l'affichage
  Souvent, si on utilise une donnée dans le render de notre component
  (comme ici avec les films) c'est quel a sa place dans le state.
  Text input n a pas sa place, elle est utilsé dans une fonction en dehors
  du render
   */

  constructor(props) {
    super(props)
    this.state = { films: [], isLoading: false }
    this._loadFilms = this._loadFilms.bind(this)
    this.searchedText = '' // intialisation
    this.page = 0
    this.totalPages = 0
  }
  /* Underscore pour indiquer que la methode est privée mais ce modificateur
  n est pas verifié par le compilateur c'est juste pr nous avertir nous qu'on 
  ne devrait pas l'utiliser en dehors de Search */
  _loadFilms() {
    if (this.searchedText.length > 0) {
      this.setState({ isLoading: true })
      getFilmsFromApiWithSearchedText(this.searchedText, this.page).then(data => {
        this.setState({
          films: [...this.state.films, ...data.results], /* = this.state.films.concat(data.results) cette syntaxe fait une copie ...tab */
          isLoading: false
        })
        this.page = data.page
        this.totalPages = data.total_pages
      })
    }
  }

  _searchFilms() {
    this.page = 0
    this.totalPages = 0
    this.setState({
      films: [],
    }, () => {
      this._loadFilms()
    })
  }

  _searchTextInputChanged(text) {
    this.searchedText = text;
  }

  _displayLoading() {
    if (this.state.isLoading) {
      return (
        <View style={styles.loading_container}>
          <ActivityIndicator size='large' />
        </View>
      )
    }
  }


  render() {
    return (
      <View style={styles.main_container}>
        <TextInput style={styles.textinput}
          placeholder='Titre du film'
          onChangeText={(text) => this._searchTextInputChanged(text)}
          onSubmitEditing={() => this._searchFilms} />
        <Button title='Rechercher' onPress={() => { this._searchFilms() }} />
        <FilmList
          films={this.state.films}
          navigation={this.props.navigation}
          loadFilms={this._loadFilms}
          page={this.page}
          totalPages={this.totalPages}
          favoriteList={false}
        />
        {this._displayLoading()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
  },
  textinput: {
    marginLeft: 5,
    marginRight: 5,
    height: 50,
    paddingLeft: 5
  },
  loading_container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 100,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

const mapStateToProps = (state) => {
  return {
    favoritesFilm: state.favoritesFilm
  }
}

export default connect(mapStateToProps)(Search)
