import { jwtDecode } from "jwt-decode";

export const getAuthUser = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    return jwtDecode(token);
  } catch (error) {
    console.error("Invalid token", error);
    return null;
  }
};

export const isAdmin = () => {
  const user = getAuthUser();
  return user?.role === "ADMIN";
};
