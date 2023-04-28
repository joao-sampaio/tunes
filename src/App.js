import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Album from './components/Album';
import Favorites from './components/Favorites';
import Login from './components/Login';
import PageNotFound from './components/PageNotFound';
import Profile from './components/Profile';
import ProfileEdit from './components/ProfileEdit';
import Search from './components/Search';

class App extends React.Component {
  state = {
    isLoged: false,
  }

  singIn = () => {
    this.setState({
      isLoged: true,
    });
  }

  render() {
    const { isLoged } = this.state;
    const { singIn } = this;
    return (
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/"
            render={ (rProps) => (
              <Login
                { ...rProps }
                singIn={ singIn }
                isLoged={ isLoged }
              />) }
          />
          <Route path="/search"><Search /></Route>
          <Route
            path="/album/:id"
            render={ (rProps) => (
              <Album
                { ...rProps }
              />) }
          />
          <Route
            path="/favorites"
            render={ (rProps) => (
              <Favorites
                { ...rProps }
              />) }
          />
          {/* <Route path="/favorites"><Favorites /></Route> */}
          <Route exact path="/profile"><Profile /></Route>
          <Route path="/profile/edit"><ProfileEdit /></Route>
          <Route path="*"><PageNotFound /></Route>
          {/* <Route exact path="/"><Login /></Route> */}
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
