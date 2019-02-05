import React, { Component, Fragment } from 'react'
import { Redirect } from 'react-router-dom'
import { withRouter } from 'react-router'
import BillForm from './BillForm'
import messages from '../messages'
import './Bill.scss'
import { Modal, Button, Icon } from 'antd'
import 'antd/dist/antd.css'

class BillModal extends Component {
  constructor(props) {
    super(props)

    this.state = {
      bill: props.bill,
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

  render () {
    const { name, price, date } = this.state.bill
    const { created, id, flash, user, bill } = this.state
    const { visible, confirmLoading, ModalText } = this.state

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

export default withRouter(BillModal)
