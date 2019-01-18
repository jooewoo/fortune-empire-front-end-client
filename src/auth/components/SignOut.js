import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { signOut } from '../api'
import messages from '../messages'

class SignOut extends Component {
  componentDidMount () {
    const { flash, history, clearUser, user } = this.props

    signOut(user)
      .finally(() => flash(messages.signOutSuccess, 'flash-success'))
      .finally(() => history.push('/'))
      .finally(() => clearUser())
  }

  render () {
    return ''
  }
}

export default withRouter(SignOut)
