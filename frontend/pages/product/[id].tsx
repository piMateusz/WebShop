
import { ProductDict } from "../../components/product/product";
import { addToCart } from '../../components/shoppingCart/slice';

import { NextPage, GetServerSidePropsContext } from 'next'
import Image from "next/image";
import { useDispatch } from 'react-redux';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const ProductDetailPage: NextPage<ProductDict> = ({name, price, image, id, description}) => {
  const dispatch = useDispatch();

  return (
    <main className="m-6">
      <div className="flex justify-center">
        <div className="flex flex-col">
          <Image
            className="border mb-1 rounded-lg border-gray-400 hover:border-gray-900 hover:cursor-pointer"
            src={image}
            alt="product"
            width={100}
            height={100}
          />
          <Image
            className="border mb-1 rounded-lg border-gray-400 hover:border-gray-900 hover:cursor-pointer"
            src={image}
            alt="product"
            width={100}
            height={100}
          />
          <Image
            className="border mb-1 rounded-lg border-gray-400 hover:border-gray-900 hover:cursor-pointer" 
            src={image}
            alt="product"
            width={100}
            height={100}
          />
          <Image 
            className="border rounded-lg border-gray-400 hover:border-gray-900 hover:cursor-pointer"
            src={image}
            alt="product"
            width={100}
            height={100}
          />
        </div>
        <Image
          className="mx-2"
          src={image}
          alt="product"
          width={400}
          height={400}
        />
        <div className="flex flex-col">
          <h2 className="py-4 text-xl font-bold">
            {name}
          </h2>
          <div className="text-xl font-bold py-4 primary-color">
            {price} zł
          </div>
          <div>
            <LocationOnIcon fontSize="medium" style={{color: 'var(--primary-color)'}} />
            Sprawdź dostępność w sklepach
          </div>
          <div className="flex mt-4 justify-end">
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
          <div className="max-w-xl mt-4 text-sm">
            <em>{description}</em>
          </div>
        </div>
      </div>
    </main>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext){
  let data = null;
  const requestUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/product/${context.query.id}/`;
  const response = await fetch(requestUrl);
  if (response.status === 200)
    data = await response.json();
  return {props: data};
};

export default ProductDetailPage;
