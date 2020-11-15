import axios from 'axios'
import { SERVER_URL } from './constants'

const buildClient = ({ req }) => {
	console.log(SERVER_URL)
	const config =
		typeof window === 'undefined'
			? {
					baseURL: `${SERVER_URL}`,
					headers: req.headers,
			  }
			: { baseURL: '/' }
	return axios.create(config)
}

export default buildClient
