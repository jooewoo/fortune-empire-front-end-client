import React, { Component, Fragment } from 'react'
import { Link, withRouter, Redirect } from 'react-router-dom'
import { showBill, deleteBill } from '../api'
import apiUrl from '../../apiConfig'
import Moment from 'react-moment'
import BillEdit from './BillEdit'

class BillShow extends Component {
  constructor (props) {
    super(props)

    this.state = {
      bill: {},
      user: props.user,
      id: props.match.params.id
    }
  }

  componentDidMount () {

    showBill(this.state.id, this.state.user.token)
      .then(res => res.ok ? res: new Error())
      .then(res => res.json())
      .then(data => this.setState({ bill: data.bill }))
      .catch(console.error)
  }

  destroy = () => {
    deleteBill(this.state.id, this.state.user.token)
      .then(res => res.ok ? res: new Error())
      .then(data => this.setState({ deleted: true }))
  }

  render () {
    const { name, price, date } = this.state.bill
    if (this.state.deleted === true) {
      return <Redirect to='/bills' />
    }

    return (
      <Fragment>
        <BillEdit user={this.state.user} />
        <h3>Bills</h3>
        <p>Bill: {name}</p>
        <p>Price: ${price}</p>
        <p>Date: <Moment format='MM/DD/YYYY'>{date}</Moment></p>
        <button>
          <Link to="/bills">Back</Link>
        </button>
        <button onClick={this.destroy}><Link to="/bills">Delete</Link></button>
      </Fragment>
    )
  }
}

export default withRouter(BillShow)
