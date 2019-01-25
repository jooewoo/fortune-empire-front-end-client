import React, { Component, Fragment } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { showBills } from '../api'
import apiUrl from '../../apiConfig'
import Moment from 'react-moment'
import messages from '../messages'
import './Bill.scss'

class BillIndex extends Component {
  constructor (props) {
    super(props)

    this.state = {
      bills: [],
      user: props.user
    }
  }

  componentDidMount () {
    const { flash } = this.props

    showBills(this.state)
      .then(res => res.ok ? res: new Error())
      .then(res => res.json())
      .then(data => this.setState({ bills: data.bills }))
      .then(() => {
        if (this.state.bills.length === 0) {
          flash(messages.noBills, 'flash-success')
        } else {
          flash(messages.getAllBillsSuccess, 'flash-success')
        }
      })
      .catch(() => flash(messages.getAllBillsFailure, 'flash-warning'))
  }

  render () {
    const { flash } = this.props
    const { bills } = this.state

    const billsTable = bills.map(bill => {
      return (
        <tr key={bill._id} >
          <td><Link className='td' to={`/bills/${bill._id}`}>{bill.name}</Link></td>
          <td>${bill.price}</td>
          <td><Moment format='MM/DD/YYYY'>{bill.date}</Moment></td>
        </tr>
      )
    })

    const table = (
      <Fragment>
        <table className='table table-striped table-hover'>
          <thead className='thead'>
            <tr>
              <th>Bill</th>
              <th>Price</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {billsTable}
          </tbody>
        </table>
      </Fragment>
    )

    return (
      <Fragment>
        <div className='bills'>
          <h3>Bills</h3>
          {bills.length ? table : <h3>You dont have any bills!</h3>}
        </div>
      </Fragment>
    )
  }
}

export default withRouter(BillIndex)
