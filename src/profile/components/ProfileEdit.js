import React, { Component, Fragment } from 'react'
import { Link, withRouter, Redirect } from 'react-router-dom'
import apiUrl from '../../apiConfig'
import axios from 'axios'

class ProfileEdit extends Component {
  constructor(props) {
    super(props)

    this.state = {
      profile: {
        name: '',
        income: '',
        tax: '',
        disposable_income: '',
        user: props.user._id
      },
      edited: false,
      user: props.user,
      profileID: props.match.params.id
    }
  }

  handleChange = event => {
    const editedProfile = {
      ...this.state.profile, [event.target.name]: event.target.value
    }

    editedProfile.disposable_income = editedProfile.income * (1 - editedProfile.tax)
    editedProfile.created = true
    this.setState({ profile: editedProfile})
  }

  handleSubmit = async (event) => {
    event.preventDefault()

    const data = JSON.stringify({ profile: this.state.profile })
    const options = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization':`Token token=${this.state.user.token}`
      }
    }

    const response = await axios.patch(`${apiUrl}/profiles/${this.state.profileID}`, data, options)
    this.setState({ edited: true })
  }

  render () {
    if (this.state.edited === true) {
      return <Redirect to='/profile' />
    }

    return (
      <Fragment>
        <h3>Profile Edit</h3>
        <form onSubmit={this.handleSubmit}>
          <input
            name="name"
            placeholder="John Smith"
            value={this.state.profile.name}
            onChange={this.handleChange}
          />
          <input
            name="income"
            placeholder="income: 50000"
            value={this.state.profile.price}
            onChange={this.handleChange}
          />
          <input
            name="tax"
            placeholder="tax: 0.29"
            value={this.state.profile.date}
            onChange={this.handleChange}
          />
          <input type="submit" value="Submit" />
        </form>
      </Fragment>
    )
  }
}

export default withRouter(ProfileEdit)
