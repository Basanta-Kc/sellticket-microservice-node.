import Link from 'next/link'

const Header = ({ authUser }) => {
	const links = [
		authUser && { label: 'Sign Out', href: '/auth/signout' },
		!authUser && { label: 'Sign In', href: '/auth/signin' },
		!authUser && { label: 'Sing Up', href: '/auth/signup' },
	].filter(link => link).map(({ label, href }) => {
		return <li key={href} className="nav-item ml-2">
			<Link href={href}>{label}</Link>
		</li>
	})
	return (
		<nav className='navbar navbar-light bg-light'>
			<Link href='/'>
				<a className='navbar-brand'>Ticketing</a>
			</Link>

			<div className='d-flex justify-content-end'>
				<ul className='nav d-flex align-items-center'>
					{links}
				</ul>
			</div>
		</nav>
	)
}

export default Header
