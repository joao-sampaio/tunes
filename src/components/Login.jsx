import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

class Login extends React.Component {
  state = {
    name: '',
    isLoading: false,
  }

  handleChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
    });
  }

  canSubmit = () => {
    const { name } = this.state;
    const minLength = 3;
    return name.length >= minLength;
  }

  handleClick = async (event) => {
    event.preventDefault();
    this.setState({ isLoading: true },
      async () => {
        const { name } = this.state;
        const { singIn } = this.props;
        await createUser({ name });
        this.setState({
          isLoading: false,
        });
        singIn({ name });
      });
  }

  preventSubmit = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  }

  render() {
    const { handleChange, canSubmit, handleClick, preventSubmit } = this;
    const { isLoading } = this.state;
    const { isLoged } = this.props;
    return (
      <div data-testid="page-login">
        {isLoged && <Redirect to="/search" />}
        {isLoading
          ? <Loading />
          : (
            <form>
              <input
                placeholder="Nome"
                onChange={ handleChange }
                onKeyDown={ preventSubmit }
                name="name"
                data-testid="login-name-input"
              />
              <button
                type="button"
                disabled={ !canSubmit() }
                data-testid="login-submit-button"
                onClick={ handleClick }
              >
                Entrar
              </button>
            </form>)}
      </div>
    );
  }
}

Login.propTypes = {
  isLoged: PropTypes.bool.isRequired,
  singIn: PropTypes.func.isRequired,
};

export default Login;
