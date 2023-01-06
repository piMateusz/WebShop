import Image from "next/image";

import { useDispatch } from 'react-redux';
import { addToCart } from '../shoppingCart/slice';

export interface ProductDict {
  name: string,
  price: string,
  src: string,
  id: number,
}

const Product = ( {src, name, price, id}: ProductDict ) => {
  const dispatch = useDispatch()

  return (
    <div className="flex flex-col cursor-pointer m-4 p-4 border rounded-lg border-gray-400 max-w-xs">
      <Image 
        src={`/img/electronics/${src}`}
        alt="product"
        width={260}
        height={225}
      />
      <div className="pt-1">
        {name}
      </div>
      <div className="pt-2">
        {price} zł
      </div>
      <div className="flex flex-1 overflow-auto justify-end items-end">
        <button
          className="bg-sky-900 hover:bg-sky-700 text-white font-bold py-2 px-4 h-10 rounded"
          onClick={() =>
            dispatch(addToCart({
              id, name, src, price
            }))
          }
        >
            Add to cart
        </button>
      </div>
    </div>
  );
}

export default Product;
