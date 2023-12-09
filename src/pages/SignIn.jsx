import React, { useState } from 'react'
import styles from "./SignIn.module.scss"
import { Link, useNavigate } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext'

const SignIn = () => {
    const { login } = UserAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState('')
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('')
        try {
            await login(email, password);
            navigate('/')
        }
        catch (e) {
            setError(e.message);
            console.log(e.message);
        }
    }
    return (
        <div className={styles.authCard}>
            <h1 className={styles.authCardHeader}>Login</h1>
            <form className={styles.authForm} onSubmit={handleSubmit}>
                <div className={styles.emailPassInput}>
                    <input onChange={(e) => setEmail(e.target.value)} type="email" className={styles.inputField}></input>
                    <label>
                        Email Address
                    </label>
                </div>
                <div className={styles.emailPassInput}>
                    <input type="password" className={styles.inputField} onChange={(e) => setPassword(e.target.value)}></input>
                    <label>
                        Password
                    </label>
                </div>
                <button className={styles.authButton}>Login</button>
            </form>
            <p className={styles.authRoute}>Don't have an account? <Link to="/sign_up" className={styles.linkUnderline} >Sign Up.</Link></p>
        </div>
    )
}

export default SignIn