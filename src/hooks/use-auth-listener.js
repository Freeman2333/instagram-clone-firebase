import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";

import { auth } from "../lib/firebase";

export default function useAuthListener() {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("authUser"))
  );
  useEffect(() => {
    onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        console.log(authUser);
        // We have a user...therefore we can store the user in localStorage
        localStorage.setItem("authUser", JSON.stringify(authUser));
        setUser(authUser);
      } else {
        // We don't have an authUser, therefore clear the localStorage
        localStorage.removeItem("authUser");
        setUser(null);
      }
    });
  }, []);
  return { user };
}
