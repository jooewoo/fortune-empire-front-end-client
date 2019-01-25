import apiUrl from '../apiConfig'

export const handleErrors = res => {
  if (res.ok) {
    return res
  } else  {
    throw new Error('Received status in 400 or 500 range.')
  }
}

export const createBill = credentials => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization':`Token token=${credentials.user.token}`
    },
    body: JSON.stringify({
      bill: credentials.bill
    })
  }

  return fetch(`${apiUrl}/bills`, options)
}

export const showBills = credentials => {
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization':`Token token=${credentials.user.token}`
    }
  }

  return fetch(`${apiUrl}/bills`, options)
}

export const deleteBill = (id, token) => {
  const options = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization':`Token token=${token}`
    }
  }

  return fetch(`${apiUrl}/bills/${id}`, options )
}

export const showBill = (id, token) => {
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization':`Token token=${token}`
    }
  }

  return fetch(`${apiUrl}/bills/${id}`, options)
}

export const editBill = (credentials) => {
  const options = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization':`Token token=${credentials.user.token}`
    },
    body: JSON.stringify({
      bill: credentials.bill
    })
  }

  return fetch(`${apiUrl}/bills/${credentials.billID}`, options)
}
