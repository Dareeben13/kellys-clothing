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
import { auth, createUserProfileDocument } from './firebase/firebase.utils'
import { setCurrentUser } from './redux/user/user.action'
import { selectCurrentUser } from './redux/user/user.selector'


class App extends Component {


  unSubscribeFromAuth = null;

  componentDidMount() {

    const { setCurrentUser } = this.props


    this.unSubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      // this.setState({ currentUser: user });

      // createUserProfileDocument(user)

      // WE WANT TO STORE THE DATABASE STORED USER IN OUR APPLICATION STATE
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth)  // NOTE THAT createUserProfileDocument IS RETRUNING BACK THE UserRef Object

        userRef.onSnapshot(snapShot => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data()  // The onSnapShot is just a method used to get t he snapShot of the UserRef, i.e the user object stored in the database. 
            //  The setState call is like that because the user id is gotten from snapShot, while the rest of the data is gotten from snapShot.data() method
            // So we pull id from snapShot.id and the rest of the data from snapShot.data(). ...snapShot.data() pulls all the data from our sanpShot and set them into state.

          })
          // console.log(this.state)

        })

      }
      setCurrentUser(userAuth)

      // We use else so that the setState calls don't fire twice.
      // We are just checking to see if the userAuth returns null, then we set currentUser to null

    })
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
  currentUser: selectCurrentUser
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
