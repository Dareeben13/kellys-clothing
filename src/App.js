import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'

import './App.css';
import Homepage from './pages/homepage/homepage.component'
import ShopPage from './pages/shop/shop'
import SignInAndSingUpPage from './pages/signIn-and-signUp/signIn-and-signUp'
import Header from './components/header/header'

class App extends Component {
  render() {
    return (
      <div className='App'>
        <Header />
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route path="/shop" component={ShopPage} />
          <Route path="/signin" component={SignInAndSingUpPage} />
        </Switch>

      </div>
    )
  }
}

export default App;
