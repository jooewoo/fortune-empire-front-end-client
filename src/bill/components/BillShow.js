import React, { Component, Fragment } from 'react'
import { Link, withRouter, Redirect } from 'react-router-dom'
import { showBill, deleteBill } from '../api'
import apiUrl from '../../apiConfig'
import Moment from 'react-moment'
import BillEdit from './BillEdit'
import messages from '../messages'

class BillShow extends Component {
  constructor (props) {
    super(props)
    console.log(props)
    this.state = {
      bill: {},
      user: props.user,
      id: props.match.params.id,
      flash: props.flash,
      deleted: false
    }
  }

  componentDidMount () {
    const { flash } = this.props
    showBill(this.state.id, this.state.user.token)
      .then(res => res.ok ? res: new Error())
      .then(res => res.json())
      .then(data => this.setState({ bill: data.bill }))
      .catch(() => flash(messages.getAllBillsFailure, 'flash-warning'))
  }

  destroy = () => {
    const { flash } = this.props
    deleteBill(this.state.id, this.state.user.token)
      .then(res => res.ok ? res: new Error())
      .then(() => flash(messages.deleteBillSuccess, 'flash-success'))
      .then(() => this.setState({ deleted: true }))
      .catch(() => flash(messages.deleteBillFailure, 'flash-warning'))
  }

  render () {
    const { name, price, date } = this.state.bill
    if (this.state.deleted === true) {
      return <Redirect to='/bills' />
    }

    return (
      <Fragment>
        <h3>Bills</h3>
        <p>Bill: {name}</p>
        <p>Price: ${price}</p>
        <p>Date: <Moment format='MM/DD/YYYY'>{date}</Moment></p>
        <button>
          <Link to="/bills">Back</Link>
        </button>
        <button onClick={this.destroy}>Delete</button>
        <BillEdit user={this.state.user} flash={this.state.flash}/>
      </Fragment>
    )
  }
}

export default withRouter(BillShow)
