import React, { Fragment } from 'react'

const BillForm = ({ handleChange, handleBill, bill }) => (
  <Fragment>
    <h3>Bills</h3>
    <form onSubmit={handleBill}>
      <label>Retailer</label>
      <input
        name="name"
        placeholder="Retailer"
        value={bill.name}
        onChange={handleChange}
      />
      <label>$</label>
      <input
        name="price"
        placeholder="300"
        value={bill.price}
        onChange={handleChange}
      />
      <label>Date</label>
      <input
        name="date"
        type="date"
        value={bill.date}
        onChange={handleChange}
      />
      <input type="submit" value="Edit" />
    </form>
  </Fragment>
)

export default BillForm
