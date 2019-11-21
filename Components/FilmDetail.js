import React from 'react'
import { StyleSheet, View, TouchableOpacity, Text, ActivityIndicator, ScrollView, Image } from 'react-native'
import { getFilmDetailFromApi, getImageFromApi } from '../API/TMDBApi'
import moment from 'moment'
import numeral from 'numeral'
import { connect } from 'react-redux'
import ZoomClick from '../Animations/ZoomClick'

class FilmDetail extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            film: undefined,
            isLoading: true
        }
    }

    _displayLoading() {
        if (this.state.isLoading) {
            return (
                < View style={styles.loading_container} >
                    <ActivityIndicator size='large' />
                </View >
            )
        }
    }

    _toggleFavorite() {
        const action = { type: "TOGGLE_FAVORITE", value: this.state.film }
        this.props.dispatch(action)
    }

    _displayFavoriteImage() {
        var sourceImage = require('../Images/ic_favorite_border.png')
        shouldEnLarge = false
        if (this.props.favoritesFilm.findIndex(item => item.id === this.state.film.id) !== -1) {
            sourceImage = require('../Images/ic_favorite.png')
            shouldEnLarge = true
        }

        return (
            <ZoomClick
                shouldEnLarge={shouldEnLarge}>
                <Image style={styles.favorite_image}
                    source={sourceImage} />
            </ZoomClick>
        )
    }


    _displayFilmDetail() {
        const { film } = this.state
        if (film != undefined) {
            return (
                <ScrollView style={styles.scrollview_container}>
                    <Image style={styles.image_container}
                        source={{ uri: getImageFromApi(film.backdrop_path) }}>
                    </Image>
                    <Text style={styles.title_container}>{film.title}</Text>
                    <TouchableOpacity style={styles.favorite_container}
                        onPress={() => this._toggleFavorite()}>
                        {this._displayFavoriteImage()}
                    </TouchableOpacity>

                    <Text style={styles.description_container} >{film.overview}</Text>
                    <Text style={styles.info_container}>
                        Sorti le {moment(film.release_date).format('L')} {'\n'}
                        Note: {film.vote_average}/10 {'\n'}
                        Nombre de vote: {film.vote_count} {'\n'}
                        Budget: {numeral(film.budget).format('0,0[.]00 $')} {'\n'}
                        Genre(s): {film.genres.map(g => {
                            return g.name
                        }).join('/')}{'\n'}
                        Companie(s):{film.production_companies.map(p => {
                            return p.name
                        }).join('/')}{'\n'}
                    </Text>

                </ScrollView >
            )
        }
    }
    componentDidMount() {
        getFilmDetailFromApi(this.props.navigation.getParam('idFilm'))
            .then(data => {
                this.setState({
                    film: data,
                    isLoading: false
                })
            })
    }
    componentDidUpdate() {
        console.log(this.props.favoritesFilm)
    }

    render() {
        return (
            <View style={styles.main_container}>
                {this._displayLoading()}
                {this._displayFilmDetail()}
            </View>
        )

    }
}

const mapStateToProps = (state) => {
    return {
        favoritesFilm: state.favoritesFilm
    }
}

export default connect(mapStateToProps)(FilmDetail)

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
    },
    loading_container: {
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    scrollview_container: {
        flex: 1
    },
    image_container: {
        height: 200,
        backgroundColor: 'red'
    },
    title_container: {
        fontSize: 30,
        fontWeight: 'bold',
        flexWrap: 'wrap',
        textAlign: 'center',
        marginTop: 5,
        marginBottom: 5
    },
    description_container: {
        fontStyle: 'italic',
        color: '#666666',
        marginTop: 10,
        marginBottom: 10
    },
    info_container: {
    },
    favorite_container: {
        alignItems: 'center'
    },
    favorite_image: {
        flex: 1,
        height: null,
        width: null
    }

})