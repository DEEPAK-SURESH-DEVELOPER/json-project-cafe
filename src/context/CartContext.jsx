import React, { createContext, useContext, useState } from 'react'

const CartContext = createContext()

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem('chaiLoopCart')

        return savedCart ? JSON.parse(savedCart) : []
    })

    const addToCart = (product) => {
        setCart((currentCart) => {
            const existingProduct = currentCart.find(
                (item) => item.id === product.id
            )

            const updatedCart = existingProduct
                ? currentCart.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                )
                : [
                    ...currentCart,
                    {
                        ...product,
                        quantity: 1
                    }
                ]

            localStorage.setItem('chaiLoopCart', JSON.stringify(updatedCart))

            return updatedCart
        })
    }

    const increaseQuantity = (id) => {
        setCart((currentCart) => {
            const updatedCart = currentCart.map((item) =>
                item.id === id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            )

            localStorage.setItem('chaiLoopCart', JSON.stringify(updatedCart))

            return updatedCart
        })
    }

    const decreaseQuantity = (id) => {
        setCart((currentCart) => {
            const updatedCart = currentCart
                .map((item) =>
                    item.id === id
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                )
                .filter((item) => item.quantity > 0)

            localStorage.setItem('chaiLoopCart', JSON.stringify(updatedCart))

            return updatedCart
        })
    }

    const removeFromCart = (id) => {
        setCart((currentCart) => {
            const updatedCart = currentCart.filter(
                (item) => item.id !== id
            )

            localStorage.setItem('chaiLoopCart', JSON.stringify(updatedCart))

            return updatedCart
        })
    }

    const clearCart = () => {
        setCart([])

        localStorage.removeItem('chaiLoopCart')
    }

    const getCartTotal = () => {
        return cart.reduce(
            (total, item) => total + item.price * item.quantity,
            0
        )
    }

    const getCartCount = () => {
        return cart.reduce(
            (total, item) => total + item.quantity,
            0
        )
    }

    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                increaseQuantity,
                decreaseQuantity,
                removeFromCart,
                clearCart,
                getCartTotal,
                getCartCount
            }}
        >
            {children}
        </CartContext.Provider>
    )
}

export const useCart = () => {
    return useContext(CartContext)
}