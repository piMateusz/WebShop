import { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';

import getCookie from '../../utils/getCookie';
import { userInfo } from '../shoppingCart/shoppingCart';
import { useRouter } from 'next/router';

export interface OrderDict {
  id: number,
  code: string,
  customer: number,
  price: string,
  date_created: string,
  products: ProductOrder[],
}

interface ProductOrder {
  id: number,
  quantity: number,
}
const Orders = () => {
  const [orders, setOrders] = useState<OrderDict[]>();
  const router = useRouter();

  const handleRowClick = (orderId: number) => {
    router.push(`/order/${orderId}`);
  };

  useEffect(() => {
    async function fetchOrders(userId: number) {
      const requestUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/orders/user/${userId}`;
      const res = await fetch(requestUrl);
      if (res.status === 200) {
        const data = await res.json();
        setOrders(data);
      }
      // TODO add try catch and handle exceptions
    };
    const token = getCookie(document.cookie, 'jwt');
    const decoded: userInfo = jwt_decode(token);

    const userId = decoded.id;
    fetchOrders(userId);
  }, []);

  if (!orders || orders.length === 0)
    return <div/>

  return (
    <table className="table-fixed lg:w-1/2 w-2/3 border-collapse border-2 border-black mb-10">
      <caption className='mb-2 text-left primary-color font-bold'>
        Recent Orders
      </caption>
      <thead>
        <tr className="bg-[var(--primary-color)] text-white border-b-2 border-black">
          <th className="p-1">
            Order No.
          </th>
          <th>
            Date
          </th>
          <th>
            Price
          </th>
        </tr>
      </thead>

      <tbody>
        {orders.map((order) => (
            <tr
              key={order.id}
              className="border-b-2 border-black hover:bg-gray-200 cursor-pointer"
              onClick={()=> handleRowClick(order.id)}
            >
              <td className="text-center p-1">
                {order.code}
              </td>
              <td className="text-center">
                {order.date_created}
              </td>
              <td className="text-center">
                {order.price} zł
              </td>
            </tr>     
        ))}
      </tbody>
    </table>
  );
};

export default Orders;
