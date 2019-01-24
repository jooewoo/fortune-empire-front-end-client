import apiUrl from '../apiConfig'

export const handleErrors = res => {
  if (res.ok) {
    return res
  } else  {
    throw new Error('Recieved status in 400 or 500 range.')
  }
}

export const createProfile = credentials => {
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
