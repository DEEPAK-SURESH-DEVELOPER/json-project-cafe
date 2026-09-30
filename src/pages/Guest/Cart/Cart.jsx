import React from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../../context/CartContext";
import CustomerHeader from "../../../components/UserComponents/CustomerHeader/CustomerHeader";
import styles from "./Cart.module.css";

function Cart() {
  const navigate = useNavigate();

  const {
    cart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
    getCartTotal,
  } = useCart();

  const cartTotal = getCartTotal();

  if (cart.length === 0) {
    return (
      <div className={styles.cartPage}>
        <CustomerHeader />

        <main className={styles.emptyCart}>
          <div className={styles.emptyCartInner}>
            <motion.div
              className={styles.emptyIcon}
              initial={{
                opacity: 0,
                scale: 0.7,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              transition={{
                duration: 0.5,
              }}
            >
              <ShoppingBag size={34} />
            </motion.div>

            <motion.span
              className={styles.pageLabel}
              initial={{
                opacity: 0,
                y: 15,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
            >
              YOUR CART / 01
            </motion.span>

            <motion.h1
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.1,
              }}
            >
              Nothing here
              <br />
              <em>yet.</em>
            </motion.h1>

            <motion.p
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                delay: 0.2,
              }}
            >
              Your cart is waiting for something delicious.
            </motion.p>

            <motion.button
              className={styles.shopButton}
              onClick={() => navigate("/menu")}
              initial={{
                opacity: 0,
                y: 15,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.3,
              }}
              whileHover={{
                y: -3,
              }}
              whileTap={{
                scale: 0.97,
              }}
            >
              Explore Menu
              <ArrowRight size={17} />
            </motion.button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className={styles.cartPage}>
      <CustomerHeader />

      <main>
        <section className={styles.cartHero}>
          <div className={styles.heroCircle}></div>

          <div className={styles.heroContainer}>
            <div className={styles.heroLabel}>
              <span>01</span>
              <span>CHAI LOOP / CART</span>
            </div>

            <div className={styles.heroContent}>
              <p>YOUR SELECTION</p>

              <h1>
                A little something
                <br />
                <em>for your table.</em>
              </h1>

              <span className={styles.itemCount}>
                {cart.length} {cart.length === 1 ? "ITEM" : "ITEMS"} IN YOUR
                CART
              </span>
            </div>
          </div>
        </section>

        <section className={styles.cartSection}>
          <div className={styles.cartLayout}>
            <div className={styles.itemsSection}>
              <div className={styles.itemsHeader}>
                <div>
                  <span>YOUR ORDER</span>

                  <h2>Selected items</h2>
                </div>

                <button className={styles.clearButton} onClick={clearCart}>
                  Clear cart
                </button>
              </div>

              <div className={styles.cartItems}>
                <AnimatePresence mode="popLayout">
                  {cart.map((item, index) => (
                    <motion.article
                      className={styles.cartItem}
                      key={item.id}
                      layout
                      initial={{
                        opacity: 0,
                        y: 25,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      exit={{
                        opacity: 0,
                        x: -30,
                        height: 0,
                        marginBottom: 0,
                      }}
                      transition={{
                        duration: 0.4,
                        delay: index * 0.05,
                      }}
                    >
                      <div className={styles.itemImage}>
                        <img src={item.image} alt={item.name} />

                        <span>{String(index + 1).padStart(2, "0")}</span>
                      </div>

                      <div className={styles.itemContent}>
                        <div className={styles.itemTop}>
                          <div>
                            <span className={styles.itemCategory}>
                              CHAI LOOP
                            </span>

                            <h3>{item.name}</h3>
                          </div>

                          <strong>₹{item.price}</strong>
                        </div>

                        <div className={styles.itemBottom}>
                          <div className={styles.quantityBox}>
                            <button
                              onClick={() => decreaseQuantity(item.id)}
                              aria-label="Decrease quantity"
                            >
                              <Minus size={14} />
                            </button>

                            <span>{item.quantity}</span>

                            <button
                              onClick={() => increaseQuantity(item.id)}
                              aria-label="Increase quantity"
                            >
                              <Plus size={14} />
                            </button>
                          </div>

                          <div className={styles.itemActions}>
                            <span>
                              Subtotal:
                              <strong>₹{item.price * item.quantity}</strong>
                            </span>

                            <button
                              className={styles.removeButton}
                              onClick={() => removeFromCart(item.id)}
                            >
                              <Trash2 size={14} />
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.article>
                  ))}
                </AnimatePresence>
              </div>

              <button
                className={styles.continueButton}
                onClick={() => navigate("/menu")}
              >
                <ArrowLeft size={16} />
                Continue shopping
              </button>
            </div>

            <motion.aside
              className={styles.summarySection}
              initial={{
                opacity: 0,
                x: 30,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                duration: 0.5,
                delay: 0.15,
              }}
            >
              <div className={styles.summaryTop}>
                <span>02 / SUMMARY</span>

                <ShoppingBag size={18} />
              </div>

              <h2>Your order</h2>

              <div className={styles.summaryItems}>
                {cart.map((item) => (
                  <div className={styles.summaryItem} key={item.id}>
                    <span>
                      {item.name}
                      <small>× {item.quantity}</small>
                    </span>

                    <strong>₹{item.price * item.quantity}</strong>
                  </div>
                ))}
              </div>

              <div className={styles.summaryLine}></div>

              <div className={styles.summaryTotal}>
                <span>Total</span>

                <strong>₹{cartTotal}</strong>
              </div>

              <p className={styles.checkoutNote}>
                Freshly prepared and packed with care.
              </p>

              <motion.button
                className={styles.checkoutButton}
                onClick={() => navigate("/user/checkout")}
                whileHover={{
                  y: -3,
                }}
                whileTap={{
                  scale: 0.97,
                }}
              >
                <span>Proceed to Checkout</span>

                <ArrowRight size={18} />
              </motion.button>
            </motion.aside>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Cart;
