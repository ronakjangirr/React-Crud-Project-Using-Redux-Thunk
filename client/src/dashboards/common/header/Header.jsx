import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Style.module.css";
import CreateUserModal from "../../../crud/create/CreateUserModal";
import { useDispatch } from "react-redux";
import { resetAuthState } from "../../../redux/slices/authSlice";

const Header = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role;

  function handleLogout() {
    localStorage.clear();
    dispatch(resetAuthState());
    navigate("/login", { replace: true });
  }

  return (
    <>
      <header className={styles.header}>
        <div className={styles.logo}>Welcome, {user.name}</div>

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
