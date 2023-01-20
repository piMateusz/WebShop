import Head from 'next/head'
import { Fragment } from 'react';

import Product, { ProductDict } from '../components/product/product';

export default function Home({ data }: any) {

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
  )}

  return (
    <>
      <Head>
        <title>WebShop</title>
        <meta name="description" content="Online web shop" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <main className="m-4 max-w-7xl mx-auto">
        <h1 className="py-2 text-xl font-bold">
          Electronics & Media
        </h1>
        <div className="flex justify-around">
          {data.map((item: ProductDict) =>
            <Fragment key={item.image}>
              <Product image={item.image} name={item.name} price={item.price} id={item.id} />
            </Fragment>
          )}
        </div>
      </main>
    </>
  )
}

export async function getServerSideProps() {
  let data = null;
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/`)
    if (response.status === 200)
     data = await response.json();
  }
  catch {
    return {
      props: {data}, 
    };
  }
  return {
    props: {data},
  };
}
