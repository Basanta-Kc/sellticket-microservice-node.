import { useState } from 'react'
import Router from 'next/router'
import useRequest from '../../hooks/use-request'
import { SIGN_IN } from '../../api/constants'

const SignIn = () => {
	const [credentials, setCredentials] = useState({ email: '', password: '' })

	const { doRequest, errors } = useRequest({
		url: SIGN_IN,
		method: 'post',
		body: credentials,
		onSuccess: () => Router.push('/'),
	})

	const handleChange = (e) => {
		setCredentials({ ...credentials, [e.target.name]: e.target.value })
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		doRequest()
	}

	return (
		<form onSubmit={handleSubmit}>
			<h1>Sign In</h1>
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
			<button className='btn btn-primary'>Sign In</button>
		</form>
	)
}

export default SignIn
