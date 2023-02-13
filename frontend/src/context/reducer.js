export const actionTypes = {
  SET_USER: 'SET_USER',
  SET_ALL_USERS: 'SET_ALL_USERS',
  SET_ALL_ALBUMS: 'SET_ALL_ALBUMS',
  SET_ALL_SONGS: 'SET_ALL_SONGS',
  SET_ALL_ARTISTS: 'SET_ALL_ARTISTS',

  // FILTER TYPE
  SET_SEARCH_TERM: 'SET_SEARCH_TERM',
  SET_FILTER_TEM: 'SET_FILTER_TEM',
  SET_ARTIST_FILTER: 'SET_ARTIST_FILTER',
  SET_LENGUAGE_FILTER: 'SET_LENGUAGE_FILTER',
  SET_ALBUM_FILTER: 'SET_ALBUM_FILTER',

  SET_ALERT_TYPE: 'SET_ALERT_TYPE',

  //Player
  SET_ISSONG_PLAYING: 'SET_ISSONG_PLAYING',
  SET_SONG_INDEXE: 'SET_SONG_INDEXE'
}

const reducer = (state, action) => {
  console.log({ action })

  switch (action.type) {
    case actionTypes.SET_USER:
      return {
        ...state,
        user: action.user
      }

    default:
      return state
  }
}

export default reducer
