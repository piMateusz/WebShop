import { useEffect, useState } from "react";
import EmailIcon from '@mui/icons-material/Email';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import jwt_decode from "jwt-decode";

import Orders from "../components/order/orders";
import getCookie from "../utils/getCookie";
import { userInfo } from "../components/shoppingCart/shoppingCart";

interface UserData {
  id: number,
  first_name: string,
  last_name: string,
  email: string,
  address: string,
};

const UserProfile = () => {
  const [currentUser, setCurrentUser] = useState<UserData>();

  useEffect(() => {
    async function fetchCurrentUser(userId: number) {
      const requestUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/user/${userId}`;
      try {
        const response = await fetch(requestUrl);
        if (response.status === 200) {
          const user = await response.json();
          console.log(user)
          setCurrentUser(user);
        };
      } catch {
        return;
      };
    };
    
    const token = getCookie(document.cookie, 'jwt');
    const decoded: userInfo = jwt_decode(token);
    const userId = decoded.id;
    if (userId)
      fetchCurrentUser(userId);

  }, []);

  if (!currentUser) {
    return (
      <h2>User does not exist</h2>
    );
  };

  return (
    <div className="ml-20">
      <h2 className="text-lg font-bold mt-10 mb-2">
        {`Hello ${currentUser.first_name} ${currentUser.last_name} !`}
      </h2>
      <div>
        <EmailIcon fontSize="medium" className="primary-color mr-2 mb-1"/>
        {currentUser.email}
      </div>
      <div>
        <LocalShippingIcon fontSize="medium" className="primary-color mr-2 mb-1" />
        {currentUser.address}
      </div>
      <Orders />
    </div> 
  );
};

export default UserProfile;
