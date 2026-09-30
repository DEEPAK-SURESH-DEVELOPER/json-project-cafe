import React, { useState } from 'react'
import { ArrowRight, LockKeyhole, Mail, Coffee } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { loginUserAPI } from '../../../services/allAPI'
import logo from '../../../assets/logo.png'
import styles from './Login.module.css'

function Login() {
    const navigate = useNavigate()

    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    })

    const [message, setMessage] = useState('')

    const handleChange = (e) => {
        const { name, value } = e.target

        setLoginData({
            ...loginData,
            [name]: value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        setMessage('')

        if (!loginData.email || !loginData.password) {
            setMessage('Please enter email and password')
            return
        }

        try {
            const response = await loginUserAPI(
                loginData.email,
                loginData.password
            )

            if (response.data.length === 0) {
                setMessage('Invalid email or password')
                return
            }

            const user = response.data[0]

            localStorage.setItem(
                'loggedInUser',
                JSON.stringify(user)
            )

            setMessage('Login successful')

            setTimeout(() => {
                if (user.role === 'admin') {
                    navigate('/admin')
                } else {
                    navigate('/')
                }
            }, 500)
        } catch (error) {
            console.log(error)
            setMessage('Login failed')
        }
    }

    return (
        <main className={styles.loginPage}>

            <div className={styles.background}></div>

            <div className={styles.overlay}></div>

            <div className={styles.pageContent}>

                <Link
                    to="/"
                    className={styles.logo}
                >
                    <img
                        src={logo}
                        alt="Chai Loop"
                    />

                    <div className={styles.logoText}>
                        <span>Chai</span>
                        <strong>Loop</strong>
                    </div>
                </Link>

                <div className={styles.contentGrid}>

                    <div className={styles.intro}>

                        <span className={styles.eyebrow}>
                            WELCOME BACK
                        </span>

                        <h1>
                            Your chai
                            <br />
                            <em>is waiting.</em>
                        </h1>

                        <p>
                            Sign in and get back to the good
                            stuff — fresh chai, coffee, and
                            moments worth staying for.
                        </p>

                        <div className={styles.introFooter}>
                            <span></span>
                            <small>
                                CHAI • COFFEE • COMMUNITY
                            </small>
                        </div>

                    </div>

                    <div className={styles.loginCard}>

                        <div className={styles.cardHeader}>

                            <div className={styles.icon}>
                                <Coffee size={19} />
                            </div>

                            <div>
                                <span>CHAI LOOP</span>
                                <h2>Sign in</h2>
                            </div>

                        </div>

                        <p className={styles.cardDescription}>
                            Enter your details to continue.
                        </p>

                        <form
                            onSubmit={handleSubmit}
                            className={styles.form}
                        >

                            <div className={styles.inputGroup}>

                                <label htmlFor="email">
                                    Email address
                                </label>

                                <div className={styles.inputWrap}>

                                    <Mail size={17} />

                                    <input
                                        id="email"
                                        type="email"
                                        name="email"
                                        placeholder="you@example.com"
                                        value={loginData.email}
                                        onChange={handleChange}
                                    />

                                </div>

                            </div>

                            <div className={styles.inputGroup}>

                                <label htmlFor="password">
                                    Password
                                </label>

                                <div className={styles.inputWrap}>

                                    <LockKeyhole size={17} />

                                    <input
                                        id="password"
                                        type="password"
                                        name="password"
                                        placeholder="Enter your password"
                                        value={loginData.password}
                                        onChange={handleChange}
                                    />

                                </div>

                            </div>

                            {message && (
                                <div
                                    className={`${styles.message} ${
                                        message === 'Login successful'
                                            ? styles.success
                                            : styles.error
                                    }`}
                                >
                                    {message}
                                </div>
                            )}

                            <button
                                type="submit"
                                className={styles.loginButton}
                            >
                                <span>Sign In</span>
                                <ArrowRight size={17} />
                            </button>

                        </form>

                        <div className={styles.registerText}>
                            <span>
                                Don't have an account?
                            </span>

                            <Link to="/register">
                                Create an account
                            </Link>
                        </div>

                    </div>

                </div>

                <div className={styles.bottomText}>
                    <span>
                        CHAI LOOP CAFE
                    </span>

                    <span>
                        GOOD CHAI. GOOD COMPANY. GOOD MOMENTS.
                    </span>
                </div>

            </div>

        </main>
    )
}

export default Login