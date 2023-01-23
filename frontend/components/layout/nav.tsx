import { useEffect, useState } from 'react';
import PersonIcon from '@mui/icons-material/Person';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import Badge, { BadgeProps } from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import { useSelector } from 'react-redux';

import ShoppingCart from '../shoppingCart/shoppingCart';
import Link from 'next/link';
import getCookie from '../../utils/getCookie';

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));

const Nav = () => {
  const [isCartVisible, setIsCartVisible] = useState<boolean>(false);
  const cart = useSelector((state: any) => state.cart)
  const [isUserLogged, setIsUserLogged] = useState(false);

  const getTotalQuantity = () => {
    let total = 0
    cart && cart.forEach((item: any) => {
      total += item.quantity
    })
    return total
  }

  useEffect(() => {
    const token = getCookie(document.cookie, 'jwt');
    if (token) {
      setIsUserLogged(true);
    }
  }, [])

  async function logOut() {
    try {
      const requestUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/logout/`;
      const response = await fetch(requestUrl, {method: 'POST'})
      if (response.status === 200)
        setIsUserLogged(false);
        document.cookie = 'jwt=; Max-Age=0; path=/;';
        return;
    } catch {
      return; // handle exceptions here
    }
  };

  return (
    <nav className="flex items-center justify-between flex-wrap bg-sky-900 p-6">
      {isCartVisible && <ShoppingCart onClick={setIsCartVisible} />}
      <div className="flex items-center flex-shrink-0 text-white mr-6 cursor-pointer">
        <Link href="/">
          <span className="font-semibold text-xl tracking-tight">WebShop</span>
        </Link>
      </div>

      <div className="block lg:hidden">
        <button className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
          <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
        </button>
      </div>

      <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        <div className="text-sm lg:flex-grow">
          <a href="#responsive-header" className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-white mr-4">
            Fashion
          </a>
          <a href="#responsive-header" className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-white mr-4">
            Electronics & Media
          </a>
          <a href="#responsive-header" className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-white mr-4">
            Toys, Hobby & DIY
          </a>
          <a href="#responsive-header" className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-white mr-4">
            Furniture & Appliances
          </a>
          <a href="#responsive-header" className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-white mr-4">
            Food & Personal Care
          </a>
        </div>

        <div className="flex items-center">
          { isUserLogged && (
            <>
              <button
                className="mx-2 text-white"
                onClick={() => logOut()}
              >
                <Link href="/logout">
                  Logout
                </Link>
              </button>
              <span className="mx-2 cursor-pointer">
                <Link href="/userProfile">
                  <PersonIcon style={{color: 'white'}} />
                </Link>
              </span>
            </>
          )}
          { !isUserLogged && (
            <>
              <span className="mx-2 cursor-pointer text-white">
                <Link href="/login">
                  Sign In
                </Link>
              </span>
              <span className="mx-2 cursor-pointer text-white">
                <Link href="/register">
                  Sign Up
                </Link>
              </span>
            </>
          )}
          <span className="mx-2">
            <IconButton aria-label="cart" onClick={() => setIsCartVisible(prevState => !prevState)}>
              <StyledBadge badgeContent={getTotalQuantity() || 0} color="secondary">
                <ShoppingBagIcon style={{color: 'white'}} />
              </StyledBadge>
            </IconButton>
          </span>
        </div>
      </div>
    </nav>
  );
}

export default Nav;