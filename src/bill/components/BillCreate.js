import React, { Component, Fragment } from 'react'
import { createBill } from '../api'
import { Redirect } from 'react-router-dom'
import { withRouter } from 'react-router'
import apiUrl from '../../apiConfig'
import BillForm from './BillForm'
import BillIndex from './BillIndex'

class BillCreate extends Component {
  constructor(props) {
    super(props)

    this.state = {
      bill: {
        name: '',
        price: '',
        date: '',
        id: props.user._id
      },
      user: props.user,
      id: '',
      created: false,
      profile: props.location.profile,
      isHidden: true,
      flash: props.flash
    }
  }

  toggleHidden () {
    this.setState({
      isHidden: !this.state.isHidden
    })
  }

  handleChange = event => {
    const editedBill = {
      ...this.state.bill, [event.target.name]: event.target.value
    }
    this.setState({ bill: editedBill })
  }

  createBill = event => {
    event.preventDefault()

    createBill(this.state)
      .then(res => res.ok ? res : new Error())
      .then(res => res.json())
      .then(data => this.setState({ id: data.bill._id, created: true }))
      .catch(console.error)
  }

  render () {
    const { name, price, date } = this.state.bill

    if (this.state.created === true) {
      return <Redirect to={{ pathname: `/bills/${this.state.id}` }} />
    }

    return(
      <Fragment>
        {!this.state.isHidden && <BillForm
          handleChange={this.handleChange}
          handleBill={this.createBill}
          bill={this.state.bill}
          toggleName="Submit"
        />}
        <button onClick={this.toggleHidden.bind(this)} >
        Add a Bill
        </button>
        <BillIndex user={this.state.user} flash={this.state.flash} />
      </Fragment>
    )
  }
}

export default withRouter(BillCreate)
