import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux'
import jwt_decode from 'jwt-decode';

import { shoppingCartProperties } from '../shoppingCart/type';
import CartProduct from './cartProduct';
import getCookie from '../../utils/getCookie';
import { useRouter } from 'next/router';
import { removeAllItems } from './slice';

interface Props {
  onClick: (isVisible: boolean) => void;
}

export interface userInfo {
  id: number;
  exp: number;
  iat: number;
}

// TODO change name of onClick prop to something more meaningful, e.g. setShoppingCartVisible
const ShoppingCart = ({ onClick }: Props) => {
  const cartProducts = useSelector((state: any) => state.cart);
  const dispatch = useDispatch();
  const router = useRouter();

  async function createOrder() {
    const token = getCookie(document.cookie, 'jwt');
    if (token) {
      const decoded: userInfo = jwt_decode(token);
      const userId = decoded.id;
      const CartProductsData = cartProducts.map((product: any) => ( ({id, quantity}) => ({id, quantity}) )(product));
      const body = {user: userId, products: CartProductsData};
      const requestUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/orders/create/`;
      const res = await fetch(requestUrl, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      })
      if (res.status === 200) {
        onClick(false);               // Hide shopping cart
        dispatch(removeAllItems());   // remove all items from shopping cart
        router.push('/orderSuccess')  // redirect to order success page
      }
      // TODO add try catch
    } else {
      // todo pokaz najpierw nalezy sie zalogowac
    }
  };

  return (
    <>
      <button className="absolute top-0 left-0 bg-gray-500 opacity-50 z-10 w-full h-full" onClick={() => onClick(false)}>
      </button>
      <div className="absolute rounded top-36 inset-x-1/4 bg-white z-40 w-1/2 border-2 border-gray-900">
        {cartProducts && cartProducts.length !== 0 && (
          <>
          {cartProducts.map((item: shoppingCartProperties) =>
            <div key={item.image}>
              <CartProduct product={item}/>
            </div>
          )}
            <div className="flex justify-center text-lg mt-3">
              <div className="font-bold mr-2">
                Total value of products:
              </div>
              <div className="">
                {/* Total sum rounded to 2 decimal points */}
                {Math.round(cartProducts.reduce((total: number, obj: shoppingCartProperties) => obj.price*obj.quantity + total,0) * 100) / 100} zł
              </div>
            </div>
            <div className="flex justify-center my-3">
              <button 
                className="bg-sky-900 hover:bg-sky-700 rounded text-white font-bold py-2 px-4 h-10"
                onClick={() => createOrder()}  
              >
                Order
              </button>
            </div>
          </>
        )}
        {cartProducts && cartProducts.length === 0 && (
          <div className="text-center py-4">
            <h3 className="text-lg font-bold my-2">
              Your shopping cart is empty
            </h3>
            <div className="text-lg my-2">
              Let yourself be inspired and fill it with best products
            </div>
            <div>
              <Link
                href="/"
                type="button"
                onClick={() => onClick(false)}
                className="bg-sky-900 hover:bg-sky-700 text-white font-bold py-2 px-4 h-10 rounded"
              >
                Continue shopping
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default ShoppingCart