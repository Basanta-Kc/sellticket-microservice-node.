// BASE URLs
export const SERVER_URL =
  'http://ingress-nginx-controller.kube-system.svc.cluster.local'

const createAuthURL = (route) => `/api/auth/${route}`

// AUTH ROUTES
export const AUTH_USER = createAuthURL('user')
export const SIGN_UP = createAuthURL('signup')
export const SIGN_IN = createAuthURL('signin')
export const SIGN_OUT = createAuthURL('signout')
