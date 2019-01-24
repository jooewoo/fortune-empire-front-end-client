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
    console.log(props)

    this.state = {
      bill: {
        name: '',
        price: '',
        date: '',
        id: props.user._id
      },
      user: props.user,
      id: '',
      created: false
    }
  }

  handleChange = event => {
    console.log(this.state)
    const editedBill = {
      ...this.state.bill, [event.target.name]: event.target.value
    }
    this.setState({ bill: editedBill })
  }

  createBill = event => {
    event.preventDefault()
    console.log(this.state.bill)

    createBill(this.state)
      .then(res => res.ok ? res : new Error())
      .then(res => res.json())
      .then(data => this.setState({ id: data.bill._id, created: true }))
      .catch(console.error)
  }

  render () {
    const { name, price, date } = this.state.bill
    console.log(this.state)

    if (this.state.created === true) {
      return <Redirect to={`/bills/${this.state.id}`} />
    }

    return(
      <Fragment>
        <BillForm
          handleChange={this.handleChange}
          handleBill={this.createBill}
          bill={this.state.bill}
        />
        <BillIndex user={this.state.user}/>
      </Fragment>
    )
  }
}

export default withRouter(BillCreate)
