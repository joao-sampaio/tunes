import React from 'react';
import PropTypes from 'prop-types';

class MusicCard extends React.Component {
  favChange = () => {
    const { trackId, favChange } = this.props;
    favChange(trackId);
  }

  render() {
    const { trackName, previewUrl, isFav, trackId } = this.props;
    const { favChange } = this;
    return (
      <div>
        <h5>{trackName}</h5>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
          .
        </audio>
        <label htmlFor={ trackId }>
          Favorita
          <input
            id={ trackId }
            data-testid={ `checkbox-music-${trackId}` }
            onChange={ favChange }
            checked={ isFav }
            type="checkbox"
          />
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  isFav: PropTypes.bool.isRequired,
  trackId: PropTypes.number.isRequired,
  favChange: PropTypes.func.isRequired,
};

export default MusicCard;
