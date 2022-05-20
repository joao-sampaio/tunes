import React from 'react';
// import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import { getFavoriteSongs, addSong, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';
import MusicCard from './MusicCard';
import Header from './Header';

class Album extends React.Component {
  state = {
    isLoading: true,
    artistName: '',
    collectionName: '',
    artworkUrl100: '',
    musics: [],
    favorites: [],
  }

  favChange = (musicId) => {
    this.setState({ isLoading: true },
      async () => {
        const { match: { params: { id } } } = this.props;
        const musicsData = await getMusics(id);
        const music = musicsData.find((m) => m.trackId === musicId);
        let { favorites } = this.state;
        if (!favorites.find((m) => m.trackId === musicId)) {
          await addSong(music);
        } else {
          await removeSong(music);
        }
        favorites = await getFavoriteSongs();
        // const favorites = await getFavoriteSongs();
        this.setState({
          isLoading: false,
          favorites,
        });
      });
  }

  componentDidMount = async () => {
    this.setState({ isLoading: true },
      async () => {
        const { match: { params: { id } } } = this.props;
        const musicsData = await getMusics(id);
        const musics = [...musicsData];
        musics.shift();
        const { artistName, collectionName, artworkUrl100 } = musicsData[0];
        const favorites = await getFavoriteSongs();
        this.setState({
          isLoading: false,
          musics,
          artistName,
          collectionName,
          artworkUrl100,
          favorites,
        });
      });
  }

  render = () => {
    const { isLoading, musics, artistName, collectionName,
      artworkUrl100, favorites } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        {isLoading
          ? <Loading />
          : (
            <div>
              <div>
                <img src={ artworkUrl100 } alt={ collectionName } />
                <h3 data-testid="artist-name">{ artistName }</h3>
                <h4 data-testid="album-name">{ collectionName }</h4>
              </div>
              <div>
                {musics.map((music) => {
                  const { trackName, previewUrl, trackId } = music;
                  const isFav = favorites.find((m) => m.trackId === trackId);
                  console.log(favorites);
                  const { favChange } = this;
                  return (
                    <MusicCard
                      favChange={ favChange }
                      key={ trackId }
                      isFav={ isFav }
                      trackId={ trackId }
                      previewUrl={ previewUrl }
                      trackName={ trackName }
                    />
                  );
                })}
              </div>
            </div>
          )}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default Album;
