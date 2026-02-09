import Header from "../common/header/Header";
import Footer from "../common/footer/Footer";
import UsersTable from "../common/UserTable/UsersTable";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const AdminDashboard = () => {
   const navigate = useNavigate();

 useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login", { replace: true });
    }
  }, []);

  return (
    <>
      <Header />
      <UsersTable />
      <Footer />
    </>
  );
};

export default AdminDashboard;
