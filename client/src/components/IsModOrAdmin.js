import React, { useState, useEffect } from "react";

function IsModOrAdmin({ children }) {
  const [user, setUser] = useState(null);
  const [isModerator, setIsModerator] = useState(false);
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    // Check if user is an moderator and set isModerator state

    if (user) {
      user.roles.forEach((element) => {
        if (element === "ROLE_MOD" || element === "ROLE_ADMIN") {
          setIsModerator(true);
        }
      });
    }
  }, [user]);

  if (isModerator) {
    return children;
  } else {
    return null;
  }
}

export default IsModOrAdmin;
