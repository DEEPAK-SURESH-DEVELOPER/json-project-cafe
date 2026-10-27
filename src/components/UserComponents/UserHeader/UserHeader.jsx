import React from 'react'
import { useNavigate } from 'react-router-dom'
import {
    ShoppingCart,
    LogOut,
    UserRound,
    Circle,
    Coffee
} from 'lucide-react'
import { useCart } from '../../../context/CartContext'
import styles from './UserHeader.module.css'

function UserHeader() {
    const navigate = useNavigate()
    const { getCartCount } = useCart()

    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'))
    const userName = loggedInUser?.name || 'Guest'

    const getGreeting = () => {
        const hour = new Date().getHours()
        // console.log(hour);
        

        if (hour < 12) {
            return 'Good morning'
        }

        if (hour < 17) {
            return 'Good afternoon'
        }

        return 'Good evening'
    }

    const handleLogout = () => {
        localStorage.removeItem('loggedInUser')
        navigate('/login')
    }

    return (
        <header className={styles.header}>
            <div className={styles.headerLeft}>
                <div className={styles.greeting}>
                    <span>{getGreeting()},</span>
                    <strong>{userName}</strong>
                </div>

                <div className={styles.divider}></div>

                <div className={styles.welcome}>
                    <Coffee size={15} />
                    <span>Welcome back to Chai Loop</span>
                </div>
            </div>

            <div className={styles.headerRight}>
                <div className={styles.storeStatus}>
                    <span className={styles.statusIcon}>
                        <Circle size={7} fill="currentColor" />
                    </span>

                    <div>
                        <span className={styles.statusLabel}>STORE</span>
                        <span className={styles.statusText}>Open now</span>
                    </div>
                </div> 

                 <div className={styles.divider}></div> 

                <button
                    type="button"
                    className={styles.cartButton}
                    onClick={() => navigate('/cart')}
                >
                    <ShoppingCart size={18} />

                    <span>Cart</span>

                    {getCartCount() > 0 && (
                        <span className={styles.cartBadge}>
                            {getCartCount()}
                        </span>
                    )}
                </button>

                <button
                    type="button"
                    className={styles.profileButton}
                    onClick={() => navigate('/user/profile')}
                >
                    <UserRound size={17} />
                    <span>Profile</span>
                </button>

                <button
                    type="button"
                    className={styles.logoutButton}
                    onClick={handleLogout}
                    aria-label="Logout"
                >
                    <LogOut size={17} />
                </button>
            </div>
        </header>
    )
}

export default UserHeader