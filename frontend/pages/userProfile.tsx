import { useEffect, useState } from "react";

import Orders from "../components/order/orders";

const UserProfile = () => {
  const [currentUser, setCurrentUser] = useState('');

  useEffect(() => {
    const newUser = 'John Doe'; // new user mockup
    // by default new user should by taken from api by requesting appropriate endpoint with token taken from cookies
    setCurrentUser(newUser);
  }, []);

  return (
    <div className="ml-20">
      <h2 className="text-lg font-bold mt-10 mb-5">
        Hello {currentUser} !
      </h2>
      <Orders />
    </div> 
  );
};

export default UserProfile;

