import Head from 'next/head'
import { Fragment, useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';

import Product, { ProductDict } from '../components/product/product';

export default function Home({ data }: any) {
  const [products, setProducts] = useState<any[] | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');

  async function searchProducts() {
    const requestUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/products?search=${searchTerm}`;
    const response = await fetch(requestUrl);
    if (response.status === 200) {
      const products = await response.json();
      setProducts(products);
    }
  };

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    searchProducts();
  };

  useEffect(() => {
    setProducts(data);
  }, [data]);

  if (!products) {
    return (
      <div className="ml-20">
        <h2 className="text-lg font-bold mt-10 mb-5">
          500
        </h2>
        <div className="my-5">
          Internal Server Error :/
        </div>
      </div>
  )}

  if (products.length === 0) {
    return (
      <div className="flex ml-20 my-10 justify-between mx-10">
        <h1 className="text-xl font-bold">
          {`We are sorry, we could not find any products for search term: ${searchTerm}`}
        </h1>
        <form className="text-lg" onSubmit={(event) => handleFormSubmit(event)}>
          <input type="text" className="border-2 p-1 border-black rounded" onChange={(event) => setSearchTerm(event.target.value)}/>
          <button 
            className="mx-2 mt-0.5 align-top"
            type="submit"  
          >
            <SearchIcon fontSize="large" style={{color: 'black'}} />
          </button>
        </form>
      </div>
    );
  };

  return (
    <>
      <Head>
        <title>WebShop</title>
        <meta name="description" content="Online web shop" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <main className="m-4 max-w-7xl mx-auto">
        <div className="flex justify-between mx-10">
          <h1 className="py-2 text-xl font-bold">
            Electronics & Media
          </h1>
          <form className="text-lg" onSubmit={(event) => handleFormSubmit(event)}>
            <input type="text" className="border-2 p-1 border-black rounded" onChange={(event) => setSearchTerm(event.target.value)}/>
            <button 
              className="mx-2 mt-0.5 align-top"
              type="submit"  
            >
              <SearchIcon fontSize="large" style={{color: 'black'}} />
            </button>
          </form>
        </div>



        <div className="flex justify-around">
          {products.map((item: ProductDict) =>
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
