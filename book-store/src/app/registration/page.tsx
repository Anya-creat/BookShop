'use client'

import Link from 'next/link'
import styles from './styles.module.css'
import BigButton from '@/app/components/Button/Button'
import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { activate, register } from '../signin/profileSlice'
import { useRouter } from 'next/navigation'

const Registration = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')
    const [uid, setUid] = useState('')
    const [token, setToken] = useState('')

    const dispatch = useAppDispatch()
    const router = useRouter()

    const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch(register({ email, password, username }))
    }
    const handleRedirect = () => {
        router.push('/success')
    }
    const handleActivate = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch(activate({ uid, token }))
    }

    const isActivationNeeded = useAppSelector(state => state.profile.isActivationNeeded)
    const isActivationCompleted = useAppSelector(state => state.profile.isActivationCompleted)

    useEffect(() => {
        if(isActivationCompleted){
            handleRedirect()
        }
    }, [isActivationCompleted])

    return (
        <>
            <div className={styles.signin_container}>
                <Link href="/">Back to home</Link>
                <h2 className={styles.title}>Registration</h2>
                {!isActivationNeeded ?
                    <form className={styles.signin_form} onSubmit={handleLogin}>
                    {/* <form className={styles.signin_form} onSubmit={handleRedirect}> */}
                        <div className={styles.signin_form_wrapper}>
                            <label className={styles.signin_label} htmlFor='signUser'>User Name</label>
                            <input className={styles.signin_input} id='signInUser' type="text" placeholder="Your name" value={username} onChange={(e) => setUsername(e.target.value)} />
                        </div>
                        <div className={styles.signin_form_wrapper}>
                            <label className={styles.signin_label} htmlFor='signInEmail'>Email</label>
                            <input className={styles.signin_input} id='signInEmail' type="email" placeholder="Your email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className={styles.signin_form_wrapper}>
                            <label className={styles.signin_label} htmlFor='signInPassword'>Password</label>
                            <input className={styles.signin_input} id='signInPassword' type="password" placeholder="Your password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <BigButton value={"Registration"} type='submit' />
                    </form> :

                    <form className={styles.signin_form} onSubmit={handleActivate}>
                        <div className={styles.signin_form_wrapper}>
                            <label className={styles.signin_label} htmlFor='uid'>Uid</label>
                            <input className={styles.signin_input} id='uid' type="text" placeholder="Your uid" value={uid} onChange={(e) => setUid(e.target.value)} />
                        </div>
                        <div className={styles.signin_form_wrapper}>
                            <label className={styles.signin_label} htmlFor='token'>Token</label>
                            <input className={styles.signin_input} id='token' type="text" placeholder="Your token" value={token} onChange={(e) => setToken(e.target.value)} />
                        </div>
                        <BigButton value={"Activate"} type='submit' />
                    </form>}

            </div>
        </>
    )
}

export default Registration