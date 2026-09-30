import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import {
    LayoutDashboard,
    Package,
    ShoppingBag,
    Users,
    CloudUpload,
    Store,
    LogOut
} from 'lucide-react'
import styles from './AdminSidebar.module.css'

function AdminSidebar() {
    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem('user')
        navigate('/login')
    }

    const navItems = [
        {
            title: 'Overview',
            items: [
                {
                    path: '/admin',
                    label: 'Dashboard',
                    icon: LayoutDashboard,
                    end: true
                }
            ]
        },
        {
            title: 'Management',
            items: [
                {
                    path: '/admin/products',
                    label: 'Products',
                    icon: Package
                },
                {
                    path: '/admin/orders',
                    label: 'Orders',
                    icon: ShoppingBag
                },
                {
                    path: '/admin/users',
                    label: 'Users',
                    icon: Users
                }
            ]
        },
        
    ]

    return (
        <aside className={styles.sidebar}>
            <div className={styles.logo}>
                <div className={styles.logoMark}>
                    <span>CL</span>
                </div>

                <div className={styles.logoText}>
                    <h2>Chai Loop</h2>
                    <p>Admin Panel</p>
                </div>
            </div>

            <nav className={styles.navigation}>
                {navItems.map((section) => (
                    <div
                        className={styles.navSection}
                        key={section.title}
                    >
                        <span className={styles.sectionTitle}>
                            {section.title}
                        </span>

                        <div className={styles.sectionLinks}>
                            {section.items.map((item) => {
                                const Icon = item.icon

                                return (
                                    <NavLink
                                        key={item.path}
                                        to={item.path}
                                        end={item.end}
                                        className={({ isActive }) =>
                                            isActive
                                                ? styles.activeLink
                                                : styles.navLink
                                        }
                                    >
                                        <Icon size={18} strokeWidth={1.8} />
                                        <span>{item.label}</span>
                                    </NavLink>
                                )
                            })}
                        </div>
                    </div>
                ))}
            </nav>

            <div className={styles.sidebarBottom}>
                <NavLink
                    to="/"
                    className={styles.storeLink}
                >
                    <Store size={18} strokeWidth={1.8} />
                    <span>Back to Store</span>
                </NavLink>

                <button
                    type="button"
                    className={styles.logoutButton}
                    onClick={handleLogout}
                >
                    <LogOut size={18} strokeWidth={1.8} />
                    <span>Logout</span>
                </button>
            </div>
        </aside>
    )
}

export default AdminSidebar