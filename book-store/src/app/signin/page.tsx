'use client'

import Link from 'next/link'
import styles from './styles.module.css'
import { FormEvent, useEffect, useState } from 'react'
import Button from '@/app/components/Button/Button'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { login } from './profileSlice'
import { useRouter } from 'next/navigation'



export default function SignIn () {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useAppDispatch()

    const handleLogin =  (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch(login({email: email, password: password}))
    }

    const router = useRouter()
    const handleRedirect = () => {
        router.push('/')
    }

    const userEmail= useAppSelector(state => state.profile.email)
    useEffect(() => {
        if(userEmail){
            handleRedirect()
        }
    }, [])

    return (
        <div className={styles.signin}>
            <div className={styles.signin_container}>
                <div className={styles.signin_back}>
                    <a  href="/">Back to home</a>
                </div>
                <h2 className={styles.title}>Sign in</h2>
                <div className={styles.signin_form_wrapper}>
                    <form className={styles.signin_form} onSubmit={handleLogin}>
                        <label className={styles.signin_label}>Email</label>
                        <input className={styles.signin_input} type="email" placeholder="Your email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <label className={styles.signin_label}>Password</label>
                        <input className={styles.signin_input} type="password" placeholder="Your password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <div className={styles.signin_forgot_password}>
                        <a href="/">Forgot password?</a>
                        </div>
                        <Button value={"Sign In"} type ="submit"/>
                    </form>
                    <p>Don't have an account? <Link href="/features/registration" className={styles.signup}>Sign up</Link></p>
                </div>
            </div>
        </div>
    )
}