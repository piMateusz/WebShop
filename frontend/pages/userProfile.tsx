import { useEffect, useState } from "react";

const UserProfile = () => {
  const [currentUser, setCurrentUser] = useState('');

  useEffect(() => {
    const newUser = 'John Doe'; // new user mockup
    // by default new user should by taken from api by requesting appropriate endpoint with token taken from cookies
    setCurrentUser(newUser);
  }, []);

  return (
    <div className="ml-20">
      <h2 className="mt-10 mb-5">
        Hello {currentUser} !
      </h2>
      <div className="primary-color">
        In future version of application there will be your profile.  
      </div>
    </div> 
  );
};

export default UserProfile;

