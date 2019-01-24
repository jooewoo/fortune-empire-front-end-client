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
    this.setState({ profile: response.data.profiles, created: true })

  }

  render () {
    if (this.state.created === true ) {
      const profile = this.state.profile[0]
      return (
        <Fragment>
          <div className='card'>
            <h5 className='card-header'>Profile Info</h5>
            <div className='card-body'>
              <p className='card-text'>Name: {profile.name}</p>
              <p className='card-text'>Income: {profile.income}</p>
              <p className='card-text'>Tax: {profile.tax}</p>
              <p className='card-text'>Disposable Income: {profile.disposable_income}</p>
              <button><Link to={`/profile-edit/${this.state.profile[0]._id}`}>Edit Profile</Link></button>
            </div>
          </div>
        </Fragment>
      )
    }
    return(
      <Fragment>
        <h3>Profile</h3>
      </Fragment>
    )
  }
}

export default withRouter(ProfileShow)
