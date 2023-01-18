import Link from 'next/link';
import { useSelector } from 'react-redux'
import DeleteIcon from '@mui/icons-material/Delete';

import { shoppingCartProperties } from '../shoppingCart/type';
import CartProduct from './cartProduct';

interface Props {
  onClick: (isVisible: boolean) => void;
}

const ShoppingCart = ({ onClick }: Props) => {
  const cartProducts = useSelector((state: any) => state.cart)

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
              <button className="bg-sky-900 hover:bg-sky-700 rounded text-white font-bold py-2 px-4 h-10">
                Proceed to payment
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