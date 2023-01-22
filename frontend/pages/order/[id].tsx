import { GetServerSidePropsContext } from "next";
import Image from 'next/image';
import qs from 'qs';

import { ProductDict } from '../../components/product/product';
import Link from "next/link";

interface OrderDict {
  id: number,
  code: string,
  customer: number,
  price: string,
  date_created: string,
  // products: ProductDict[],
  products: any[],
}

const Order = (data: OrderDict) => {

  if (!data) {
    return (
      <div>
        <h1>
          500
        </h1>
        <div>
          Internal Server Error :/
        </div>
      </div>
  )};

  return (
    <div className="ml-20">
      <h2 className="text-xl font-bold mt-8 mb-4">
        Order No.: {data.code}
      </h2>
      <div className="text-lg mb-4">
        Date: {data.date_created}
      </div>
      <div className="text-lg primary-color">
        Products orderded: 
      </div>
      <div className="border-2 rounded border-gray-400 my-3 lg:w-1/2 w-2/3">
        {/* {data.products.map((product: ProductDict) => ( */}
        {data.products.map((product: any) => (
          <Link
            href={`/product/${product.id}`}
            key={product.id}
          >
            <div className="flex p-2 border-b-2 border-gray-400">
              <Image 
                src={product.image}
                alt="product"
                width={100}
                height={100}
              />
              <div className="flex flex-col w-full ml-4 mt-2">
                <span className="font-bold text-lg">{product.name}</span>
                <div className="flex flex-1 text-lg justify-end items-end mr-2">
                  {/* Total price rounded to 2 decimal points */}
                  {Math.round(Number(product.price) * product.quantity * 100) / 100} zł
                </div>
              </div>
            </div>
          </Link>
        ))}
        <div className="flex justify-center text-lg font-bold primary-color p-2">
          Total price: {data.price} zł
        </div>
      </div>
    </div> 
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  let data = null;
  const orderId = context.query.id;
  const requestUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/orders/${orderId}`;
  try {
    const response = await fetch(requestUrl);
    if (response.status === 200)
      data = await response.json();
      const products = await fetchProducts(data.products);
      data.products = products; // shall we make copy of products here ?
      return {props: data};
  } catch {
    return {props: data};
  };
};

export async function fetchProducts(productsList: any[]){
  let products = [];
  // const productsIds = data.products.map((product: ProductDict) => (product.id));
  const productsIds = productsList.map((product: any) => (product.product));
  const productsIdsQs = qs.stringify({ id: productsIds }, { indices: false });
  const requestUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/products?${productsIdsQs}`;
  try {
    const response = await fetch(requestUrl);
    if (response.status === 200) {
      products = await response.json();
      // add product quantity for order
      products.map((product: any, idx: number) => {product.quantity = productsList[idx].quantity});
      return products;
    };
  } catch {
    return products;  // TODO handle exceptions
  };
};

export default Order;
