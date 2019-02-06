import React, { Component, Fragment } from 'react'
import { createBill } from '../api'
import { Redirect } from 'react-router-dom'
import { withRouter } from 'react-router'
import apiUrl from '../../apiConfig'
import BillForm from './BillForm'
import BillIndex from './BillIndex'
import messages from '../messages'
import './Bill.scss'
import { Modal, Button, Icon } from 'antd'
import 'antd/dist/antd.css'

class BillCreate extends Component {
  constructor(props) {
    super(props)

    this.state = {
      bill: this.initialBill(),
      user: props.user,
      id: '',
      created: false,
      profile: props.location.profile,
      flash: props.flash,
      visible: false,
      confirmLoading: false
    }
  }

  showModal = () => {
    this.setState({
      visible: true,
    })
  }

  handleCancel = () => {
    this.setState({
      visible: false,
    })
  }

  onDateChange = (date, dateString) => {
    const array = {...this.state.bill}
    array.date = dateString
    this.setState({ bill: array })
  }

  initialBill = () => {
    return {
      name: '',
      price: '',
      date: '',
      user: this.props.user._id
    }
  }

  handleChange = event => {
    const editedBill = {
      ...this.state.bill, [event.target.name]: event.target.value
    }
    this.setState({ bill: editedBill })
  }

  createBill = event => {
    event.preventDefault()
    const { flash } = this.props
    createBill(this.state)
      .then(res => res.ok ? res : new Error())
      .then(res => res.json())
      .then(data => this.setState({ id: data.bill._id, created: true }))
      .then(() => flash(messages.createBillSuccess, 'flash-success'))
      .catch(() => {
        flash(messages.billCreateFailure, 'flash-error')
        this.setState({ bill: this.initialBill() })
      })
  }

  render () {
    const { name, price, date } = this.state.bill
    const { created, id, flash, user, bill } = this.state
    const { visible, confirmLoading, ModalText } = this.state

    if (created === true) {
      return <Redirect to={{ pathname: `/bills/${id}`, flash: flash }} />
    }

    return(
      <Fragment>
        <div className="bills">
          <Button type="primary" className="bill-modal" onClick={this.showModal}>
            <Icon type="plus" /> Add Bill
          </Button>
          <Modal
            title="Add Bill"
            visible={visible}
            onOk={this.createBill}
            onCancel={this.handleCancel}
            okText="Submit"
          >
            <BillForm
              className='create-bill-form'
              handleChange={this.handleChange}
              handleBill={this.createBill}
              bill={bill}
              toggleName="Submit"
              onDateChange={this.onDateChange}
            />
          </Modal>
        </div>
      </Fragment>
    )
  }
}

export default withRouter(BillCreate)
