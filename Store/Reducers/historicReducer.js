const initialState = {
    historicFilms: []
}

function manageHistoricFilms(state = initialState, action) {

    let nextState
    switch (action.type) {
        case 'TOGGLE_FILMDETAIL':
            if (state.historicFilms.findIndex((item) => item.id === action.value.id) === -1) {
                /*film non contenu*/
                nextState = {
                    ...state,
                    historicFilms: [...state.historicFilms, action.value]
                }
            }
            return nextState || state
        case 'REMOVE_HISTORIC_FILM':
            const indexFilmHistoric = state.historicFilms.findIndex((item) => item.id === action.value.id)
            console.log("index" + indexFilmHistoric)
            if (indexFilmHistoric !== -1) {
                nextState = {
                    ...state,
                    historicFilms: state.historicFilms.filter((item, index) => index !== indexFilmHistoric)
                }
            }
            return nextState || state
        case 'RESET_HISTORIC':
            nextState = { ...state, historicFilms: [] }
            return nextState || state
        default:
            return state
    }
}

export default manageHistoricFilms