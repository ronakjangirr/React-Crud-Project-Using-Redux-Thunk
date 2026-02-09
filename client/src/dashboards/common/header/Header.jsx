import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Style.module.css";
import CreateUserModal from "../../../crud/create/CreateUserModal";

const Header = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role; // ✅ get role

  function handleLogout() {
    localStorage.clear();
    navigate("/login");
  }
  
  return (
    <>
      <header className={styles.header}>
        <div className={styles.logo}>Ship Cause</div>

        <nav className={styles.nav}>
          <a>About</a>
          <a>Features</a>
          <a>Resources</a>
          <a>Ship Tips</a>
          <a>How It Works</a>
          <a>Contact Us</a>
          <a className={styles.highlight}>Quick Quote</a>
        </nav>

        {role === "admin" && (
          <button className={styles.signupBtn} onClick={() => setOpen(true)}>
            Create User
          </button>
        )}
        <button className={styles.signupBtn} onClick={() => handleLogout()}>Logout</button>

      </header>
      <CreateUserModal
        isOpen={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
};

export default Header;
