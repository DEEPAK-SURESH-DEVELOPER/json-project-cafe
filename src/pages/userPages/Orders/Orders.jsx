import React, { useEffect, useState } from 'react'
import {
    Package,
    Clock3,
    CheckCircle2,
    Truck,
    XCircle,
    ChevronRight,
    ShoppingBag,
    ReceiptText,
    ImageOff
} from 'lucide-react'
import { getUserOrdersAPI } from '../../../services/allAPI'
import styles from './Orders.module.css'

function Orders() {
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)

    const loggedInUser = JSON.parse(
        localStorage.getItem('loggedInUser')
    )

    const getOrders = async () => {
        try {
            setLoading(true)

            const response = await getUserOrdersAPI(loggedInUser.id)

            setOrders(response.data || [])
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (loggedInUser?.id) {
            getOrders()
        } else {
            setLoading(false)
        }
    }, [])

    const getStatusIcon = (status) => {
        const currentStatus = status?.toLowerCase()

        if (currentStatus === 'completed') {
            return <CheckCircle2 size={14} />
        }

        if (currentStatus === 'cancelled') {
            return <XCircle size={14} />
        }

        if (
            currentStatus === 'preparing' ||
            currentStatus === 'ready'
        ) {
            return <Package size={14} />
        }

        if (currentStatus === 'confirmed') {
            return <Truck size={14} />
        }

        return <Clock3 size={14} />
    }

    const getStatusClass = (status) => {
        const currentStatus = status?.toLowerCase()

        if (currentStatus === 'completed') {
            return styles.completed
        }

        if (currentStatus === 'cancelled') {
            return styles.cancelled
        }

        if (currentStatus === 'preparing') {
            return styles.preparing
        }

        if (currentStatus === 'ready') {
            return styles.ready
        }

        if (currentStatus === 'confirmed') {
            return styles.confirmed
        }

        return styles.pending
    }

    const formatStatus = (status) => {
        if (!status) {
            return 'Pending'
        }

        return status.charAt(0).toUpperCase() + status.slice(1)
    }

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('en-IN', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        })
    }

    const formatTime = (date) => {
        return new Date(date).toLocaleTimeString('en-IN', {
            hour: '2-digit',
            minute: '2-digit'
        })
    }

    const getTotalItems = (items) => {
        return items.reduce(
            (total, item) => total + Number(item.quantity || 0),
            0
        )
    }

    if (loading) {
        return (
            <div className={styles.ordersContainer}>
                <div className={styles.loadingHeader}>
                    <div className={styles.skeletonSmall}></div>
                    <div className={styles.skeletonTitle}></div>
                    <div className={styles.skeletonText}></div>
                </div>

                <div className={styles.loadingCard}>
                    <div className={styles.skeletonLine}></div>
                    <div className={styles.skeletonLine}></div>
                    <div className={styles.skeletonLine}></div>
                </div>
            </div>
        )
    }

    return (
        <div className={styles.ordersContainer}>
            <section className={styles.pageHeader}>
                <div>
                    <span className={styles.eyebrow}>
                        YOUR CHAI LOOP
                    </span>

                    <h1>My Orders</h1>

                    <p>
                        A history of everything you've enjoyed
                        at Chai Loop.
                    </p>
                </div>

                <div className={styles.orderCount}>
                    <ShoppingBag size={17} />

                    <div>
                        <strong>{orders.length}</strong>
                        <span>
                            {orders.length === 1
                                ? 'Order'
                                : 'Orders'}
                        </span>
                    </div>
                </div>
            </section>

            {orders.length === 0 ? (
                <div className={styles.emptyState}>
                    <div className={styles.emptyIcon}>
                        <ReceiptText size={26} />
                    </div>

                    <h2>No orders yet</h2>

                    <p>
                        Your first Chai Loop order is waiting.
                        Explore our menu and find something you
                        love.
                    </p>

                    <button
                        type="button"
                        onClick={() => {
                            window.location.href = '/menu'
                        }}
                    >
                        Explore Menu
                        <ChevronRight size={16} />
                    </button>
                </div>
            ) : (
                <section className={styles.ordersList}>
                    {orders.map((order) => (
                        <article
                            className={styles.orderCard}
                            key={order.id}
                        >   
                            <div className={styles.orderTop}>
                                <div className={styles.orderInfo}>
                                    <div className={styles.orderIcon}>
                                        <Package size={18} />
                                    </div>

                                    <div>
                                        <div className={styles.orderTitleRow}>
                                            <span className={styles.orderLabel}>
                                                ORDER
                                            </span>

                                            <h2>
                                                #{order.id}
                                            </h2>
                                        </div>

                                        <p>
                                            {formatDate(order.createdAt)}
                                            <span>•</span>
                                            {formatTime(order.createdAt)}
                                            <span>•</span>
                                            {order.deliveryType || 'Delivery'}
                                        </p>
                                    </div>
                                </div>

                                <div
                                    className={`${styles.status} ${getStatusClass(order.status)}`}
                                >
                                    {getStatusIcon(order.status)}
                                    {formatStatus(order.status)}
                                </div>
                            </div>

                            <div className={styles.itemsSection}>
                                <div className={styles.itemsHeader}>
                                    <span>ORDER ITEMS</span>

                                    <span>
                                        {getTotalItems(order.items)} items
                                    </span>
                                </div>

                                <div className={styles.itemsList}>
                                    {order.items.map((item) => (
                                        <div
                                            className={styles.orderItem}
                                            key={item.productId}
                                        >
                                            <div className={styles.itemImage}>
                                                {item.image ? (
                                                    <img
                                                        src={item.image}
                                                        alt={item.name}
                                                        onError={(event) => {
                                                            event.currentTarget.style.display = 'none'
                                                            event.currentTarget.nextElementSibling.style.display = 'flex'
                                                        }}
                                                    />
                                                ) : null}

                                                <div className={styles.imageFallback}>
                                                    <ImageOff size={17} />
                                                </div>
                                            </div>

                                            <div className={styles.itemDetails}>
                                                <h3>
                                                    {item.name}
                                                </h3>

                                                <p>
                                                    ₹{item.price} × {item.quantity}
                                                </p>
                                            </div>

                                            <strong className={styles.itemPrice}>
                                                ₹
                                                {Number(item.price) *
                                                    Number(item.quantity)}
                                            </strong>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className={styles.orderBottom}>
                                <div className={styles.bottomInfo}>
                                    <span>
                                        {getTotalItems(order.items)} items
                                    </span>

                                    <span className={styles.dot}>•</span>

                                    <span>
                                        {order.deliveryType || 'Delivery'}
                                    </span>
                                </div>

                                <div className={styles.totalArea}>
                                    <span>Total</span>

                                    <strong>
                                        ₹{order.totalAmount}
                                    </strong>
                                </div>

                                <button
                                    type="button"
                                    className={styles.detailsButton}
                                >
                                    Details
                                    <ChevronRight size={15} />
                                </button>
                            </div>
                        </article>
                    ))}
                </section>
            )}
        </div>
    )
}

export default Orders