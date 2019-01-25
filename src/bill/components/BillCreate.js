import React, { Component, Fragment } from 'react'
import { createBill } from '../api'
import { Redirect } from 'react-router-dom'
import { withRouter } from 'react-router'
import apiUrl from '../../apiConfig'
import BillForm from './BillForm'
import BillIndex from './BillIndex'
import messages from '../messages'

class BillCreate extends Component {
  constructor(props) {
    super(props)

    this.state = {
      bill: this.initialBill(),
      user: props.user,
      id: '',
      created: false,
      profile: props.location.profile,
      isHidden: true,
      flash: props.flash
    }
  }

  initialBill = () => {
    return {
      name: '',
      price: '',
      date: '',
      user: this.props.user._id
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
    const { flash } = this.props
    createBill(this.state)
      .then(res => res.ok ? res : new Error())
      .then(res => res.json())
      .then(data => this.setState({ id: data.bill._id, created: true }))
      .then(() => flash(messages.createBillSuccess, 'flash-success'))
      .catch(() => {
        flash(messages.billCreateFailure, 'flash-error')
        this.setState({ bill: this.initialBill() })
      })
  }

  render () {
    const { name, price, date } = this.state.bill
    const { created, id, flash, user, bill } = this.state

    if (created === true) {
      return <Redirect to={{ pathname: `/bills/${id}`, flash: flash }} />
    }

    return(
      <Fragment>
        {!this.state.isHidden && <BillForm
          handleChange={this.handleChange}
          handleBill={this.createBill}
          bill={bill}
          toggleName="Submit"
        />}
        <button onClick={this.toggleHidden.bind(this)} >
        Add a Bill
        </button>
        <BillIndex user={user} flash={flash} />
      </Fragment>
    )
  }
}

export default withRouter(BillCreate)
