import 'bootstrap/dist/css/bootstrap.css'
import buildClient from '../api/build-client'
import { AUTH_USER } from '../api/constants'
import Header from '../components/header'

const AppComponent = ({ Component, pageProps, authUser }) => {
	return (
		<div>
			<Header authUser={authUser} />
			<Component {...pageProps} />
		</div>
	)
}

AppComponent.getInitialProps = async ({ ctx, Component }) => {
	try {
		const client = buildClient(ctx)
		const {
			data: { authUser },
		} = await client.get(AUTH_USER)
		const pageProps = await Component.getInitialProps?.(ctx)
		return { authUser, pageProps }
	} catch (error) {
		console.log(error)
	}
}

export default AppComponent
