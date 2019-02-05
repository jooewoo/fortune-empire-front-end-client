import React, { Fragment } from 'react'
import './Bill.scss'
import { DatePicker } from 'antd'
import 'antd/dist/antd.css'

const BillForm = ({ className, handleChange, handleBill, bill, toggleName, onDateChange }) => (
  <Fragment>
    <form onSubmit={handleBill} className={className}>
      <input
        required
        name="name"
        placeholder="Bill"
        value={bill.name}
        onChange={handleChange}
        className="bill-form-input"
      />
      <input
        required
        name="price"
        placeholder="300"
        value={bill.price}
        onChange={handleChange}
        className="bill-form-input"
      />
      <DatePicker name="date" onChange={onDateChange} />
    </form>
  </Fragment>
)

export default BillForm
