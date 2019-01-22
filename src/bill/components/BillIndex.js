import React, { Component, Fragment } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { showBills } from '../api'
import apiUrl from '../../apiConfig'

class BillIndex extends Component {
  constructor (props) {
    super(props)
    console.log(props)

    this.state = {
      bills: [],
      user: props.user
    }
  }

  componentDidMount () {
    showBills(this.state)
      .then(res => res.ok ? res: new Error())
      .then(res => res.json())
      .then(data => this.setState({ bills: data.bills }))
      .catch(console.error)
  }

  render () {
    console.log(this.state.bills)
    const bills = this.state.bills.map(bill => {
      return (
        <li key={bill._id}>
          <Link to={`/bills/${bill._id}`}>
            Retailer: {bill.name}
            Price: ${bill.price}
            Date: {bill.date}
          </Link>
        </li>
      )
    })

    return(
      <Fragment>
        <h3>Bills</h3>
        <ol>{bills}</ol>
      </Fragment>
    )
  }
}

export default withRouter(BillIndex)
