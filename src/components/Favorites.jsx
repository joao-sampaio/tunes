import React from 'react';
import Loading from './Loading';
import Header from './Header';
import { getFavoriteSongs, addSong, removeSong } from '../services/favoriteSongsAPI';
import MusicCard from './MusicCard';

class Favorites extends React.Component {
  state = {
    isLoading: true,
    favorites: [],
  }

  componentDidMount = async () => {
    this.setState({ isLoading: true },
      async () => {
        const favorites = await getFavoriteSongs();
        this.setState({
          isLoading: false,
          favorites,
        });
      });
  }

  favChange = (musicId) => {
    this.setState({ isLoading: true },
      async () => {
        let { favorites } = this.state;
        const music = favorites.find((m) => m.trackId === musicId);
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

  render = () => {
    const { isLoading, favorites } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        {isLoading
          ? <Loading />
          : (
            <div>
              {favorites.map((music) => {
                const { trackName, previewUrl, trackId } = music;
                const { favChange } = this;
                const isFav = favorites.find((m) => m.trackId === trackId);
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
          )}
      </div>
    );
  }
}

export default Favorites;
