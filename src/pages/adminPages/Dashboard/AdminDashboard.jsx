import React, { useEffect, useState } from 'react'
import {
    Package,
    Users,
    ShoppingBag,
    ArrowUpRight,
    Clock3,
    CheckCircle2,
    XCircle,
    ClipboardList
} from 'lucide-react'
import {
    getAllOrdersAPI,
    getAllProductsAPI,
    getAllUsersAPI
} from '../../../services/allAPI'
import styles from './AdminDashboard.module.css'
import GlareHover from '../../../components/GlareHover/GlareHover'

function AdminDashboard() {
    const [products, setProducts] = useState([])
    const [users, setUsers] = useState([])
    const [orders, setOrders] = useState([])

    const getDashboardData = async () => {
        try {
            const [
                productsResponse,
                usersResponse,
                ordersResponse
            ] = await Promise.all([
                getAllProductsAPI(),
                getAllUsersAPI(),
                getAllOrdersAPI()
            ])

            setProducts(productsResponse.data)

            const normalUsers = usersResponse.data.filter(
                (user) => user.role === 'user'
            )

            setUsers(normalUsers)
            setOrders(ordersResponse.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getDashboardData()
    }, [])

    const getStatusClass = (status) => {
        const normalizedStatus = status?.toLowerCase()

        if (
            normalizedStatus === 'completed' ||
            normalizedStatus === 'delivered' ||
            normalizedStatus === 'confirmed'
        ) {
            return styles.statusSuccess
        }

        if (
            normalizedStatus === 'cancelled' ||
            normalizedStatus === 'canceled'
        ) {
            return styles.statusDanger
        }

        return styles.statusPending
    }

    const getStatusIcon = (status) => {
        const normalizedStatus = status?.toLowerCase()

        if (
            normalizedStatus === 'completed' ||
            normalizedStatus === 'delivered' ||
            normalizedStatus === 'confirmed'
        ) {
            return <CheckCircle2 size={13} />
        }

        if (
            normalizedStatus === 'cancelled' ||
            normalizedStatus === 'canceled'
        ) {
            return <XCircle size={13} />
        }

        return <Clock3 size={13} />
    }

    const recentOrders = orders
        .slice(-5)
        .reverse()

    return (
        <div className={styles.dashboardContainer}>
            <div className={styles.pageHeader}>
                <div>
                    <span className={styles.eyebrow}>Overview</span>
                    <h1>Dashboard</h1>
                    <p>
                        Welcome back. Here's what's happening with Chai Loop today.
                    </p>
                </div>

                <div className={styles.headerBadge}>
                    <span className={styles.onlineDot}></span>
                    Store Online
                </div>
            </div>

            <div className={styles.dashboardCards}>
                <GlareHover
                    width="100%"
                    height="100%"
                    background="#201b16"
                    borderRadius="16px"
                    borderColor="rgba(255,255,255,0.07)"
                    glareColor="#d6ae7e"
                    glareOpacity={0.14}
                    glareAngle={-30}
                    glareSize={260}
                    transitionDuration={800}
                >
                    <div className={styles.dashboardCard}>
                        <div className={styles.cardTop}>
                            <div className={`${styles.cardIcon} ${styles.productIcon}`}>
                                <Package size={20} />
                            </div>

                            <span className={styles.cardArrow}>
                                <ArrowUpRight size={16} />
                            </span>
                        </div>

                        <div className={styles.cardContent}>
                            <span>Total Products</span>
                            <h2>{products.length}</h2>
                        </div>

                        <p className={styles.cardDescription}>
                            Products available in your store
                        </p>
                    </div>
                </GlareHover>

                <GlareHover
                    width="100%"
                    height="100%"
                    background="#201b16"
                    borderRadius="16px"
                    borderColor="rgba(255,255,255,0.07)"
                    glareColor="#d6ae7e"
                    glareOpacity={0.14}
                    glareAngle={-30}
                    glareSize={260}
                    transitionDuration={800}
                >
                    <div className={styles.dashboardCard}>
                        <div className={styles.cardTop}>
                            <div className={`${styles.cardIcon} ${styles.userIcon}`}>
                                <Users size={20} />
                            </div>

                            <span className={styles.cardArrow}>
                                <ArrowUpRight size={16} />
                            </span>
                        </div>

                        <div className={styles.cardContent}>
                            <span>Total Users</span>
                            <h2>{users.length}</h2>
                        </div>

                        <p className={styles.cardDescription}>
                            Registered customers on the platform
                        </p>
                    </div>
                </GlareHover>

                <GlareHover
                    width="100%"
                    height="100%"
                    background="#201b16"
                    borderRadius="16px"
                    borderColor="rgba(255,255,255,0.07)"
                    glareColor="#d6ae7e"
                    glareOpacity={0.14}
                    glareAngle={-30}
                    glareSize={260}
                    transitionDuration={800}
                >
                    <div className={styles.dashboardCard}>
                        <div className={styles.cardTop}>
                            <div className={`${styles.cardIcon} ${styles.orderIcon}`}>
                                <ShoppingBag size={20} />
                            </div>

                            <span className={styles.cardArrow}>
                                <ArrowUpRight size={16} />
                            </span>
                        </div>

                        <div className={styles.cardContent}>
                            <span>Total Orders</span>
                            <h2>{orders.length}</h2>
                        </div>

                        <p className={styles.cardDescription}>
                            Orders received through the store
                        </p>
                    </div>
                </GlareHover>
            </div>

            <section className={styles.recentOrders}>
                <div className={styles.sectionHeader}>
                    <div>
                        <span className={styles.sectionEyebrow}>
                            Activity
                        </span>
                        <h2>Recent Orders</h2>
                    </div>

                    <span className={styles.orderCount}>
                        {orders.length} total
                    </span>
                </div>

                {recentOrders.length === 0 ? (
                    <div className={styles.emptyState}>
                        <div className={styles.emptyIcon}>
                            <ClipboardList size={25} />
                        </div>

                        <h3>No orders yet</h3>

                        <p>
                            New customer orders will appear here once they are received.
                        </p>
                    </div>
                ) : (
                    <div className={styles.ordersList}>
                        {recentOrders.map((order) => (
                            <div
                                className={styles.orderCard}
                                key={order.id}
                            >
                                <div className={styles.orderMain}>
                                    <div className={styles.orderIcon}>
                                        <ShoppingBag size={18} />
                                    </div>

                                    <div className={styles.orderDetails}>
                                        <h3>
                                            Order #{order.id}
                                        </h3>

                                        <p>
                                            {order.customerName || 'Unknown Customer'}
                                        </p>
                                    </div>
                                </div>

                                <div className={styles.orderAmount}>
                                    <span>Total</span>
                                    <strong>
                                        ₹{order.totalAmount}
                                    </strong>
                                </div>

                                <div
                                    className={`${styles.statusBadge} ${getStatusClass(order.status)}`}
                                >
                                    {getStatusIcon(order.status)}
                                    <span>
                                        {order.status || 'Pending'}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </div>
    )
}

export default AdminDashboard