import styles from "./styles.module.css"

const Footer: React.FC = () => {
    return (
        <footer className={styles.footer}>
            <p className={styles.footer_text}>©2025 Bookstore</p>
            <p className={styles.footer_text}>All rights reserved</p>
        </footer>
    );
};

export default Footer;