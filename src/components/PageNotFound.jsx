import React from 'react';
import Loading from './Loading';

class PageNotFound extends React.Component {
  state = {
    isLoading: false,
  }

  render = () => {
    const { isLoading } = this.state;
    return (
      <div data-testid="page-not-found">
        {isLoading
          ? <Loading />
          : (
            <h1>Error 404: Page not found</h1>
          )}
      </div>
    );
  }
}

export default PageNotFound;
