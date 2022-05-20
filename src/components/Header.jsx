import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends React.Component {
  state = {
    isLoading: false,
    userName: '',
  }

  componentDidMount = async () => {
    this.setState({ isLoading: true },
      async () => {
        const user = await getUser();
        this.setState({
          isLoading: false,
          userName: user.name,
        });
      });
  }

  render = () => {
    const { isLoading, userName } = this.state;
    return (
      <header data-testid="header-component">
        {isLoading
          ? <Loading />
          : (
            <>
              <div>
                <h3>Rangon Tunes</h3>
              </div>
              <div>
                <h4 data-testid="header-user-name">{ userName }</h4>
              </div>
              <div>
                <Link data-testid="link-to-search" to="/search">Pesquisar</Link>
                <Link data-testid="link-to-favorites" to="/favorites">Favoritas</Link>
                <Link data-testid="link-to-profile" to="/profile">Perfil</Link>
              </div>
            </>
          )}
      </header>
    );
  }
}

export default Header;
