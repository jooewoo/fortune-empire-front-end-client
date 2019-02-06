import React, { Component, Fragment } from 'react'
import { Link, withRouter, Redirect } from 'react-router-dom'
import { showBills, editBill } from '../api'
import apiUrl from '../../apiConfig'
import BillForm from './BillForm'
import messages from '../messages'
import './Bill.scss'
import { Modal, Button, Icon } from 'antd'
import 'antd/dist/antd.css'

class BillEdit extends Component {
  constructor(props) {
    super(props)

    this.state = {
      bill: this.initialBill(),
      edited: false,
      user: props.user,
      billID: props.match.params.id,
      isHidden: true,
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

  handleOk = () => {
    this.setState({
      confirmLoading: true
    })
    setTimeout(() => {
      this.setState({
        visible: false,
        confirmLoading: false,
      })
    }, 2000)
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

  edit = event => {
    event.preventDefault()
    const { flash } = this.state

    editBill(this.state.billID, this.state)
      .then(res => res.ok ? res : new Error())
      .then(() => this.setState({ edited: true }))
      .then(() => flash(messages.editBillSuccess, 'flash-success'))
      .catch(() => flash(messages.editBillFailure, 'flash-warning'))
  }

  render () {
    const { created, id, flash, user, bill } = this.state
    const { visible, confirmLoading, ModalText } = this.state

    if (this.state.edited === true) {
      return <Redirect to='/bills' />
    }

    return (
      <Fragment>
        <Button type="default" shape="circle" icon="edit" className="bill-modal" onClick={this.showModal}>
        </Button>
        <Modal
          title="Edit Bill"
          visible={visible}
          onOk={this.edit}
          onCancel={this.handleCancel}
          okText="Submit"
        >
          <BillForm
            className='create-bill-form'
            handleChange={this.handleChange}
            handleBill={this.edit}
            bill={bill}
            toggleName="Submit"
            onDateChange={this.onDateChange}
          />
        </Modal>
      </Fragment>
    )
  }
}

export default withRouter(BillEdit)
