export const getToken = () => localStorage.getItem("token");

export const getId = () => localStorage.getItem("id");

export const setToken = (token, id) => {
  localStorage.setItem("token", token);
  localStorage.setItem("id", id);
  console.log('Token set in localStorage:', token);
};

export const clearToken = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("id");
};

export default { getToken: getToken, setToken: setToken, clearToken: clearToken };