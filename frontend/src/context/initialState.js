export const initialState = {
  user: null,
  allUsers: null,
  allAlbums: null,
  allSongs: null,
  allArtists: null,

  // FILTER STATE
  searchTerm: '',
  filterTerm: 'all',
  artistFilter: null,
  languageFilter: null,
  albumFilter: null,
  alertType: null,

  // Player
  isSongPlaying: false,
  songIndex: 0
}
