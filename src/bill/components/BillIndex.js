import React, { Component, Fragment } from 'react'
import { Link, withRouter, Redirect } from 'react-router-dom'
import { showBills, deleteBill, editBill  } from '../api'
import apiUrl from '../../apiConfig'
import Moment from 'react-moment'
import messages from '../messages'
import BillCreate from './BillCreate'
import BillForm from './BillForm'
import DonutChart from './DonutChart'
import './Bill.scss'
import { Table, Button, Input, Icon, Tabs, InputNumber, Popconfirm, Form, Modal } from 'antd'
import Highlighter from 'react-highlight-words'
import 'antd/dist/antd.css'

const TabPane = Tabs.TabPane

class BillIndex extends Component {
  constructor (props) {
    super(props)

    this.state = {
      bills: [],
      user: props.user,
      selectedRowKeys: [],
      searchText: '',
      flash: props.flash,
      visible: false,
      bill: this.initialBill(),
      id: ''
    }
  }

  onSelectChange = (selectedRowKeys) => {
    this.setState({ selectedRowKeys })
  }

  showModal = event => {
    const id = event.target.closest('tr').dataset.rowKey
    this.setState({
      visible: true, id: id
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

  componentDidMount () {
    const { flash } = this.props

    showBills(this.state)
      .then(res => res.ok ? res: new Error())
      .then(res => res.json())
      .then(data => this.setState({ bills: data.bills }))
      .then(() => {
        if (this.state.bills.length === 0) {
          flash(messages.noBills, 'flash-success')
        }
      })
      .catch(() => flash(messages.getAllBillsFailure, 'flash-warning'))
  }

  getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys, selectedKeys, confirm, clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => { this.searchInput = node }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Button
          type="primary"
          onClick={() => this.handleSearch(selectedKeys, confirm)}
          icon="search"
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button
          onClick={() => this.handleReset(clearFilters)}
          size="small"
          style={{ width: 90 }}
        >
          Reset
        </Button>
      </div>
    ),
    filterIcon: filtered => <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) => record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => this.searchInput.select())
      }
    },
    render: (text) => (
      <Highlighter
        highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
        searchWords={[this.state.searchText]}
        autoEscape
        textToHighlight={text.toString()}
      />
    ),
  })

  handleSearch = (selectedKeys, confirm) => {
    confirm()
    this.setState({ searchText: selectedKeys[0] })
  }

  handleReset = (clearFilters) => {
    clearFilters()
    this.setState({ searchText: '' })
  }

  destroy = (event) => {
    const { flash } = this.props
    const id = event.target.closest('tr').dataset.rowKey
    deleteBill(id, this.state.user.token)
      .then(res => res.ok ? res: new Error())
      .then(() => this.setState({ deleted: true }))
      .then(() => this.index())
      .then(() => flash(messages.deleteBillSuccess, 'flash-success'))
      .catch(() => flash(messages.deleteBillFailure, 'flash-warning'))
  }

  index = () => {
    const { flash } = this.props

    showBills(this.state)
      .then(res => res.ok ? res: new Error())
      .then(res => res.json())
      .then(data => this.setState({ bills: data.bills }))
      .then(() => {
        if (this.state.bills.length === 0) {
          flash(messages.noBills, 'flash-success')
        }
      })
      .catch(() => flash(messages.getAllBillsFailure, 'flash-warning'))
  }

  edit = event => {
    event.preventDefault()
    const { flash } = this.state
    const id = this.state.id

    editBill(id, this.state)
      .then(res => res.ok ? res : new Error())
      .then(() => this.setState({ edited: true, visible: false }))
      .then(() => this.index())
      .then(() => flash(messages.editBillSuccess, 'flash-success'))
      .catch(() => flash(messages.editBillFailure, 'flash-warning'))
  }

  render () {
    const { flash } = this.props
    const { bills, selectedRowKeys, user, bill } = this.state
    const { visible, confirmLoading, ModalText } = this.state

    let total = 0
    const totalCost = bills.map(bill => {
      total += bill.price
    })

    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange
    }

    let data = {}
    const dataTable = bills.map(bill => {
      return (
        data = {
          key: bill._id,
          view: <Link className='td' to={`/bills/${bill._id}`}>View</Link>,
          name: bill.name,
          price: `$${bill.price}`,
          date: bill.date.split('T')[0],
          delete:
          <Fragment>
            <Button type="default" shape="circle" onClick={this.destroy} icon="delete"/>
            <Button type="default" shape="circle" onClick={this.showModal} icon="edit"/>
            <Modal
              title="Edit Bill"
              visible={visible}
              onOk={this.edit}
              onCancel={this.handleCancel}
              okText="Edit"
            >
              <BillForm
                className='create-bill-form'
                handleChange={this.handleChange}
                handleBill={this.edit}
                bill={this.state.bill}
                toggleName="Edit"
                onDateChange={this.onDateChange}
              />
            </Modal>
          </Fragment>
        }
      )
    })

    const columns = [{
      title: 'View',
      dataIndex: 'view',
      key: 'view'
    },{
      title: 'Bill',
      dataIndex: 'name',
      key: 'name',
      ...this.getColumnSearchProps('name')
    }, {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      ...this.getColumnSearchProps('price')
    }, {
      title: 'Date',
      dataIndex: 'date',
      key: 'date'
    }, {
      title: 'Action',
      dataIndex: 'delete',
      key: 'delete'
    }]

    return (
      <Fragment>
        <Tabs defaultActiveKey="1">
          <TabPane tab="Bills" key="1">
            <div className="bills-tables">
              <BillCreate user={user} flash={flash} />
              <Table rowSelection={rowSelection} columns={columns} dataSource={dataTable} />
            </div>
          </TabPane>
          <TabPane tab="Statistics" key="2">
            <div className="whole-bills">
              <DonutChart bills={bills} total={total} />
            </div>
          </TabPane>
        </Tabs>

      </Fragment>
    )
  }
}

export default withRouter(BillIndex)
