import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register, resetAuthState } from "../../redux/slices/authSlice";
import styles from "./Style.module.css";

const Register = () => {
    const dispatch = useDispatch();
    const { loading, error, success } = useSelector((state) => state.auth);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "user",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(register(formData));
    };

    useEffect(() => {
        if (success) {
            alert("Registration Successful");
            dispatch(resetAuthState());
        }
    }, [success, dispatch]);

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h2 className={styles.title}>Sign Up</h2>

                <form className={styles.form} onSubmit={handleSubmit}>

                    <div className={styles.inputGroup}>
                        <label>Name</label>
                        <input name="name" onChange={handleChange} required />
                    </div>

                    <div className={styles.inputGroup}>
                        <label>Email</label>
                        <input name="email" type="email" onChange={handleChange} required />
                    </div>

                    <div className={styles.inputGroup}>
                        <label>Password</label>
                        <input
                            name="password"
                            type="password"
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <label>Register As</label>
                        <select name="role" onChange={handleChange}>
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>

                    <button className={styles.button} disabled={loading}>
                        {loading ? "Registering..." : "Register"}
                    </button>
                    {error && <p style={{ color: "red" }}>{error}</p>}

                </form>

                <p className={styles.footerText}>
                    Already have an account? <Link to="/login">Login</Link>

                </p>
            </div>
        </div>
    );
};

export default Register;
