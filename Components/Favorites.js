import React from 'react'
import FilmList from './FilmList'
import { connect } from 'react-redux'
import { StyleSheet, View } from 'react-native'

class Favorites extends React.Component {


    render() {
        return (
            <View style={styles.main_container}>

                <FilmList
                    films={this.props.favoritesFilm}
                    navigation={this.props.navigation}
                    favoriteList={true}
                />
            </View>
        )
    }
}
const mapStateToProps = state => {
    return {
        favoritesFilm: state.favoritesFilm
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1
    }
})

export default connect(mapStateToProps)(Favorites)