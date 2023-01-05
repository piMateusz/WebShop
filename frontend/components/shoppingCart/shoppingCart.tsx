import { useSelector } from 'react-redux'

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
        {cartProducts.map((item: shoppingCartProperties) =>
          <div key={item.src}>
            <CartProduct product={item}/>
          </div>
        )}
      </div>
    </>
  );
}

export default ShoppingCart