import React, { Component, Fragment } from 'react'
import './App.scss'
import { Route, Link } from 'react-router-dom'

import AuthenticatedRoute from './auth/components/AuthenticatedRoute'
import Header from './header/Header'
import SignUp from './auth/components/SignUp'
import SignIn from './auth/components/SignIn'
import SignOut from './auth/components/SignOut'
import ChangePassword from './auth/components/ChangePassword'
import BillCreate from './bill/components/BillCreate'
import BillShow from './bill/components/BillShow'
import BillIndex from './bill/components/BillIndex'
import BillEdit from './bill/components/BillEdit'

class App extends Component {
  constructor () {
    super()

    this.state = {
      user: null,
      flashMessage: '',
      flashType: null,
      profile: {
        name: '',
        income: '',
        tax: '',
        disposable_income: '',
        created: false,
        user: ''
      },
      user: '',
      created: false
    }
  }

  setUser = user => this.setState({ user })

  clearUser = () => this.setState({ user: null })

  flash = (message, type) => {
    this.setState({ flashMessage: message, flashType: type })

    clearTimeout(this.messageTimeout)

    this.messageTimeout = setTimeout(() => this.setState({flashMessage: null
    }), 2000)
  }

  render () {
    const { flashMessage, flashType, user } = this.state

    return (
      <Fragment>
        <Header user={user} />
        {flashMessage && <h3 className={flashType}>{flashMessage}</h3>}

        <main className="container">
          <Route path='/sign-up' render={() => (
            <SignUp flash={this.flash} setUser={this.setUser} />
          )} />
          <Route path='/sign-in' render={() => (
            <SignIn flash={this.flash} setUser={this.setUser} />
          )} />
          <AuthenticatedRoute user={user} path='/sign-out' render={() => (
            <SignOut flash={this.flash} clearUser={this.clearUser} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/change-password' render={() => (
            <ChangePassword flash={this.flash} user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/bills' render={() => (
            <BillIndex flash={this.flash} user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/bills-create' render={() => (
            <BillCreate flash={this.flash} user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/bills/:id' render={() => (
            <BillShow flash={this.flash} user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/bills/:id/bill-edit' render={() => (
            <BillEdit flash={this.flash} user={user} />
          )} />
        </main>
      </Fragment>
    )
  }
}

export default App
