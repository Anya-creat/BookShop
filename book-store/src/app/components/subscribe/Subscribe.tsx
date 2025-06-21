import styles from "./styles.module.css"

const Subscribe: React.FC = () => {
    return (
        <div className={styles.subscribe}>
            <h3 className={styles.subscribe_title}>Subscribe to Newsletter</h3>
            <p className={styles.subscribe_text}>Be the first to know about new IT books, upcoming releases, exclusive offers and more.</p>
            <div className={styles.search_wrapper}>
                <input
                    type="email"
                    placeholder="Your email"
                />
                <button type='submit'>Subscribe</button>
            </div>
        </div>
    )
}

export default Subscribe