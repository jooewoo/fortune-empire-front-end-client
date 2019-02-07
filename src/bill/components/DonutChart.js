import React, { Component, Fragment } from 'react'
import { Link, withRouter, Redirect } from 'react-router-dom'
import Moment from 'react-moment'
import messages from '../messages'
const ReactDOM = require('react-dom')
import { Doughnut } from 'react-chartjs-2'
import { Cascader } from 'antd'

class DonutChart extends Component {
  constructor(props) {
    super(props)

    this.state = {
      bills: props.bills,
      total: props.total,
      month: [0],
      donut: false,
      total: ''
    }
  }

  onChange = (value, response) => {
    const months = {
      january: '01',
      february: '02',
      march: '03',
      april: '04',
      may: '05',
      june: '06',
      july: '07',
      august: '08',
      september: '09',
      october: '10',
      november: '11',
      december: '12'
    }

    const filterBills = []
    let total = 0
    const filterData = (
      this.state.bills.map(bill => {
        if (bill.date.split('-')[1] === months[value]) {
          filterBills.push(bill)
          filterBills.map(bill => {
            total += bill.price
          })
        }
        this.setState({
          month: filterBills,
          donut: true,
          title: `Spending for ${response[0].name}`,
          total: total
        })
      })
    )
  }

  render() {
    const donutData = {
      datasets: [{
        data: [],
        backgroundColor: [
          'rgba(137, 154, 255, 0.5)',
          'rgba(5, 126, 118, 0.5)',
          'rgba(228, 10, 100, 0.5)',
          'rgba(44, 227, 235, 0.5)',
          'rgba(218, 181, 102, 0.5)',
          'rgb(104, 66, 181)',
          'rgb(254, 247, 157)',
          'rgb(150, 224, 255)',
          'rgb(37, 217, 173)',
          'rgb(3, 20, 38)'
        ]
      }],
      labels: []
    }

    const options = [{
      code: 'january',
      name: 'January'
    }, {
      code: 'february',
      name: 'February'
    }, {
      code: 'march',
      name: 'March'
    }, {
      code: 'april',
      name: 'April'
    }, {
      code: 'may',
      name: 'May'
    }, {
      code: 'june',
      name: 'June'
    }, {
      code: 'july',
      name: 'July'
    }, {
      code: 'august',
      name: 'August'
    }, {
      code: 'september',
      name: 'September'
    },  {
      code: 'october',
      name: 'October'
    }, {
      code: 'november',
      name: 'November'
    },{
      code: 'december',
      name: 'December'
    }]

    if (this.state.month.length === 0) {
      return (
        <Fragment>
          <div>
            <Cascader fieldNames={{ label: 'name', value: 'code' }} options={options} onChange={this.onChange} placeholder="Please select" />
          </div>
          <div className="nobills-talkbubble">
            <div className='nobills-text'>You have no bills for this month</div>
          </div>

        </Fragment>
      )
    } else if (this.state.donut === true) {
      const array = []
      const labelsArray = []
      const newData = this.state.month.map(bill => {
        array.push(bill.price)
        donutData.datasets[0].data = array

        labelsArray.push(bill.name)
        donutData.labels = labelsArray
      })

      return (
        <Fragment>
          <div>
            <Cascader fieldNames={{ label: 'name', value: 'code' }} options={options} onChange={this.onChange} placeholder="Please select" />
            <div className="talkbubble">Total: ${this.state.total}</div>
          </div>
          <div className="donut">
            <h4>{this.state.title}</h4>
            <Doughnut data={donutData} height={300} />
          </div>
        </Fragment>
      )
    }

    return (
      <Fragment>
        <div>
          <Cascader fieldNames={{ label: 'name', value: 'code' }} options={options} onChange={this.onChange} placeholder="View monthly total" />
        </div>
      </Fragment>
    )
  }
}

export default withRouter(DonutChart)
