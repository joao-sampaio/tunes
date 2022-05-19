import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './components/Login';
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
          <Route exact path="/search"><Search /></Route>
          {/* <Route exact path="/album/:id"><Album /></Route>
          <Route exact path="/favorites"><Favorites /></Route>
          <Route exact path="/profile"><Profile /></Route>
          <Route exact path="/profile/edit"><ProfileEdit /></Route>
          <Route exact path="/"><Login /></Route> */}
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
