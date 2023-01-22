import Link from "next/link"

const OrderSuccess = () => {
  return (
    <div className="ml-20">
      <h2 className="text-lg font-bold mt-10 mb-5">
        Congratulations !
      </h2>
      <div className="my-5">
        Your order was submitted succesfully and is going to be delivered as soon as possible.
      </div>
      <div>
        <Link href="#" className="primary-color underline">
          You can track your order here
        </Link>
      </div>
    </div>
  );
};

export default OrderSuccess;
