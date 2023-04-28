import React from 'react';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

import AlbumCard from './AlbumCard';

import Header from './Header';

// {
//   artistId: 12,
//   artistName: "Artist Name",
//   collectionId: 123,
//   collectionName: "Collection Name",
//   collectionPrice: 12.25,
//   artworkUrl100: "https://url-to-image",
//   releaseDate: "2012-03-02T08:00:00Z",
//   trackCount: 8,
// }

class Search extends React.Component {
  state = {
    search: '',
    searchKey: '',
    albuns: [],
  }

  canSubmit = () => {
    const { search } = this.state;
    const minLength = 2;
    return search.length >= minLength;
  }

  handleChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
      searchKey: value,
    });
  }

  handleClick = async () => {
    this.setState({},
      async () => {
        const { search } = this.state;
        const albuns = await searchAlbumsAPI(search);
        console.log(albuns);
        this.setState({
          albuns,
          search: '',
        });
      });
  }

  render() {
    // const { isLoading } = this.state;
    const { handleChange, handleClick, canSubmit } = this;
    const { albuns, search, searchKey } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <div>
          <input
            name="search"
            placeholder="Banda ou Artista"
            data-testid="search-artist-input"
            onChange={ handleChange }
            value={ search }
          />
          <button
            disabled={ !canSubmit() }
            onClick={ handleClick }
            type="button"
            data-testid="search-artist-button"
          >
            Pesquisar
          </button>
        </div>
        {albuns.length > 0
          ? (
            <>
              <p>{`Resultado de álbuns de: ${searchKey}`}</p>
              <div>
                {albuns.map((album) => {
                  const { collectionId } = album;
                  return <AlbumCard key={ collectionId } { ...album } />;
                })}
              </div>
            </>
          ) : (
            <p>Nenhum álbum foi encontrado</p>
          )}
      </div>
    );
  }
}

// Search.propTypes = {
//   isLoged: PropTypes.bool.isRequired,
//   singIn: PropTypes.func.isRequired,
// };

export default Search;
