import jwtDecode from "jwt-decode";

function handleUserLogin(token) {
  const decoded = jwtDecode(token);

  console.log(decoded);

  const user = {
    id: decoded.id,
    name: decoded.name,
    email: decoded.email,
  };

  window.localStorage.setItem("token", token);
  window.localStorage.setItem("user", JSON.stringify(user));
  window.localStorage.setItem("id", user.id);
}

function handleUserLogout() {
  window.localStorage.removeItem("token");
  window.localStorage.removeItem("user");
}

function getLoggedInUser() {
  return JSON.parse(window.localStorage.getItem("user"));
}

export { handleUserLogin, handleUserLogout, getLoggedInUser };
