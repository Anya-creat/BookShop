'use client'

import Link from 'next/link'
import styles from './styles.module.css'
import { FormEvent, useEffect, useState } from 'react'
import Button from '@/app/components/Button/Button'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { login, register, activate } from './profileSlice'
import { useRouter } from 'next/navigation'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'



export default function SignIn() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')
    const [uid, setUid] = useState('')
    const [token, setToken] = useState('')
    const [activeTab, setActiveTab] = useState<'signin' | 'signup'>('signin')

    const dispatch = useAppDispatch()

    const router = useRouter()

    const handleLogin = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch(login({ email: email, password: password }))
    }
    const handleRegister = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch(register({ email: email, password: password, username }))
    }
    const handleRedirect = () => {
        router.push('/')
    }
    const handleActivate = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch(activate({ uid, token }))
    }


    const isActivationNeeded = useAppSelector(state => state.profile.isActivationNeeded)
    const isActivationCompleted = useAppSelector(state => state.profile.isActivationCompleted)
    const userEmail = useAppSelector(state => state.profile.email)
     useEffect(() => {
        // Перенаправление после успешной активации
        if (isActivationCompleted) {
            handleRedirect()
        }
        // Перенаправление после успешного логина
        if (userEmail && !isActivationNeeded) {
            handleRedirect()
        }
    }, [isActivationCompleted, userEmail, isActivationNeeded])

    return (
        <div className={styles.signin}>
            <Header />
            <div className={styles.signin_container}>
                <div className={styles.signin_form_card}>
                    <div className={styles.tab_container}>
                        <button
                            className={`${styles.tab_button} ${activeTab === 'signin' ? styles.tab_active : ''}`}
                            onClick={() => setActiveTab('signin')}
                        >
                            SIGN IN
                        </button>
                        <button
                            className={`${styles.tab_button} ${activeTab === 'signup' ? styles.tab_active : ''}`}
                            onClick={() => setActiveTab('signup')}
                        >
                            SIGN UP
                        </button>
                    </div>

                    {activeTab === 'signin' && (
                        <form className={styles.signin_form} onSubmit={handleLogin}>
                            <div className={styles.form_group}>
                                <label className={styles.signin_label}>Email</label>
                                <input
                                    className={styles.signin_input}
                                    type="email"
                                    placeholder="Your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            <div className={styles.form_group}>
                                <label className={styles.signin_label}>Password</label>
                                <input
                                    className={styles.signin_input}
                                    type="password"
                                    placeholder="Your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>

                            <div className={styles.forgot_password}>
                                <a href="/">Forgot password ?</a>
                            </div>

                            <Button value={"SIGN IN"} type="submit" />
                        </form>
                    )}

                    {activeTab === 'signup' && (
                        <div className={styles.signup_content}>
                            {!isActivationNeeded ? (
                                <form className={styles.signin_form} onSubmit={handleRegister}>
                                    <div className={styles.form_group_signup}>
                                        <label className={styles.signin_label}>User Name</label>
                                        <input
                                            className={styles.signin_input}
                                            type="text"
                                            placeholder="Your name"
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                        />
                                    </div>

                                    <div className={styles.form_group_signup}>
                                        <label className={styles.signin_label}>Email</label>
                                        <input
                                            className={styles.signin_input}
                                            type="email"
                                            placeholder="Your email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>

                                    <div className={styles.form_group_signup_last}>
                                        <label className={styles.signin_label}>Password</label>
                                        <input
                                            className={styles.signin_input}
                                            type="password"
                                            placeholder="Your password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </div>

                                    <Button value={"REGISTRATION"} type="submit" />
                                </form>
                            ) : (
                                <form className={styles.signin_form} onSubmit={handleActivate}>
                                    <div className={styles.form_group}>
                                        <label className={styles.signin_label}>Uid</label>
                                        <input
                                            className={styles.signin_input}
                                            type="text"
                                            placeholder="Your uid"
                                            value={uid}
                                            onChange={(e) => setUid(e.target.value)}
                                        />
                                    </div>

                                    <div className={styles.form_group}>
                                        <label className={styles.signin_label}>Token</label>
                                        <input
                                            className={styles.signin_input}
                                            type="text"
                                            placeholder="Your token"
                                            value={token}
                                            onChange={(e) => setToken(e.target.value)}
                                        />
                                    </div>

                                    <Button value={"ACTIVATE"} type="submit" />
                                </form>
                            )}
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    )
}
