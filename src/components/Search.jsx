import React from 'react';
// import PropTypes from 'prop-types';
// import Loading from './Loading';
import Header from './Header';

class Search extends React.Component {
  state = {
    search: ' ',
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

  render() {
    // const { isLoading } = this.state;
    const { handleChange, canSubmit } = this;
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
            type="button"
            data-testid="search-artist-button"
          >
            Pesquisar
          </button>
        </div>
      </div>
    );
  }
}

// Search.propTypes = {
//   isLoged: PropTypes.bool.isRequired,
//   singIn: PropTypes.func.isRequired,
// };

export default Search;
