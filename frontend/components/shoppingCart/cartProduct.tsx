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
        src={`/img/electronics/${product.src}`}
        alt="product"
        width={104}
        height={90}
      />
      <div className="flex flex-col w-full ml-4 mt-2">
        <span className="font-bold">{product.name}</span>
        <div className="flex mt-4">
          <div
            className="flex bg-red-700 text-white text-lg justify-center items-center w-8 h-8 rounded cursor-pointer"
            onClick={() => dispatch(decrementQuantity(product.id))}
          >
            &minus;
          </div>
          <input className="w-8 h-8 mx-0.5 border-2 rounded text-center" type="number" id="product-amount" name="product-amount" min="1" max="100" value={product.quantity}/>
          <div
            className="flex bg-green-700 text-white text-lg justify-center items-center w-8 h-8 rounded cursor-pointer"
            onClick={() => dispatch(incrementQuantity(product.id))}
          >
            &#43;
          </div>
          <button className="mx-2" onClick={() => dispatch(removeItem(product.id))}>
            <DeleteIcon style={{color: 'red'}} />
          </button>

          <div className="w-4/5 text-right">
            {product.price * product.quantity} zł
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardProduct;