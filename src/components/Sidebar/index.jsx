import { useContext } from "react";

import LoggedInUserContext from "../../context/extended-user";
import User from './user';
import Suggestions from './suggestions';

const Sidebar = () => {
  const { extendedUser } = useContext(LoggedInUserContext);
  
  return (
    <div className="p-4">
      <User
        username={extendedUser?.username}
        fullName={extendedUser?.fullName}
      />
      <Suggestions
        userId={extendedUser?.userId}
        following={extendedUser?.following}
        loggedInUserDocId={extendedUser?.docId}
      />
    </div>
  );
}

export default Sidebar