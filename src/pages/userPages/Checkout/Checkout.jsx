import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
    ArrowLeft,
    MapPin,
    Phone,
    UserRound,
    ShoppingBag,
    Truck,
    Store,
    CheckCircle2,
    LoaderCircle
} from 'lucide-react'
import { useCart } from '../../../context/CartContext'
import { addOrderAPI } from '../../../services/allAPI'
import styles from './Checkout.module.css'

function Checkout() {
    const navigate = useNavigate()

    const {
        cart,
        getCartTotal,
        clearCart
    } = useCart()

    const loggedInUser = JSON.parse(
        localStorage.getItem('loggedInUser')
    )

    const [orderData, setOrderData] = useState({
        customerName: loggedInUser?.name || '',
        phone: loggedInUser?.phone || '',
        deliveryType: 'pickup',
        address: ''
    })

    const [message, setMessage] = useState('')
    const [isPlacingOrder, setIsPlacingOrder] = useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target

        setOrderData((previousData) => ({
            ...previousData,
            [name]: value
        }))

        setMessage('')
    }

    const handleDeliveryType = (type) => {
        setOrderData((previousData) => ({
            ...previousData,
            deliveryType: type
        }))

        setMessage('')
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (cart.length === 0) {
            setMessage('Your cart is empty')
            return
        }

        if (!orderData.customerName.trim()) {
            setMessage('Please enter your name')
            return
        }

        if (!orderData.phone.trim()) {
            setMessage('Please enter your phone number')
            return
        }

        if (
            orderData.deliveryType === 'delivery' &&
            !orderData.address.trim()
        ) {
            setMessage('Please enter your delivery address')
            return
        }

        try {
            setIsPlacingOrder(true)
            setMessage('')

            const order = {
                userId: loggedInUser.id,
                items: cart.map((item) => ({
                    productId: item.id,
                    name: item.name,
                    price: item.price,
                    quantity: item.quantity,
                    image: item.image
                })),
                totalAmount: getCartTotal(),
                deliveryType: orderData.deliveryType,
                customerName: orderData.customerName,
                phone: orderData.phone,
                address: orderData.address,
                status: 'pending',
                createdAt: new Date().toISOString()
            }

            await addOrderAPI(order)

            clearCart()

            setMessage('Order placed successfully')

            setTimeout(() => {
                navigate('/user/orders')
            }, 1000)
        } catch (error) {
            console.log(error)
            setMessage('Failed to place order')
        } finally {
            setIsPlacingOrder(false)
        }
    }

    if (cart.length === 0) {
        return (
            <div className={styles.emptyCheckout}>
                <div className={styles.emptyIcon}>
                    <ShoppingBag size={28} />
                </div>

                <span className={styles.eyebrow}>
                    CHAI LOOP
                </span>

                <h1>Your cart is empty</h1>

                <p>
                    Add something delicious to your cart
                    before heading to checkout.
                </p>

                <button
                    type="button"
                    onClick={() => navigate('/cart')}
                >
                    Go to Cart
                </button>
            </div>
        )
    }

    return (
        <div className={styles.checkoutContainer}>
            <button
                type="button"
                className={styles.backButton}
                onClick={() => navigate('/cart')}
            >
                <ArrowLeft size={16} />
                Back to cart
            </button>

            <div className={styles.pageHeader}>
                <div>
                    <span className={styles.eyebrow}>
                        CHAI LOOP CHECKOUT
                    </span>

                    <h1>Complete your order</h1>

                    <p>
                        Just a few details and your order
                        will be on its way.
                    </p>
                </div>

                <div className={styles.itemCount}>
                    <ShoppingBag size={16} />
                    <span>
                        {cart.reduce(
                            (total, item) =>
                                total + Number(item.quantity || 0),
                            0
                        )}{' '}
                        items
                    </span>
                </div>
            </div>

            <form
                className={styles.checkoutForm}
                onSubmit={handleSubmit}
            >
                <div className={styles.detailsCard}>
                    <div className={styles.cardHeader}>
                        <div className={styles.headerIcon}>
                            <UserRound size={17} />
                        </div>

                        <div>
                            <h2>Customer details</h2>
                            <p>
                                Where should we send your order?
                            </p>
                        </div>
                    </div>

                    <div className={styles.formGrid}>
                        <div className={styles.formGroup}>
                            <label htmlFor="customerName">
                                Your name
                            </label>

                            <div className={styles.inputWrapper}>
                                <UserRound size={15} />

                                <input
                                    id="customerName"
                                    type="text"
                                    name="customerName"
                                    value={orderData.customerName}
                                    onChange={handleChange}
                                    placeholder="Enter your name"
                                />
                            </div>
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="phone">
                                Phone number
                            </label>

                            <div className={styles.inputWrapper}>
                                <Phone size={15} />

                                <input
                                    id="phone"
                                    type="tel"
                                    name="phone"
                                    value={orderData.phone}
                                    onChange={handleChange}
                                    placeholder="Enter your phone"
                                />
                            </div>
                        </div>
                    </div>

                    <div className={styles.deliverySection}>
                        <div className={styles.sectionLabel}>
                            <span>How would you like to receive it?</span>
                        </div>

                        <div className={styles.deliveryOptions}>
                            <button
                                type="button"
                                className={
                                    orderData.deliveryType === 'pickup'
                                        ? styles.deliveryOptionActive
                                        : styles.deliveryOption
                                }
                                onClick={() =>
                                    handleDeliveryType('pickup')
                                }
                            >
                                <Store size={19} />

                                <div>
                                    <strong>Pickup</strong>
                                    <span>
                                        Collect from Chai Loop
                                    </span>
                                </div>

                                {orderData.deliveryType === 'pickup' && (
                                    <CheckCircle2
                                        className={styles.selectedIcon}
                                        size={17}
                                    />
                                )}
                            </button>

                            <button
                                type="button"
                                className={
                                    orderData.deliveryType === 'delivery'
                                        ? styles.deliveryOptionActive
                                        : styles.deliveryOption
                                }
                                onClick={() =>
                                    handleDeliveryType('delivery')
                                }
                            >
                                <Truck size={19} />

                                <div>
                                    <strong>Delivery</strong>
                                    <span>
                                        Deliver to your address
                                    </span>
                                </div>

                                {orderData.deliveryType === 'delivery' && (
                                    <CheckCircle2
                                        className={styles.selectedIcon}
                                        size={17}
                                    />
                                )}
                            </button>
                        </div>
                    </div>

                    {orderData.deliveryType === 'delivery' && (
                        <div className={styles.formGroup}>
                            <label htmlFor="address">
                                Delivery address
                            </label>

                            <div className={styles.textareaWrapper}>
                                <MapPin size={16} />

                                <textarea
                                    id="address"
                                    name="address"
                                    value={orderData.address}
                                    onChange={handleChange}
                                    placeholder="Enter your complete delivery address"
                                    rows="4"
                                />
                            </div>
                        </div>
                    )}

                    {orderData.deliveryType === 'pickup' && (
                        <div className={styles.pickupNotice}>
                            <Store size={17} />

                            <div>
                                <strong>Pickup from Chai Loop</strong>

                                <span>
                                    Your order will be prepared
                                    for collection.
                                </span>
                            </div>
                        </div>
                    )}
                </div>

                <aside className={styles.summaryCard}>
                    <div className={styles.summaryHeader}>
                        <div>
                            <span className={styles.summaryEyebrow}>
                                YOUR ORDER
                            </span>

                            <h2>Order summary</h2>
                        </div>

                        <ShoppingBag size={18} />
                    </div>

                    <div className={styles.summaryItems}>
                        {cart.map((item) => (
                            <div
                                className={styles.summaryItem}
                                key={item.id}
                            >
                                <div className={styles.summaryImage}>
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                    />
                                </div>

                                <div className={styles.summaryDetails}>
                                    <h3>{item.name}</h3>

                                    <span>
                                        ₹{item.price} × {item.quantity}
                                    </span>
                                </div>

                                <strong>
                                    ₹
                                    {Number(item.price) *
                                        Number(item.quantity)}
                                </strong>
                            </div>
                        ))}
                    </div>

                    <div className={styles.priceBreakdown}>
                        <div>
                            <span>Subtotal</span>
                            <strong>
                                ₹{getCartTotal()}
                            </strong>
                        </div>

                        <div>
                            <span>Delivery</span>
                            <strong>
                                {orderData.deliveryType === 'pickup'
                                    ? 'Free'
                                    : 'Included'}
                            </strong>
                        </div>
                    </div>

                    <div className={styles.totalRow}>
                        <span>Total</span>
                        <strong>
                            ₹{getCartTotal()}
                        </strong>
                    </div>

                    <button
                        type="submit"
                        className={styles.placeOrderButton}
                        disabled={isPlacingOrder}
                    >
                        {isPlacingOrder ? (
                            <>
                                <LoaderCircle
                                    size={17}
                                    className={styles.spinner}
                                />
                                Placing order...
                            </>
                        ) : (
                            <>
                                Place order
                                <CheckCircle2 size={17} />
                            </>
                        )}
                    </button>

                    {message && (
                        <div
                            className={
                                message === 'Order placed successfully'
                                    ? styles.successMessage
                                    : styles.errorMessage
                            }
                        >
                            {message === 'Order placed successfully' && (
                                <CheckCircle2 size={15} />
                            )}

                            <span>{message}</span>
                        </div>
                    )}
                </aside>
            </form>
        </div>
    )
}

export default Checkout