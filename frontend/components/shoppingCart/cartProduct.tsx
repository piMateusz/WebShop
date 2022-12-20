import Image from "next/image";

import { ProductDict } from '../product/product';

interface Props {
  product: ProductDict;
}

const CardProduct = ({ product }: Props) => {
  return (
    <div className="flex p-2 border-b-2 border-gray-400">
      <Image 
        src={`/img/electronics/${product.src}`}
        alt="product"
        width={104}
        height={90}
      />
      <div className="flex flex-col w-full ml-4 mt-2">
        <span className="font-bold">{product.name}</span>
        <div className="flex mt-4">
          <div className="flex bg-red-700 text-white text-lg justify-center items-center w-8 h-8 rounded cursor-pointer">&minus;</div>
          <input className="w-8 h-8 mx-0.5 border-2 rounded text-center" type="number" id="product-amount" name="product-amount" min="1" max="100" />
          <div className="flex bg-green-700 text-white text-lg justify-center items-center w-8 h-8 rounded cursor-pointer">&#43;</div>
          <div className="w-4/5 text-right">
            {product.price}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardProduct;