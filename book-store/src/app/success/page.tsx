'use client'
import Link from 'next/link'
import BigButton from '../components/Button/Button'
import styles from './styles.module.css'

export default function Success () {
    return (
    <div className={styles.success}>
            <div className={styles.success_container}>
                <div className={styles.success_back}>
                    <a  href="/">Back to home</a>
                </div>
                <h2 className={styles.success_title}>Success</h2>
                <div className={styles.success_message}>
                    <div className={styles.success_message_desk}>
                        <p className={styles.success__text}>Email confirmed</p>
                        <p className={styles.success__text}>Your registration is now completed</p>
                    </div>
                    <Link href="/features/signin" ><BigButton value={"Go to home"}/></Link>
                </div>
            </div>
        </div>
)}