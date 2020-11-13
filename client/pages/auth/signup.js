import { useState } from 'react'
import Router from 'next/router'
import useRequest from '../../hooks/use-request'
import { SIGN_UP } from '../../api/constants'

const SignUp = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' })

  const { doRequest, errors } = useRequest({
    url: SIGN_UP,
    method: 'post',
    body: credentials,
    onSuccess: () => Router.push('/'),
  })

  const handleChange = (e) =>
    setCredentials({ ...credentials, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    doRequest()
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Sign Up</h1>
      <div className='form-group'>
        <label>Email Address</label>
        <input
          type='email'
          name='email'
          className='form-control'
          value={credentials.email}
          onChange={handleChange}
        />
      </div>
      <div className='form-group'>
        <label>Password</label>
        <input
          type='password'
          name='password'
          className='form-control'
          value={credentials.password}
          onChange={handleChange}
        />
      </div>
      {errors}
      <button className='btn btn-primary'>Sign Up</button>
    </form>
  )
}

export default SignUp
