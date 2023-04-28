import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class AlbumCard extends React.Component {
  render() {
    const { collectionName, collectionId, artworkUrl100 } = this.props;
    return (
      <div key={ collectionId }>
        <Link
          data-testid={ `link-to-album-${collectionId}` }
          to={ `/album/${collectionId}` }
        >
          <h3>{ collectionName }</h3>
          <img src={ artworkUrl100 } alt={ collectionName } />
        </Link>
      </div>
    );
  }
}

AlbumCard.propTypes = {
  collectionName: PropTypes.string.isRequired,
  collectionId: PropTypes.number.isRequired,
  artworkUrl100: PropTypes.string.isRequired,
};

export default AlbumCard;
