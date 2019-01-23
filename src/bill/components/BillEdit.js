import React, { Component, Fragment } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { showBills, editBill } from '../api'
import apiUrl from '../../apiConfig'
import BillForm from './BillForm'

class BillEdit extends Component {
  constructor(props) {
    super(props)
    console.log(props)

    this.state = {
      bill: {
        name: '',
        price: '',
        date: '',
        user: props.user._id
      },
      edited: false,
      user: props.user,
      billID: props.match.params.id
    }
  }

  handleChange = event => {
    console.log(this.state)
    const editedBill = {
      ...this.state.bill, [event.target.name]: event.target.value
    }
    this.setState({ bill: editedBill })
  }

  edit = event => {
    event.preventDefault()
    console.log(this.state.bill)

    editBill(this.state)
      .then(res => res.ok ? res : new Error())
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(console.error)
  }

  render () {
    return (
      <Fragment>
        <BillForm
          handleChange={this.handleChange}
          handleBill={this.edit}
          bill={this.state.bill}
        />
      </Fragment>
    )
  }
}

export default withRouter(BillEdit)
