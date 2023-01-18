import Image from "next/image";
import DeleteIcon from '@mui/icons-material/Delete';

import { incrementQuantity, decrementQuantity, removeItem} from '../shoppingCart/slice';
import { useDispatch } from 'react-redux';
import { shoppingCartProperties } from '../shoppingCart/type';

interface Props {
  product: shoppingCartProperties;
}

const CardProduct = ({ product }: Props) => {
  const dispatch = useDispatch()

  return (
    <div className="flex p-2 border-b-2 border-gray-400">
      <Image 
        src={product.image}
        alt="product"
        width={100}
        height={100}
      />
      <div className="flex flex-col w-full ml-4 mt-2">
        <span className="font-bold text-lg">{product.name}</span>
        <div className="flex mt-4">
          <div
            className="flex bg-sky-900 hover:bg-sky-700 text-white text-lg justify-center items-center w-8 h-8 rounded cursor-pointer"
            onClick={() => dispatch(decrementQuantity(product.id))}
          >
            &minus;
          </div>
          <input className="w-8 h-8 mx-0.5 border-2 rounded text-center" type="number" id="product-amount" name="product-amount" min="1" max="100" value={product.quantity}/>
          <div
            className="flex bg-sky-900 hover:bg-sky-700 text-white text-lg justify-center items-center w-8 h-8 rounded cursor-pointer"
            onClick={() => dispatch(incrementQuantity(product.id))}
          >
            &#43;
          </div>

          <div className="flex text-lg w-4/5 justify-end items-end mr-2">
            {/* Total price rounded to 2 decimal points */}
            {Math.round(product.price * product.quantity * 100) / 100} zł
          </div>
          <button className="mx-2 bg-sky-900 hover:bg-sky-700 rounded w-8 h-8" onClick={() => dispatch(removeItem(product.id))}>
            <DeleteIcon style={{color: 'white'}} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default CardProduct;