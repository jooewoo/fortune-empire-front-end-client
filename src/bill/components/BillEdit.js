import React, { Component, Fragment } from 'react'
import { Link, withRouter, Redirect } from 'react-router-dom'
import { showBills, editBill } from '../api'
import apiUrl from '../../apiConfig'
import BillForm from './BillForm'

class BillEdit extends Component {
  constructor(props) {
    super(props)

    this.state = {
      bill: {
        name: '',
        price: '',
        date: '',
        user: props.user._id
      },
      edited: false,
      user: props.user,
      billID: props.match.params.id,
      isHidden: true
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

    editBill(this.state)
      .then(res => res.ok ? res : new Error())
      .then(data => this.setState({ edited: true }))
      .catch(console.error)
  }

  render () {
    if (this.state.edited === true) {
      return <Redirect to='/bills' />
    }
    return (
      <Fragment>
        {!this.state.isHidden && <BillForm
          handleChange={this.handleChange}
          handleBill={this.edit}
          bill={this.state.bill}
          toggleName="Edit"
        />}
        <button onClick={this.toggleHidden.bind(this)} >
        Edit Your Bill
        </button>
      </Fragment>
    )
  }
}

export default withRouter(BillEdit)
