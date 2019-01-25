import React, { Component, Fragment } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { showBills } from '../api'
import apiUrl from '../../apiConfig'
import Moment from 'react-moment'
import messages from '../messages'
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
      .catch(console.error)
  }

  render () {
    const bills = this.state.bills.map(bill => {
      return (
        <tr key={bill._id} >
          <td><Link to={`/bills/${bill._id}`}>{bill.name}</Link></td>
          <td>${bill.price}</td>
          <td><Moment format='MM/DD/YYYY'>{bill.date}</Moment></td>
        </tr>
      )
    })
    const table = (
      <Fragment>
        <table className='table table-striped table-hover'>
          <thead>
            <tr>
              <th>Bill</th>
              <th>Price</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {bills}
          </tbody>
        </table>
      </Fragment>
    )
    const { flash } = this.props
    return (
      <Fragment>
        <h3>Bills</h3>
        {this.state.bills.length ? table : <h3>You dont have any bills!</h3>}
      </Fragment>
    )
  }
}

export default withRouter(BillIndex)
