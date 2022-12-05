import Image from "next/image";

export interface ProductDict {
  name: string,
  price: string,
  src: string
}

const Product = ( {src, name, price}: ProductDict ) => {
  return (
    <div className="cursor-pointer m-4 p-4 border rounded-lg border-gray-400 max-w-xs">
      <Image 
        src={`/img/electronics/${src}`}
        alt="product"
        width={260}
        height={225}
      />
      <div className="pt-1">
        {name}
      </div>
      <div className="pt-1">
        {price}
      </div>
    </div>
  );
}

export default Product;
