import React, { useEffect, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import {
    ShoppingBag,
    UserRound,
    LogOut,
    Menu,
    X,
    ChevronDown,
    User,
    ClipboardList
} from 'lucide-react'
import { useCart } from '../../../context/CartContext'
import styles from './UserNavbar.module.css'

function UserNavbar() {
    const navigate = useNavigate()
    const { cart } = useCart()

    const [loggedInUser, setLoggedInUser] = useState(null)
    const [showProfile, setShowProfile] = useState(false)
    const [mobileMenu, setMobileMenu] = useState(false)

    useEffect(() => {
        const user = JSON.parse(
            localStorage.getItem('loggedInUser')
        )

        setLoggedInUser(user)
    }, [])

    const cartCount = cart?.reduce(
        (total, item) => total + Number(item.quantity || 1),
        0
    ) || 0

    const handleLogout = () => {
        localStorage.removeItem('loggedInUser')
        setLoggedInUser(null)
        setShowProfile(false)
        navigate('/')
    }

    const handleCart = () => {
        setMobileMenu(false)
        navigate('/cart')
    }

    const handleLogin = () => {
        setMobileMenu(false)
        navigate('/login')
    }

    const closeMobileMenu = () => {
        setMobileMenu(false)
    }

    const userName = loggedInUser?.name || 'Customer'

    const userInitial = userName
        .charAt(0)
        .toUpperCase()

    return (
        <header className={styles.navbar}>
            <div className={styles.navContainer}>
                <Link
                    to="/"
                    className={styles.logo}
                    onClick={closeMobileMenu}
                >
                    <div className={styles.logoMark}>
                        <span>CL</span>
                    </div>

                    <div className={styles.logoContent}>
                        <span className={styles.logoName}>
                            Chai Loop
                        </span>

                        <span className={styles.logoTagline}>
                            Cafe & Kitchen
                        </span>
                    </div>
                </Link>

                <nav className={styles.desktopNavigation}>
                    <NavLink
                        to="/"
                        end
                        className={({ isActive }) =>
                            isActive
                                ? `${styles.navLink} ${styles.activeLink}`
                                : styles.navLink
                        }
                    >
                        Home
                    </NavLink>

                    <a
                        href="/#menu"
                        className={styles.navLink}
                    >
                        Menu
                    </a>

                    <a
                        href="/#about"
                        className={styles.navLink}
                    >
                        About
                    </a>

                    <a
                        href="/#gallery"
                        className={styles.navLink}
                    >
                        Gallery
                    </a>

                    <a
                        href="/#visit"
                        className={styles.navLink}
                    >
                        Visit
                    </a>
                </nav>

                <div className={styles.navActions}>
                    <button
                        type="button"
                        className={styles.cartButton}
                        onClick={handleCart}
                        aria-label="Open cart"
                    >
                        <ShoppingBag size={19} />

                        {cartCount > 0 && (
                            <span className={styles.cartBadge}>
                                {cartCount}
                            </span>
                        )}
                    </button>

                    {loggedInUser ? (
                        <div className={styles.profileWrapper}>
                            <button
                                type="button"
                                className={styles.profileButton}
                                onClick={() =>
                                    setShowProfile(
                                        !showProfile
                                    )
                                }
                            >
                                <span className={styles.profileAvatar}>
                                    {userInitial}
                                </span>

                                <span className={styles.profileName}>
                                    {userName}
                                </span>

                                <ChevronDown
                                    size={14}
                                    className={
                                        showProfile
                                            ? styles.chevronOpen
                                            : ''
                                    }
                                />
                            </button>

                            {showProfile && (
                                <div
                                    className={
                                        styles.profileDropdown
                                    }
                                >
                                    <div
                                        className={
                                            styles.profileHeader
                                        }
                                    >
                                        <div
                                            className={
                                                styles.dropdownAvatar
                                            }
                                        >
                                            {userInitial}
                                        </div>

                                        <div>
                                            <strong>
                                                {userName}
                                            </strong>

                                            <span>
                                                Customer
                                            </span>
                                        </div>
                                    </div>

                                    <div
                                        className={
                                            styles.dropdownDivider
                                        }
                                    ></div>

                                    <button
                                        type="button"
                                        onClick={() => {
                                            setShowProfile(false)
                                            navigate('/profile')
                                        }}
                                    >
                                        <User size={16} />
                                        <span>
                                            My Profile
                                        </span>
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => {
                                            setShowProfile(false)
                                            navigate('/orders')
                                        }}
                                    >
                                        <ClipboardList size={16} />
                                        <span>
                                            My Orders
                                        </span>
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => {
                                            setShowProfile(false)
                                            navigate('/cart')
                                        }}
                                    >
                                        <ShoppingBag size={16} />
                                        <span>
                                            My Cart
                                        </span>
                                    </button>

                                    <div
                                        className={
                                            styles.dropdownDivider
                                        }
                                    ></div>

                                    <button
                                        type="button"
                                        className={
                                            styles.logoutItem
                                        }
                                        onClick={handleLogout}
                                    >
                                        <LogOut size={16} />
                                        <span>
                                            Logout
                                        </span>
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <button
                            type="button"
                            className={styles.loginButton}
                            onClick={handleLogin}
                        >
                            <UserRound size={16} />
                            <span>Login</span>
                        </button>
                    )}

                    <button
                        type="button"
                        className={styles.mobileMenuButton}
                        onClick={() =>
                            setMobileMenu(!mobileMenu)
                        }
                        aria-label="Toggle navigation"
                    >
                        {mobileMenu ? (
                            <X size={22} />
                        ) : (
                            <Menu size={22} />
                        )}
                    </button>
                </div>
            </div>

            {mobileMenu && (
                <div className={styles.mobileMenu}>
                    <nav className={styles.mobileNavigation}>
                        <NavLink
                            to="/"
                            end
                            onClick={closeMobileMenu}
                            className={({ isActive }) =>
                                isActive
                                    ? `${styles.mobileNavLink} ${styles.mobileActive}`
                                    : styles.mobileNavLink
                            }
                        >
                            Home
                        </NavLink>

                        <a
                            href="/#menu"
                            className={styles.mobileNavLink}
                            onClick={closeMobileMenu}
                        >
                            Menu
                        </a>

                        <a
                            href="/#about"
                            className={styles.mobileNavLink}
                            onClick={closeMobileMenu}
                        >
                            About
                        </a>

                        <a
                            href="/#gallery"
                            className={styles.mobileNavLink}
                            onClick={closeMobileMenu}
                        >
                            Gallery
                        </a>

                        <a
                            href="/#visit"
                            className={styles.mobileNavLink}
                            onClick={closeMobileMenu}
                        >
                            Visit
                        </a>
                    </nav>

                    <div className={styles.mobileActions}>
                        <button
                            type="button"
                            onClick={handleCart}
                            className={styles.mobileActionButton}
                        >
                            <ShoppingBag size={17} />
                            <span>Cart</span>

                            {cartCount > 0 && (
                                <small>{cartCount}</small>
                            )}
                        </button>

                        {loggedInUser ? (
                            <>
                                <button
                                    type="button"
                                    onClick={() => {
                                        closeMobileMenu()
                                        navigate('/profile')
                                    }}
                                    className={styles.mobileActionButton}
                                >
                                    <User size={17} />
                                    <span>My Profile</span>
                                </button>

                                <button
                                    type="button"
                                    onClick={() => {
                                        closeMobileMenu()
                                        navigate('/orders')
                                    }}
                                    className={styles.mobileActionButton}
                                >
                                    <ClipboardList size={17} />
                                    <span>My Orders</span>
                                </button>

                                <button
                                    type="button"
                                    onClick={handleLogout}
                                    className={`${styles.mobileActionButton} ${styles.mobileLogout}`}
                                >
                                    <LogOut size={17} />
                                    <span>Logout</span>
                                </button>
                            </>
                        ) : (
                            <button
                                type="button"
                                onClick={handleLogin}
                                className={styles.mobileLoginButton}
                            >
                                <UserRound size={17} />
                                <span>Login to your account</span>
                            </button>
                        )}
                    </div>
                </div>
            )}
        </header>
    )
}

export default UserNavbar