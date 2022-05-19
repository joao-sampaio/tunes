import React from 'react';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
// import PropTypes from 'prop-types';
// import Loading from './Loading';
import Header from './Header';
import Loading from './Loading';

class Search extends React.Component {
  state = {
    isLoading: true,
    search: '',
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
    });
  }

  handleClick = async () => {
    this.setState({ isLoading: true },
      async () => {
        const { search } = this.state;
        const albuns = await searchAlbumsAPI(search);
        console.log(albuns)
        this.setState({
          isLoading: false,
          albuns,
        });
      });
  }

  render() {
    // const { isLoading } = this.state;
    const { handleChange, handleClick, canSubmit } = this;
    const { isLoading, albuns, search } = this.state;
    return (
      <div>
        <Header />
        <div>
          <input
            name="search"
            placeholder="Banda ou Artista"
            data-testid="search-artist-input"
            onChange={ handleChange }
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
        {isLoading ? <Loading />
          : (
            <>
              <p>{`Resultados de ${search}`}</p>
              <div>
                {albuns}
              </div>
            </>
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
