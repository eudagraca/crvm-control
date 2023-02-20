const API_URL = "http://localhost:3000";

const ROLES = {
  ROLE_USER: "Usuario Normal",
  ROLE_ADMIN: "Administrador",
  ROLE_MODERATOR: "Moderador",
};

const containsValue = (source, values = []) => {
  let returnValue = false;
  values.forEach((value) => {
    if (value === source) {
      returnValue = true;
    }
  });
  return returnValue;
};

module.exports = {
  API_URL,
  ROLES,
  containsValue,
};
