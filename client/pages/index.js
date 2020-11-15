import buildClient from '../api/build-client'
import { AUTH_USER } from '../api/constants'

const LandingPage = ({ authUser }) => {
	return <h1>You are {authUser ? 'signedin' : 'signedout'}</h1>
}

LandingPage.getInitialProps = async (ctx) => {
	try {
		const client = buildClient(ctx)
    const { data } = await client.get(AUTH_USER)
		return data
  } catch (error) {
    console.log(error)
  }
}

export default LandingPage

//note First identify what's your loadbalancer service name via the following
// command -> kubectl get service (namepsace name)
//command -> kubectl get services -n ingress-nginx (service name)

// After it use the following url

// http://<service name>.<namespace name>.svc.cluster.local

// We believe it should be

// http://ingress-nginx-controller.ingress-nginx.svc.cluster.local
