import React, { useEffect, useState } from 'react'
import {
    UserRound,
    Mail,
    Phone,
    ShieldCheck,
    Pencil,
    Check,
    X,
    LogOut
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { updateUserAPI } from '../../../services/allAPI'
import styles from './UserProfile.module.css'

function UserProfile() {
    const navigate = useNavigate()

    const [loggedInUser, setLoggedInUser] = useState(null)
    const [isEditing, setIsEditing] = useState(false)
    const [isSaving, setIsSaving] = useState(false)
    const [message, setMessage] = useState('')

    const [userData, setUserData] = useState({
        name: '',
        email: '',
        phone: ''
    })

    useEffect(() => {
        const storedUser = JSON.parse(
            localStorage.getItem('loggedInUser')
        )

        if (!storedUser) {
            navigate('/login')
            return
        }

        setLoggedInUser(storedUser)

        setUserData({
            name: storedUser.name || '',
            email: storedUser.email || '',
            phone: storedUser.phone || ''
        })
    }, [navigate])

    const handleChange = (e) => {
        const { name, value } = e.target

        setUserData((previousData) => ({
            ...previousData,
            [name]: value
        }))

        setMessage('')
    }

    const handleEdit = () => {
        setMessage('')
        setIsEditing(true)
    }

    const handleCancel = () => {
        setUserData({
            name: loggedInUser?.name || '',
            email: loggedInUser?.email || '',
            phone: loggedInUser?.phone || ''
        })

        setMessage('')
        setIsEditing(false)
    }

    const handleSave = async () => {
        if (!userData.name.trim()) {
            setMessage('Please enter your name')
            return
        }

        if (!userData.email.trim()) {
            setMessage('Please enter your email')
            return
        }

        if (!userData.phone.trim()) {
            setMessage('Please enter your phone number')
            return
        }

        try {
            setIsSaving(true)
            setMessage('')

            const updatedData = {
                ...loggedInUser,
                name: userData.name.trim(),
                email: userData.email.trim(),
                phone: userData.phone.trim()
            }

            await updateUserAPI(loggedInUser.id, updatedData)

            localStorage.setItem(
                'loggedInUser',
                JSON.stringify(updatedData)
            )

            setLoggedInUser(updatedData)
            setIsEditing(false)
            setMessage('Profile updated successfully')
        } catch (error) {
            console.log(error)
            setMessage('Failed to update profile')
        } finally {
            setIsSaving(false)
        }
    }

    const handleLogout = () => {
        localStorage.removeItem('loggedInUser')
        navigate('/login')
    }

    if (!loggedInUser) {
        return null
    }

    const userInitial = userData.name
        ? userData.name.charAt(0).toUpperCase()
        : 'U'

    return (
        <div className={styles.profileContainer}>
            <section className={styles.pageHeader}>
                <div>
                    <span className={styles.eyebrow}>
                        YOUR CHAI LOOP
                    </span>

                    <h1>My Profile</h1>

                    <p>
                        Manage your personal information and
                        account details.
                    </p>
                </div>

                {!isEditing && (
                    <button
                        type="button"
                        className={styles.editButton}
                        onClick={handleEdit}
                    >
                        <Pencil size={15} />
                        Edit Profile
                    </button>
                )}
            </section>

            <div className={styles.profileGrid}>
                <section className={styles.profileCard}>
                    <div className={styles.profileHero}>
                        <div className={styles.avatar}>
                            {userInitial}
                        </div>

                        <div className={styles.profileIdentity}>
                            <h2>{userData.name}</h2>

                            <span className={styles.customerBadge}>
                                <ShieldCheck size={12} />
                                Customer
                            </span>

                            <p>{userData.email}</p>
                        </div>
                    </div>

                    <div className={styles.accountInfo}>
                        <div>
                            <span>ACCOUNT TYPE</span>
                            <strong>Customer</strong>
                        </div>

                        <div>
                            <span>ACCOUNT ID</span>
                            <strong>#{loggedInUser.id}</strong>
                        </div>
                    </div>
                </section>

                <section className={styles.detailsCard}>
                    <div className={styles.cardHeader}>
                        <div>
                            <span>ACCOUNT DETAILS</span>
                            <h2>Personal information</h2>
                        </div>

                        <UserRound size={18} />
                    </div>

                    <div className={styles.form}>
                        <div className={styles.formGroup}>
                            <label htmlFor="name">
                                Full name
                            </label>

                            <div
                                className={
                                    isEditing
                                        ? styles.inputWrapper
                                        : styles.inputWrapperDisabled
                                }
                            >
                                <UserRound size={16} />

                                <input
                                    id="name"
                                    type="text"
                                    name="name"
                                    value={userData.name}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    placeholder="Enter your name"
                                />
                            </div>
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="email">
                                Email address
                            </label>

                            <div
                                className={
                                    isEditing
                                        ? styles.inputWrapper
                                        : styles.inputWrapperDisabled
                                }
                            >
                                <Mail size={16} />

                                <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={userData.email}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    placeholder="Enter your email"
                                />
                            </div>
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="phone">
                                Phone number
                            </label>

                            <div
                                className={
                                    isEditing
                                        ? styles.inputWrapper
                                        : styles.inputWrapperDisabled
                                }
                            >
                                <Phone size={16} />

                                <input
                                    id="phone"
                                    type="tel"
                                    name="phone"
                                    value={userData.phone}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    placeholder="Enter your phone number"
                                />
                            </div>
                        </div>
                    </div>

                    {isEditing && (
                        <div className={styles.formActions}>
                            <button
                                type="button"
                                className={styles.cancelButton}
                                onClick={handleCancel}
                                disabled={isSaving}
                            >
                                <X size={15} />
                                Cancel
                            </button>

                            <button
                                type="button"
                                className={styles.saveButton}
                                onClick={handleSave}
                                disabled={isSaving}
                            >
                                <Check size={15} />

                                {isSaving
                                    ? 'Saving...'
                                    : 'Save Changes'}
                            </button>
                        </div>
                    )}

                    {message && (
                        <div
                            className={
                                message ===
                                'Profile updated successfully'
                                    ? styles.successMessage
                                    : styles.errorMessage
                            }
                        >
                            {message ===
                                'Profile updated successfully' && (
                                <Check size={14} />
                            )}

                            <span>{message}</span>
                        </div>
                    )}
                </section>
            </div>

            <section className={styles.securityCard}>
                <div className={styles.securityIcon}>
                    <ShieldCheck size={19} />
                </div>

                <div className={styles.securityContent}>
                    <h2>Account security</h2>

                    <p>
                        Your account credentials are protected.
                        Password information is never displayed here.
                    </p>
                </div>

                <button
                    type="button"
                    className={styles.logoutButton}
                    onClick={handleLogout}
                >
                    <LogOut size={15} />
                    Logout
                </button>
            </section>
        </div>
    )
}

export default UserProfile