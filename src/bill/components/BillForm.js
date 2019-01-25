import React, { Fragment } from 'react'
import './Bill.scss'

const BillForm = ({ className, handleChange, handleBill, bill, toggleName }) => (
  <Fragment>
    <form onSubmit={handleBill} className={className}>
      <input
        required
        name="name"
        placeholder="Bill"
        value={bill.name}
        onChange={handleChange}
      />
      <input
        required
        name="price"
        placeholder="300"
        value={bill.price}
        onChange={handleChange}
      />
      <input
        required
        name="date"
        type="date"
        value={bill.date}
        onChange={handleChange}
      />
      <input type="submit" value={toggleName} />
    </form>
  </Fragment>
)

export default BillForm
