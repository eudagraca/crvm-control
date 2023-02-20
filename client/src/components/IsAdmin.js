import React, { useState, useEffect } from "react";

function IsAdmin({ children }) {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    // Check if user is an admin and set isAdmin state

    if (user) {
      user.roles.forEach((element) => {
        if (element === "ROLE_ADMIN") {
          setIsAdmin(true);
        }
      });
    }
  }, [user]);

  if (isAdmin) {
    return children;
  } else {
    return null;
  }
}

export default IsAdmin;
