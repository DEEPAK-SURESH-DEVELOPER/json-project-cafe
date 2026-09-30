import React from 'react'
import { useNavigate } from 'react-router-dom'
import {
    LogOut,
    ShieldCheck,
    Circle,
    CalendarDays
} from 'lucide-react'
import styles from './AdminHeader.module.css'

function AdminHeader() {
    const navigate = useNavigate()

    const loggedInUser = JSON.parse(
        localStorage.getItem('loggedInUser')
    )

    const adminName = loggedInUser?.name || 'Chai Loop Admin'

    const adminInitial = adminName
        .charAt(0)
        .toUpperCase()

    const currentDate = new Date().toLocaleDateString(
        'en-IN',
        {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        }
    )

    const handleLogout = () => {
        localStorage.removeItem('loggedInUser')
        navigate('/login')
    }

    return (
        <header className={styles.header}>
            <div className={styles.headerLeft}>
                <div className={styles.brandBlock}>
                    <div className={styles.brandRow}>
                        <h1>Chai Loop</h1>

                        <span className={styles.brandDivider}></span>

                        <span className={styles.panelBadge}>
                            ADMIN PANEL
                        </span>
                    </div>

                    <p>
                        Manage your cafe from one place
                    </p>
                </div>
            </div>

            <div className={styles.headerRight}>
                <div className={styles.storeStatus}>
                    <span className={styles.statusDot}>
                        <Circle size={7} fill="currentColor" />
                    </span>

                    <div>
                        <span className={styles.statusLabel}>
                            STORE
                        </span>

                        <span className={styles.statusText}>
                            Online
                        </span>
                    </div>
                </div>

                <div className={styles.infoDivider}></div>

                <div className={styles.dateInfo}>
                    <CalendarDays size={15} />

                    <div>
                        <span className={styles.dateLabel}>
                            TODAY
                        </span>

                        <span className={styles.dateText}>
                            {currentDate}
                        </span>
                    </div>
                </div>

                <div className={styles.infoDivider}></div>

                <div className={styles.adminProfile}>
                    <div className={styles.adminAvatar}>
                        {adminInitial}
                    </div>

                    <div className={styles.adminInfo}>
                        <span className={styles.adminLabel}>
                            ADMIN
                        </span>

                        <span className={styles.adminName}>
                            {adminName}
                        </span>
                    </div>

                    <ShieldCheck
                        className={styles.adminShield}
                        size={16}
                    />
                </div>

                <button
                    type="button"
                    className={styles.logoutButton}
                    onClick={handleLogout}
                >
                    <LogOut size={16} />
                    <span>Logout</span>
                </button>
            </div>
        </header>
    )
}

export default AdminHeader