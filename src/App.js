import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'
import { connect } from "react-redux";
import { createStructuredSelector } from 'reselect'

import './App.css';
import Homepage from './pages/homepage/homepage.component'
import ShopPage from './pages/shop/shop'
import SignInAndSingUpPage from './pages/signIn-and-signUp/signIn-and-signUp'
import CheckoutPage from './pages/checkout/checkout'

import Header from './components/header/header'

import { selectCurrentUser } from './redux/user/user.selector'
import { checkUserSession } from './redux/user/user.action'


class App extends Component {


  unSubscribeFromAuth = null;

  componentDidMount() {
    const { checkUserSession } = this.props

    checkUserSession()
  }



  componentWillUnmount = () => {
    this.unSubscribeFromAuth()
  }

  render() {
    return (
      <div className='App'>
        <Header />
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route path="/shop" component={ShopPage} />
          <Route path="/checkout" component={CheckoutPage} />
          <Route exact path="/signin" render={() => (this.props.currentUser ? (<Redirect to="/" />) : (<SignInAndSingUpPage />))} />
        </Switch>
      </div>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
})

const mapDispatchToProps = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession())
})

export default connect(mapStateToProps, mapDispatchToProps)(App);





