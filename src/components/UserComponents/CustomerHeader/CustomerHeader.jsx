import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, ShoppingCart, User, X, ChevronDown } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../../../context/CartContext";
import logo from "../../../assets/logo.png";
import styles from "./CustomerHeader.module.css";

function CustomerHeader() {
  const navigate = useNavigate();
  const location = useLocation();
  const { getCartCount } = useCart();

  const [mobileMenu, setMobileMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    setMobileMenu(false);
  }, [location.pathname]);

  const closeMobileMenu = () => {
    setMobileMenu(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    closeMobileMenu();
    navigate("/");
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const handleSectionClick = (section) => {
    closeMobileMenu();

    if (location.pathname === "/") {
      const element = document.getElementById(section);

      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
        });
      }
    } else {
      navigate(`/#${section}`);
    }
  };

  const mobileMenuVariants = {
    hidden: {
      opacity: 0,
      y: -15,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.35,
        ease: [0.22, 1, 0.36, 1],
      },
    },
    exit: {
      opacity: 0,
      y: -10,
      transition: {
        duration: 0.2,
      },
    },
  };

  const mobileItemVariants = {
    hidden: {
      opacity: 0,
      x: -15,
    },
    visible: (index) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: index * 0.06,
        duration: 0.3,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  return (
    <motion.header
      className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}
      initial={{
        opacity: 0,
        y: -25,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.65,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <div className={styles.headerContainer}>
        <Link to="/" className={styles.logo} onClick={closeMobileMenu}>
          <motion.div
            className={styles.logoImageWrap}
            whileHover={{
              y: -2,
              rotate: -2,
            }}
            transition={{
              duration: 0.25,
            }}
          >
            <img src={logo} alt="Chai Loop" />
          </motion.div>

          <div className={styles.logoText}>
            <span>Chai</span>
            <strong>Loop</strong>
          </div>
        </Link>

        <nav className={styles.desktopNavigation}>
          <Link to="/" className={isActive("/") ? styles.activeLink : ""}>
            Home
            {isActive("/") && (
              <motion.span
                className={styles.activeLine}
                layoutId="headerActiveLine"
              />
            )}
          </Link>

          <Link
            to="/menu"
            className={isActive("/menu") ? styles.activeLink : ""}
          >
            Menu
            {isActive("/menu") && (
              <motion.span
                className={styles.activeLine}
                layoutId="headerActiveLine"
              />
            )}
          </Link>

          <button
            onClick={() => handleSectionClick("about")}
            className={styles.navButton}
          >
            About
          </button>

          <button
            onClick={() => handleSectionClick("experience")}
            className={styles.navButton}
          >
            Experience
          </button>
        </nav>

        <div className={styles.desktopActions}>
          {loggedInUser ? (
            <>
              <motion.button
                className={styles.cartButton}
                onClick={() => navigate("/cart")}
                whileHover={{
                  y: -2,
                }}
                whileTap={{
                  scale: 0.96,
                }}
              >
                <ShoppingCart size={17} />

                <span>Cart</span>

                {getCartCount() > 0 && (
                  <motion.span
                    className={styles.cartCount}
                    key={getCartCount()}
                    initial={{
                      scale: 0.5,
                    }}
                    animate={{
                      scale: 1,
                    }}
                  >
                    {getCartCount()}
                  </motion.span>
                )}
              </motion.button>

              <motion.button
                className={styles.userButton}
                onClick={() => navigate("/user/orders")}
                whileHover={{
                  y: -2,
                }}
                whileTap={{
                  scale: 0.97,
                }}
              >
                <span className={styles.userIcon}>
                  <User size={15} />
                </span>

                <span className={styles.userName}>{loggedInUser.name}</span>

                <ChevronDown size={13} />
              </motion.button>

              <motion.button
                className={styles.logoutButton}
                onClick={handleLogout}
                whileHover={{
                  y: -2,
                }}
                whileTap={{
                  scale: 0.97,
                }}
              >
                Logout
              </motion.button>
            </>
          ) : (
            <>
              <motion.button
                className={styles.loginButton}
                onClick={() => navigate("/login")}
                whileHover={{
                  y: -2,
                }}
                whileTap={{
                  scale: 0.97,
                }}
              >
                Login
              </motion.button>

              <motion.button
                className={styles.registerButton}
                onClick={() => navigate("/register")}
                whileHover={{
                  y: -2,
                }}
                whileTap={{
                  scale: 0.97,
                }}
              >
                Register
              </motion.button>
            </>
          )}
        </div>

        <button
          className={styles.mobileMenuButton}
          onClick={() => setMobileMenu(!mobileMenu)}
          aria-label="Toggle menu"
          aria-expanded={mobileMenu}
        >
          <AnimatePresence mode="wait" initial={false}>
            {mobileMenu ? (
              <motion.span
                key="close"
                initial={{
                  opacity: 0,
                  rotate: -45,
                  scale: 0.7,
                }}
                animate={{
                  opacity: 1,
                  rotate: 0,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  rotate: 45,
                  scale: 0.7,
                }}
              >
                <X size={23} />
              </motion.span>
            ) : (
              <motion.span
                key="menu"
                initial={{
                  opacity: 0,
                  rotate: 45,
                  scale: 0.7,
                }}
                animate={{
                  opacity: 1,
                  rotate: 0,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  rotate: -45,
                  scale: 0.7,
                }}
              >
                <Menu size={23} />
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>

      <AnimatePresence>
        {mobileMenu && (
          <motion.div
            className={styles.mobileMenu}
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <nav className={styles.mobileNavigation}>
              <motion.div
                custom={0}
                variants={mobileItemVariants}
                initial="hidden"
                animate="visible"
              >
                <Link to="/" onClick={closeMobileMenu}>
                  <span>01</span>
                  Home
                </Link>
              </motion.div>

              <motion.div
                custom={1}
                variants={mobileItemVariants}
                initial="hidden"
                animate="visible"
              >
                <Link to="/menu" onClick={closeMobileMenu}>
                  <span>02</span>
                  Menu
                </Link>
              </motion.div>

              <motion.div
                custom={2}
                variants={mobileItemVariants}
                initial="hidden"
                animate="visible"
              >
                <button onClick={() => handleSectionClick("about")}>
                  <span>03</span>
                  About
                </button>
              </motion.div>

              <motion.div
                custom={3}
                variants={mobileItemVariants}
                initial="hidden"
                animate="visible"
              >
                <button onClick={() => handleSectionClick("experience")}>
                  <span>04</span>
                  Experience
                </button>
              </motion.div>
            </nav>

            <motion.div
              className={styles.mobileActions}
              initial={{
                opacity: 0,
                y: 10,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.2,
                duration: 0.3,
              }}
            >
              {loggedInUser ? (
                <>
                  <button
                    onClick={() => {
                      closeMobileMenu();
                      navigate("/cart");
                    }}
                  >
                    <ShoppingCart size={17} />
                    Cart
                    {getCartCount() > 0 && <span>{getCartCount()}</span>}
                  </button>

                  <button
                    onClick={() => {
                      closeMobileMenu();
                      navigate("/user/orders");
                    }}
                  >
                    <User size={17} />
                    My Orders
                  </button>

                  <button
                    onClick={handleLogout}
                    className={styles.mobileLogout}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => {
                      closeMobileMenu();
                      navigate("/login");
                    }}
                  >
                    Login
                  </button>

                  <button
                    onClick={() => {
                      closeMobileMenu();
                      navigate("/register");
                    }}
                  >
                    Register
                  </button>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

export default CustomerHeader;
