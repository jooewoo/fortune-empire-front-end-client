import React, { Component, Fragment } from 'react'
import { Link, withRouter, Redirect } from 'react-router-dom'
import { showBills, editBill } from '../api'
import apiUrl from '../../apiConfig'
import BillForm from './BillForm'
import messages from '../messages'
import './Bill.scss'

class BillEdit extends Component {
  constructor(props) {
    super(props)

    this.state = {
      bill: this.initialBill(),
      edited: false,
      user: props.user,
      billID: props.match.params.id,
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

  edit = event => {
    event.preventDefault()
    const { flash } = this.props

    editBill(this.state)
      .then(res => res.ok ? res : new Error())
      .then(() => this.setState({ edited: true }))
      .then(() => flash(messages.editBillSuccess, 'flash-success'))
      .catch(() => flash(messages.editBillFailure, 'flash-warning'))
  }

  render () {
    if (this.state.edited === true) {
      return <Redirect to='/bills' flash={this.props.flash} />
    }

    return (
      <Fragment>
        <button onClick={this.toggleHidden.bind(this)} >
        Edit Your Bill
        </button>
        {!this.state.isHidden && <BillForm
          handleChange={this.handleChange}
          handleBill={this.edit}
          bill={this.state.bill}
          toggleName="Edit"
        />}
      </Fragment>
    )
  }
}

export default withRouter(BillEdit)
