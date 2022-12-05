import Head from 'next/head'
import Image from 'next/image'

import Nav from '../components/layout/nav';
import Footer from '../components/layout/footer';
import Product, { ProductDict } from '../components/product/product';
import { Fragment, useEffect, useState } from 'react';


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
    <div>
      <Head>
        <title>WebShop</title>
        <meta name="description" content="Online web shop" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <main className="min-h-screen relative">
        <Nav />
        <div className="h-full m-4">
          <h1 className="py-2 font-bold">
            Electronics & Media
          </h1>
          <div className="flex justify-around">
            {products.map((item: ProductDict) => 
              <Fragment key={item.src}>
                <Product src={item.src} name={item.name} price={item.price} />
              </Fragment>
            )}
          </div>
        </div>

        <Footer />
      </main>

    </div>
  )
}
