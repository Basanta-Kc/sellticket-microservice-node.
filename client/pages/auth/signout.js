import React, { useEffect } from 'react'
import Router from 'next/router'
import useRequest from '../../hooks/use-request'
import { SIGN_OUT } from '../../api/constants'

const SignOut = () => {
	const { doRequest } = useRequest({
		url: SIGN_OUT,
		method: 'post',
		body: {},
		onSuccess: () => Router.push('/'),
	})

	useEffect(() => {
		doRequest()
	}, [])

	return (
		<div className='spinner-border' role='status'>
			<span className='sr-only'>signning out</span>
		</div>
	)
}

export default SignOut
