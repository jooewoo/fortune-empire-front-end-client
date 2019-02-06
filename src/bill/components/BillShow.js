import React, { Component, Fragment } from 'react'
import { Link, withRouter, Redirect } from 'react-router-dom'
import { showBill, deleteBill } from '../api'
import apiUrl from '../../apiConfig'
import Moment from 'react-moment'
import BillEdit from './BillEdit'
import messages from '../messages'
import './Bill.scss'
import { Table, Button, Input, Icon, Tabs, InputNumber, Popconfirm, Form } from 'antd'
import 'antd/dist/antd.css'

class BillShow extends Component {
  constructor (props) {
    super(props)

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
      .then(() => this.setState({ deleted: true }))
      .then(() => flash(messages.deleteBillSuccess, 'flash-success'))
      .catch(() => flash(messages.deleteBillFailure, 'flash-warning'))
  }

  render () {
    const { name, price, date } = this.state.bill
    if (this.state.deleted === true) {
      return <Redirect to='/bills' />
    }

    return (
      <Fragment>
        <div className='bill-show'>
          <p>Bill: {name}</p>
          <p>Price: ${price}</p>
          <p>Date: <Moment format='MM/DD/YYYY'>{date}</Moment></p>
          <Link to="/bills"><Button type="default" icon="arrow-left"/></Link>
          <Button onClick={this.destroy} shape="circle" icon="delete" />
          <BillEdit user={this.state.user} flash={this.state.flash}/>
        </div>
      </Fragment>
    )
  }
}

export default withRouter(BillShow)
