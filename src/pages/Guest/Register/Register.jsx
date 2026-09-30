import React, { useState } from 'react'
import { ArrowRight, Coffee, LockKeyhole, Mail, Phone, User } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { getUserByEmailAPI, registerUserAPI } from '../../../services/allAPI'
import logo from '../../../assets/logo.png'
import styles from './Register.module.css'

function Register() {
    const navigate = useNavigate()

    const [userData, setUserData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: ''
    })

    const [message, setMessage] = useState('')

    const handleChange = (e) => {
        const { name, value } = e.target

        setUserData({
            ...userData,
            [name]: value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        setMessage('')

        if (
            !userData.name ||
            !userData.email ||
            !userData.phone ||
            !userData.password ||
            !userData.confirmPassword
        ) {
            setMessage('Please fill all fields')
            return
        }

        if (userData.password !== userData.confirmPassword) {
            setMessage('Passwords do not match')
            return
        }

        try {
            const existingUser = await getUserByEmailAPI(
                userData.email
            )

            if (existingUser.data.length > 0) {
                setMessage('Email already registered')
                return
            }

            const newUser = {
                name: userData.name,
                email: userData.email,
                phone: userData.phone,
                password: userData.password,
                role: 'user'
            }

            await registerUserAPI(newUser)

            setMessage('Registration successful')

            setTimeout(() => {
                navigate('/login')
            }, 1000)
        } catch (error) {
            console.log(error)
            setMessage('Registration failed')
        }
    }

    return (
        <main className={styles.registerPage}>

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
                            JOIN THE LOOP
                        </span>

                        <h1>
                            Make yourself
                            <br />
                            <em>at home.</em>
                        </h1>

                        <p>
                            Create your Chai Loop account and make
                            every visit a little easier. Your next
                            cup is only a few steps away.
                        </p>

                        <div className={styles.introDetails}>

                            <div>
                                <span>01</span>
                                <p>
                                    Create your account
                                </p>
                            </div>

                            <div>
                                <span>02</span>
                                <p>
                                    Explore our menu
                                </p>
                            </div>

                            <div>
                                <span>03</span>
                                <p>
                                    Order your favourites
                                </p>
                            </div>

                        </div>

                    </div>

                    <div className={styles.registerCard}>

                        <div className={styles.cardHeader}>

                            <div className={styles.icon}>
                                <Coffee size={19} />
                            </div>

                            <div>
                                <span>CHAI LOOP</span>
                                <h2>Create account</h2>
                            </div>

                        </div>

                        <p className={styles.cardDescription}>
                            Join us and start your everyday ritual.
                        </p>

                        <form
                            onSubmit={handleSubmit}
                            className={styles.form}
                        >

                            <div className={styles.inputGroup}>

                                <label htmlFor="name">
                                    Full name
                                </label>

                                <div className={styles.inputWrap}>

                                    <User size={16} />

                                    <input
                                        id="name"
                                        type="text"
                                        name="name"
                                        placeholder="Your name"
                                        value={userData.name}
                                        onChange={handleChange}
                                    />

                                </div>

                            </div>

                            <div className={styles.inputGroup}>

                                <label htmlFor="email">
                                    Email address
                                </label>

                                <div className={styles.inputWrap}>

                                    <Mail size={16} />

                                    <input
                                        id="email"
                                        type="email"
                                        name="email"
                                        placeholder="you@example.com"
                                        value={userData.email}
                                        onChange={handleChange}
                                    />

                                </div>

                            </div>

                            <div className={styles.inputGroup}>

                                <label htmlFor="phone">
                                    Phone number
                                </label>

                                <div className={styles.inputWrap}>

                                    <Phone size={16} />

                                    <input
                                        id="phone"
                                        type="tel"
                                        name="phone"
                                        placeholder="Your phone number"
                                        value={userData.phone}
                                        onChange={handleChange}
                                    />

                                </div>

                            </div>

                            <div className={styles.passwordGrid}>

                                <div className={styles.inputGroup}>

                                    <label htmlFor="password">
                                        Password
                                    </label>

                                    <div className={styles.inputWrap}>

                                        <LockKeyhole size={16} />

                                        <input
                                            id="password"
                                            type="password"
                                            name="password"
                                            placeholder="Password"
                                            value={userData.password}
                                            onChange={handleChange}
                                        />

                                    </div>

                                </div>

                                <div className={styles.inputGroup}>

                                    <label htmlFor="confirmPassword">
                                        Confirm
                                    </label>

                                    <div className={styles.inputWrap}>

                                        <LockKeyhole size={16} />

                                        <input
                                            id="confirmPassword"
                                            type="password"
                                            name="confirmPassword"
                                            placeholder="Confirm"
                                            value={userData.confirmPassword}
                                            onChange={handleChange}
                                        />

                                    </div>

                                </div>

                            </div>

                            {message && (
                                <div
                                    className={`${styles.message} ${
                                        message === 'Registration successful'
                                            ? styles.success
                                            : styles.error
                                    }`}
                                >
                                    {message}
                                </div>
                            )}

                            <button
                                type="submit"
                                className={styles.registerButton}
                            >
                                <span>Create Account</span>
                                <ArrowRight size={17} />
                            </button>

                        </form>

                        <div className={styles.loginText}>

                            <span>
                                Already have an account?
                            </span>

                            <Link to="/login">
                                Sign in
                            </Link>

                        </div>

                    </div>

                </div>

                <div className={styles.bottomText}>

                    <span>
                        CHAI LOOP CAFE
                    </span>

                    <span>
                        FIND YOUR MOMENT. MAKE IT YOURS.
                    </span>

                </div>

            </div>

        </main>
    )
}

export default Register