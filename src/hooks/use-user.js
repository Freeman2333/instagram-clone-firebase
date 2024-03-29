import { useState, useEffect } from "react";

import { getUserByUserId } from "../services/firebase";

export default function useUser(userId) {
  const [activeUser, setActiveUser] = useState(null);
  useEffect(() => {
    async function getUserObjByUserId(userId) {
      const [user] = await getUserByUserId(userId);
      setActiveUser(user || null);
    }

    if (userId) {
      getUserObjByUserId(userId);
    }
  }, [userId]);

  return { user: activeUser, setActiveUser };
}