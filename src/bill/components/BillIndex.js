import React, { Component, Fragment } from 'react'
import { Link, withRouter, Redirect } from 'react-router-dom'
import { showBills, deleteBill  } from '../api'
import apiUrl from '../../apiConfig'
import Moment from 'react-moment'
import messages from '../messages'
import BillCreate from './BillCreate'
import './Bill.scss'
import { Table, Button, Input, Icon, Tabs, InputNumber, Popconfirm, Form } from 'antd'
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
      searchText: ''
    }
  }

  onSelectChange = (selectedRowKeys) => {
    this.setState({ selectedRowKeys })
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
      .then()
      .then(() => flash(messages.deleteBillSuccess, 'flash-success'))
      .catch(() => flash(messages.deleteBillFailure, 'flash-warning'))
  }

  render () {
    const { flash } = this.props
    const { bills, selectedRowKeys, user } = this.state

    let total = 0
    const totalCost = bills.map(bill => {
      total += bill.price
    })

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
          date: <Moment format='MM/DD/YYYY'>{bill.date}</Moment>,
          delete:
          <Fragment>
            <Button type="default" shape="circle" onClick={this.destroy} icon="delete"/>
            <Button type="default" shape="circle" onClick={this.destroy} icon="edit"/>
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
            <div className="whole-bills">
              <div className="bills-table">
                <BillCreate user={user} flash={flash} />
                <Table rowSelection={rowSelection} columns={columns} dataSource={dataTable} />
              </div>
              <div className="talkbubble">${total}</div>
            </div>
          </TabPane>
          <TabPane tab="Statistics" key="2">
            Content
          </TabPane>
        </Tabs>

      </Fragment>
    )
  }
}

export default withRouter(BillIndex)
