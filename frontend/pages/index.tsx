import Head from 'next/head'
import { Fragment, useEffect, useState } from 'react';

import Product, { ProductDict } from '../components/product/product';
import ShoppingCart from '../components/shoppingCart/shoppingCart';

export default function Home() {
  const [products, setProducts] = useState<ProductDict[]>([]);

  const fetchProducts = () => {
    fetch('/static/products.json')
      .then((response) => response.json())
      .then((data) => setProducts(data))
  }

  useEffect(() => {
    fetchProducts();
  })

  return (
    <>
      <Head>
        <title>WebShop</title>
        <meta name="description" content="Online web shop" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <main className="m-4">
        <h1 className="py-2 font-bold">
          Electronics & Media
        </h1>
        <div className="flex justify-around">
          {products.map((item: ProductDict) =>
            <Fragment key={item.src}>
              <Product src={item.src} name={item.name} price={item.price} id={item.id} />
            </Fragment>
          )}
        </div>
      </main>
    </>
  )
}
