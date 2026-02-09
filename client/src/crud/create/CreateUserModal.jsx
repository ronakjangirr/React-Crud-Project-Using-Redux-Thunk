import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createUser, resetUserState } from "../../redux/slices/userSlice";
import styles from "./Style.module.css";

const CreateUserModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const { loading, error, success } = useSelector((state) => state.users);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    city: "",
  });

  // Close modal on success
  useEffect(() => {
    if (success) {
      onClose();
      dispatch(resetUserState());
      setFormData({
        name: "",
        email: "",
        password: "",
        phone: "",
        city: "",
      });
    }
  }, [success, dispatch, onClose]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(
      createUser({
        ...formData,
        role: "user", // 🔒 admin-created users are always USER
      })
    );
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>Create User</h2>

        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <input
            type="tel"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
            required
          />

          {error && <p className={styles.error}>{error}</p>}

          <div className={styles.actions}>
            <button type="button" onClick={onClose} disabled={loading}>
              Cancel
            </button>
            <button type="submit" disabled={loading}>
              {loading ? "Creating..." : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateUserModal;
