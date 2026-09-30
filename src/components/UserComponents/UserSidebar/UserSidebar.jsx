import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import {
    Home,
    ShoppingBag,
    ShoppingCart,
    ClipboardList,
    UserRound,
    LogOut,
    ArrowUpRight,
    Coffee
} from 'lucide-react'
import { useCart } from '../../../context/CartContext'
import styles from './UserSidebar.module.css'

function UserSidebar() {
    const { getCartCount } = useCart()
    const navigate = useNavigate()

    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'))
    const userName = loggedInUser?.name || 'Chai Guest'
    const userInitial = userName.charAt(0).toUpperCase()

    const handleLogout = () => {
        localStorage.removeItem('loggedInUser')
        navigate('/login')
    }

    return (
        <aside className={styles.sidebar}>
            <div className={styles.topArea}>
                <div className={styles.brand}>
                    <div className={styles.logoIcon}>
                        <Coffee size={21} />
                    </div>

                    <div className={styles.brandText}>
                        <h2>Chai Loop</h2>
                        <span>Your cafe space</span>
                    </div>
                </div>

                <div className={styles.userCard}>
                    <div className={styles.avatar}>
                        {userInitial}
                    </div>

                    <div className={styles.userDetails}>
                        <span className={styles.welcomeText}>WELCOME BACK</span>
                        <strong>{userName}</strong>
                    </div>
                </div>
            </div>

            <nav className={styles.navigation}>
                <div className={styles.navGroup}>
                    <span className={styles.groupTitle}>DISCOVER</span>

                    <NavLink
                        to="/"
                        end
                        className={({ isActive }) =>
                            isActive ? styles.activeLink : styles.navLink
                        }
                    >
                        <Home size={18} />
                        <span>Home</span>
                    </NavLink>

                    <NavLink
                        to="/menu"
                        className={({ isActive }) =>
                            isActive ? styles.activeLink : styles.navLink
                        }
                    >
                        <ShoppingBag size={18} />
                        <span>Explore Menu</span>
                    </NavLink>
                </div>

                <div className={styles.navGroup}>
                    <span className={styles.groupTitle}>YOUR CHAI LOOP</span>

                    <NavLink
                        to="/cart"
                        className={({ isActive }) =>
                            isActive ? styles.activeLink : styles.navLink
                        }
                    >
                        <ShoppingCart size={18} />
                        <span>My Cart</span>

                        {getCartCount() > 0 && (
                            <span className={styles.cartBadge}>
                                {getCartCount()}
                            </span>
                        )}
                    </NavLink>

                    <NavLink
                        to="/user/orders"
                        className={({ isActive }) =>
                            isActive ? styles.activeLink : styles.navLink
                        }
                    >
                        <ClipboardList size={18} />
                        <span>My Orders</span>
                    </NavLink>

                    <NavLink
                        to="/user/profile"
                        className={({ isActive }) =>
                            isActive ? styles.activeLink : styles.navLink
                        }
                    >
                        <UserRound size={18} />
                        <span>My Profile</span>
                    </NavLink>
                </div>
            </nav>

            <div className={styles.bottomArea}>
                <button
                    type="button"
                    className={styles.storeButton}
                    onClick={() => navigate('/')}
                >
                    <span className={styles.storeIcon}>
                        <ArrowUpRight size={16} />
                    </span>

                    <span>
                        <small>BACK TO</small>
                        <strong>Chai Loop Store</strong>
                    </span>
                </button>

                <button
                    type="button"
                    className={styles.logoutButton}
                    onClick={handleLogout}
                >
                    <LogOut size={17} />
                    <span>Logout</span>
                </button>

                <div className={styles.sidebarFooter}>
                    <span>Freshly brewed for you</span>
                    <span>© Chai Loop</span>
                </div>
            </div>
        </aside>
    )
}

export default UserSidebar