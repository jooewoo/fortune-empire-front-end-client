import React, { Component, Fragment } from 'react'
import { Link, withRouter, Redirect } from 'react-router-dom'
import apiUrl from '../../apiConfig'
import axios from 'axios'


class ProfileShow extends Component {
  constructor (props) {
    super(props)

    this.state = {
      profile: {},
      user: props.user,
      profile: false
    }
  }

  async componentDidMount() {
    const options = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization':`Token token=${this.state.user.token}`
      }
    }

    const response = await axios.get(`${apiUrl}/profiles`, options)
    console.log(response)
    this.setState({ profile: response.data.profiles, created: true })

  }

  render () {
    console.log(this.state)
    console.log(this.state.profile.length)

    if (this.state.profile.length === 0) {
      return <Redirect to={'/profile-create/'} />
    } else if (this.state.created === true ) {
      const profile = this.state.profile[0]
      return (
        <Fragment>
          <p>Name: {profile.name}</p>
          <p>Income: {profile.income}</p>
          <p>Tax: {profile.tax}</p>
          <p>Disposable Income: {profile.disposable_income}</p>
        </Fragment>
      )
      console.log(profile)
    }
    return(
      <Fragment>
        <h3>Profile</h3>
      </Fragment>
    )
  }
}

export default withRouter(ProfileShow)
