import { useEffect } from 'react';

import { ProductDict } from '../product/product';
import CartProduct from './cartProduct';
import { on } from 'events';

interface Props {
  products: ProductDict[];
  onClick: (isVisible: boolean) => void;
}

const ShoppingCart = ({ products, onClick }: Props) => {
  
  return (
    <>
      <button className="absolute top-0 left-0 bg-gray-500 opacity-50 z-10 w-full h-full" onClick={() => onClick(false)}>
      </button>
      <div className="absolute rounded top-36 inset-x-1/4 bg-white z-40 w-1/2 border-2 border-gray-900">
        {products.map((item: ProductDict) => 
          <div key={item.src}>
            <CartProduct product={item} />
          </div>
        )}
      </div>
    </>
  );
}

export default ShoppingCart