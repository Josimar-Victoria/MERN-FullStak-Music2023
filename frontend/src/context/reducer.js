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
    case actionTypes.SET_ALL_USERS:
      return {
        ...state,
        allUsers: action.allUsers
      }
    case actionTypes.SET_ALL_ALBUMS:
      return {
        ...state,
        allAlbums: action.allAlbums
      }
    case actionTypes.SET_ALL_SONGS:
      return {
        ...state,
        allSongs: action.allSongs
      }
    case actionTypes.SET_ALL_ARTISTS:
      return {
        ...state,
        allArtists: action.allArtists
      }

    // FILTER CASE
    case actionTypes.SET_SEARCH_TERM:
      return {
        ...state,
        searchTerm: action.searchTerm
      }
    case actionTypes.SET_FILTER_TEM:
      return {
        ...state,
        filterTerm: action.filterTerm
      }
    case actionTypes.SET_ARTIST_FILTER:
      return {
        ...state,
        artistFilter: action.artistFilter
      }
    case actionTypes.SET_LENGUAGE_FILTER:
      return {
        ...state,
        languageFilter: action.languageFilter
      }
    case actionTypes.SET_ALBUM_FILTER:
      return {
        ...state,
        albumFilter: action.albumFilter
      }

    case actionTypes.SET_ALERT_TYPE:
      return {
        ...state,
        alertType: action.alertType
      }

    // Player
    case actionTypes.SET_ISSONG_PLAYING:
      return {
        ...state,
        isSongPlaying: action.isSongPlaying
      }
    case actionTypes.SET_SONG_INDEXE:
      return {
        ...state,
        songIndex: action.songIndex
      }
    default:
      return state
  }
}

export default reducer
