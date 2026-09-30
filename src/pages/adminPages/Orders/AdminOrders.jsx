import React, { useEffect, useState } from 'react'
import {
    ShoppingBag,
    UserRound,
    Phone,
    MapPin,
    CalendarDays,
    Truck,
    PackageCheck,
    Clock3,
    CheckCircle2,
    XCircle
} from 'lucide-react'
import { getAllOrdersAPI, updateOrderAPI } from '../../../services/allAPI'
import styles from './AdminOrders.module.css'

function AdminOrders() {
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)
    const [updatingOrder, setUpdatingOrder] = useState(null)

    const getOrders = async () => {
        try {
            setLoading(true)

            const response = await getAllOrdersAPI()

            setOrders(response.data)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getOrders()
    }, [])

    const handleStatusChange = async (id, status) => {
        try {
            setUpdatingOrder(id)

            await updateOrderAPI(id, { status })

            setOrders((previousOrders) =>
                previousOrders.map((order) =>
                    order.id === id
                        ? { ...order, status }
                        : order
                )
            )
        } catch (error) {
            console.log(error)
        } finally {
            setUpdatingOrder(null)
        }
    }

    const getStatusClass = (status) => {
        switch (status?.toLowerCase()) {
            case 'confirmed':
                return styles.confirmed

            case 'preparing':
                return styles.preparing

            case 'ready':
                return styles.ready

            case 'completed':
                return styles.completed

            case 'cancelled':
                return styles.cancelled

            default:
                return styles.pending
        }
    }

    const getStatusIcon = (status) => {
        switch (status?.toLowerCase()) {
            case 'confirmed':
                return <CheckCircle2 size={14} />

            case 'preparing':
                return <Clock3 size={14} />

            case 'ready':
                return <PackageCheck size={14} />

            case 'completed':
                return <CheckCircle2 size={14} />

            case 'cancelled':
                return <XCircle size={14} />

            default:
                return <Clock3 size={14} />
        }
    }

    if (loading) {
        return (
            <div className={styles.ordersContainer}>
                <div className={styles.pageHeader}>
                    <div>
                        <span className={styles.eyebrow}>
                            Management
                        </span>

                        <h1>Orders</h1>

                        <p>
                            Manage and track customer orders.
                        </p>
                    </div>
                </div>

                <div className={styles.loadingGrid}>
                    {[1, 2, 3].map((item) => (
                        <div
                            className={styles.skeletonCard}
                            key={item}
                        >
                            <div className={styles.skeletonTop}></div>
                            <div className={styles.skeletonLine}></div>
                            <div className={styles.skeletonLineSmall}></div>
                            <div className={styles.skeletonProduct}></div>
                            <div className={styles.skeletonProduct}></div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    return (
        <div className={styles.ordersContainer}>
            <div className={styles.pageHeader}>
                <div>
                    <span className={styles.eyebrow}>
                        Management
                    </span>

                    <h1>Orders</h1>

                    <p>
                        Manage and track customer orders from one place.
                    </p>
                </div>

                <div className={styles.orderSummary}>
                    <ShoppingBag size={17} />

                    <div>
                        <strong>{orders.length}</strong>
                        <span>Total Orders</span>
                    </div>
                </div>
            </div>

            {orders.length === 0 ? (
                <div className={styles.emptyState}>
                    <div className={styles.emptyIcon}>
                        <ShoppingBag size={27} />
                    </div>

                    <h2>No orders found</h2>

                    <p>
                        Customer orders will appear here when they place
                        an order.
                    </p>
                </div>
            ) : (
                <div className={styles.ordersGrid}>
                    {orders.map((order, index) => (
                        <article
                            className={styles.orderCard}
                            key={order.id}
                            style={{
                                '--order-index': index
                            }}
                        >
                            <div className={styles.orderHeader}>
                                <div className={styles.orderIdentity}>
                                    <div className={styles.orderIcon}>
                                        <ShoppingBag size={18} />
                                    </div>

                                    <div>
                                        <span>Order</span>
                                        <h2>#{order.id}</h2>
                                    </div>
                                </div>

                                <div
                                    className={`${styles.statusBadge} ${getStatusClass(order.status)}`}
                                >
                                    {getStatusIcon(order.status)}

                                    <span>
                                        {order.status || 'pending'}
                                    </span>
                                </div>
                            </div>

                            <div className={styles.orderMeta}>
                                <div className={styles.metaItem}>
                                    <UserRound size={15} />

                                    <div>
                                        <span>Customer</span>
                                        <strong>
                                            {order.customerName}
                                        </strong>
                                    </div>
                                </div>

                                <div className={styles.metaItem}>
                                    <Phone size={15} />

                                    <div>
                                        <span>Phone</span>
                                        <strong>
                                            {order.phone}
                                        </strong>
                                    </div>
                                </div>

                                <div className={styles.metaItem}>
                                    <CalendarDays size={15} />

                                    <div>
                                        <span>Placed On</span>
                                        <strong>
                                            {new Date(
                                                order.createdAt
                                            ).toLocaleString()}
                                        </strong>
                                    </div>
                                </div>

                                <div className={styles.metaItem}>
                                    <Truck size={15} />

                                    <div>
                                        <span>Delivery</span>
                                        <strong>
                                            {order.deliveryType}
                                        </strong>
                                    </div>
                                </div>
                            </div>

                            {order.deliveryType === 'delivery' && (
                                <div className={styles.addressBox}>
                                    <MapPin size={16} />

                                    <div>
                                        <span>Delivery Address</span>

                                        <p>
                                            {order.address}
                                        </p>
                                    </div>
                                </div>
                            )}

                            <div className={styles.itemsSection}>
                                <div className={styles.sectionTitle}>
                                    <div>
                                        <span>Order Details</span>
                                        <h3>
                                            {order.items.length}{' '}
                                            {order.items.length === 1
                                                ? 'Item'
                                                : 'Items'}
                                        </h3>
                                    </div>
                                </div>

                                <div className={styles.itemsList}>
                                    {order.items.map((item) => (
                                        <div
                                            className={styles.orderItem}
                                            key={item.productId}
                                        >
                                            <div className={styles.productImage}>
                                                <img
                                                    src={item.image}
                                                    alt={item.name}
                                                />
                                            </div>

                                            <div className={styles.productInfo}>
                                                <h4>
                                                    {item.name}
                                                </h4>

                                                <p>
                                                    ₹{item.price} ×{' '}
                                                    {item.quantity}
                                                </p>
                                            </div>

                                            <strong className={styles.itemSubtotal}>
                                                ₹
                                                {item.price *
                                                    item.quantity}
                                            </strong>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className={styles.orderFooter}>
                                <div className={styles.total}>
                                    <span>Order Total</span>

                                    <strong>
                                        ₹{order.totalAmount}
                                    </strong>
                                </div>

                                <div className={styles.statusControl}>
                                    <label htmlFor={`status-${order.id}`}>
                                        Update Status
                                    </label>

                                    <div className={styles.selectWrapper}>
                                        {updatingOrder === order.id && (
                                            <span className={styles.spinner}></span>
                                        )}

                                        <select
                                            id={`status-${order.id}`}
                                            value={order.status}
                                            disabled={
                                                updatingOrder === order.id
                                            }
                                            onChange={(e) =>
                                                handleStatusChange(
                                                    order.id,
                                                    e.target.value
                                                )
                                            }
                                        >
                                            <option value="pending">
                                                Pending
                                            </option>

                                            <option value="confirmed">
                                                Confirmed
                                            </option>

                                            <option value="preparing">
                                                Preparing
                                            </option>

                                            <option value="ready">
                                                Ready
                                            </option>

                                            <option value="completed">
                                                Completed
                                            </option>

                                            <option value="cancelled">
                                                Cancelled
                                            </option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            )}
        </div>
    )
}

export default AdminOrders