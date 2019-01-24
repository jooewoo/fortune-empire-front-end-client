import React, { Fragment } from 'react'

const BillForm = ({ handleChange, handleProfile, profile }) => (
  <Fragment>
    <h3>Create Profile</h3>
    <form onSubmit={handleProfile}>
      <label>Retailer</label>
      <input
        name="name"
        placeholder="Retailer"
        value={profile.name}
        onChange={handleChange}
      />
      <label>$</label>
      <input
        name="price"
        placeholder="300"
        value={profile.price}
        onChange={handleChange}
      />
      <label>Date</label>
      <input
        name="date"
        type="date"
        value={profile.date}
        onChange={handleChange}
      />
      <input type="submit" value="Edit" />
    </form>
  </Fragment>
)

export default BillForm
