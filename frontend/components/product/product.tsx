import Image from "next/image";

import { useDispatch } from 'react-redux';
import { addToCart } from '../shoppingCart/slice';
import Link from "next/link";

export interface ProductDict {
  name: string,
  price: string,
  image: string,
  id: number,
  description: string,
  stock: number,
  is_active: boolean,
  category: number,
}

interface Props {
  image: string,
  name: string,
  price: string,
  id: number,
}

const Product = ( {image, name, price, id}: Props ) => {
  const dispatch = useDispatch();

  return (
    <div className="flex flex-col m-4 p-4 border rounded-lg border-gray-400 max-w-xs">
      <Link
        href={`/product/${id}`}
      >
        <Image 
          src={image}
          alt="product"
          width={200}
          height={200}
        />
        <div className="pt-2 max-w-[200px] font-bold">
          {name}
        </div>
        <div className="py-2">
          {price} zł
        </div>
      </Link>
      <div className="flex flex-1 overflow-auto justify-end items-end">
        <button
          className="bg-sky-900 hover:bg-sky-700 text-white font-bold py-2 px-4 h-10 rounded"
          onClick={() =>
            dispatch(addToCart({
              id, name, image, price
            }))
          }
        >
            Add to cart
        </button>
      </div>
    </div>
  );
};

export default Product;
