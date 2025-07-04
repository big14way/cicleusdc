import { Link, useLocation } from 'react-router-dom'

import logo from 'assets/logo.svg'
import ConnectWallet from 'components/ConnectWallet/ConnectWallet'
import { routes } from 'pages/Router'

import type { RouteConfig } from 'pages/Router'

interface NavLinkProps {
  route: RouteConfig
}

function NavLink({ route }: NavLinkProps) {
  const location = useLocation()
  const isSelected = location.pathname === route.path

  return (
    <Link
      className={`mr-12 font-semibold ${
        isSelected
          ? 'text-gumdrop-500'
          : 'text-licorice-200 hover:text-gumdrop-200 focus:text-gumdrop-200'
      }`}
      to={route.path}
    >
      {route.label}
    </Link>
  )
}

function Nav() {
  return (
    <nav className="flex w-full flex-row items-center p-6">
      <Link className="flex flex-row items-center" to="/">
        <img className="inline h-12" src={logo} alt="logo" />
        <span className="ml-4 text-2xl font-semibold text-white">
          Global USDC Remittance Platform
        </span>
      </Link>

      <div className="ml-auto">
        {routes
          .filter((route) => route.nav)
          .map((route) => (
            <NavLink key={route.path} route={route} />
          ))}

        <ConnectWallet />
      </div>
    </nav>
  )
}

export default Nav
