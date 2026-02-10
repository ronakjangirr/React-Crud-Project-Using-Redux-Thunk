import styles from "./Style.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.links}>
        <div>
          <h4>Links</h4>
          <p>About</p>
          <p>Contact</p>
          <p>Features</p>
          <p>Blog</p>
        </div>

        <div>
          <h4>Resources</h4>
          <p>Privacy Policy</p>
          <p>Terms</p>
          <p>FAQ</p>
        </div>

        <div>
          <h4>Actions</h4>
          <p>Sign Up</p>
          <p>Login</p>
          <p>Careers</p>
        </div>
      </div>

      <p className={styles.copy}>© 2025 CREST MERN Project</p>
    </footer>
  );
};

export default Footer;
