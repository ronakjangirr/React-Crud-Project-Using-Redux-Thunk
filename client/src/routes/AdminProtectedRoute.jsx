import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
//   const user = JSON.parse(localStorage.getItem("user"));

//   if (!user) return <Navigate to="/login" replace />;
//   if (user.role !== "admin") return <Navigate to="/login" replace />;

//   return children;

const user = JSON.parse(localStorage.getItem("user"));
  return user?.role === "admin"
    ? children
    : <Navigate to="/login" replace />;

};

export default AdminRoute;