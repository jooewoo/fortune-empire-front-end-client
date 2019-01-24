import React, { Component, Fragment } from 'react'
import { Redirect } from 'react-router-dom'
import { withRouter } from 'react-router'
import apiUrl from '../../apiConfig'
import axios from 'axios'

class ProfileCreate extends Component {
  constructor(props) {
    super(props)
    console.log(props)

    this.state = {
      profile: {
        name: '',
        income: '',
        tax: '',
        disposable_income: '',
        created: false,
        user: props.user._id
      },
      user: props.user,
      created: false
    }
  }

  handleChange = event => {
    const editedProfile = {
      ...this.state.profile, [event.target.name]: event.target.value
    }

    console.log(editedProfile.income, editedProfile.tax)
    console.log(editedProfile.income * (1 - editedProfile.tax))
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

    const response = await axios.post(`${apiUrl}/profiles`, data, options)
    this.setState({ profile: response.data.profile, created: true })
  }

  render () {
    console.log(this.state)

    if (this.state.created === true) {
      return <Redirect to='/profile' />
    }
    return (
      <Fragment>
        <h3>Create Profile</h3>
        <form onSubmit={this.handleSubmit}>
          <label>Name</label>
          <input
            name="name"
            placeholder="John Smith"
            value={this.state.profile.name}
            onChange={this.handleChange}
          />
          <label>$</label>
          <input
            name="income"
            placeholder="50000"
            value={this.state.profile.price}
            onChange={this.handleChange}
          />
          <label>tax</label>
          <input
            name="tax"
            placeholder="0.29"
            value={this.state.profile.date}
            onChange={this.handleChange}
          />
          <input type="submit" value="Submit" />
        </form>
      </Fragment>
    )
  }
}

export default withRouter(ProfileCreate)
