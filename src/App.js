import React, { Component } from 'react';
import { Route } from 'react-router-dom'

import './App.css';
import Homepage from './pages/homepage/homepage.component'
import ShopPage from './pages/shop/shop'

class App extends Component {
  render() {
    return (
      <div className='App'>
        <Route exact path="/" component={Homepage} />
        <Route exact path="/shop" component={ShopPage} />
      </div>
    )
  }
}

export default App;
