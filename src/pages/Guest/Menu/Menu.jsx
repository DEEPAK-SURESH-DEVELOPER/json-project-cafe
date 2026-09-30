import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, ShoppingCart, Utensils } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  getAllCategoriesAPI,
  getAllProductsAPI,
} from "../../../services/allAPI";
import { useCart } from "../../../context/CartContext";
import CustomerHeader from "../../../components/UserComponents/CustomerHeader/CustomerHeader";
import ScrollReveal from "../../../components/ScrollReveal/ScrollReveal";
import TiltedCard from "../../../components/TiltedCard/TiltedCard";
import styles from "./Menu.module.css";
import ClickSpark from "../../../components/ClickSpark/ClickSpark";

function Menu() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loading, setLoading] = useState(true);

  const { addToCart, getCartCount } = useCart();

  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

  const getProducts = async () => {
    try {
      const response = await getAllProductsAPI();
      setProducts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getCategories = async () => {
    try {
      const response = await getAllCategoriesAPI();
      setCategories(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const loadMenu = async () => {
    setLoading(true);

    try {
      await Promise.all([getProducts(), getCategories()]);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMenu();
  }, []);

  const handleAddToCart = (product) => {
    if (!loggedInUser) {
      navigate("/login");
      return;
    }

    addToCart(product);
  };

  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter(
          (product) => product.categoryId === Number(selectedCategory),
        );

  return (
    <div className={styles.menuPage}>
      <CustomerHeader />
      <ClickSpark
        sparkColor="#8b5e34"
        sparkSize={9}
        sparkRadius={18}
        sparkCount={8}
        duration={450}
      ></ClickSpark>

      <main>
        <section className={styles.menuHero}>
          <div className={styles.heroGlow}></div>

          <div className={styles.heroContainer}>
            <div className={styles.heroTop}>
              <div className={styles.heroLabel}>
                <span>01</span>
                <span>CHAI LOOP / MENU</span>
              </div>

              <div className={styles.heroCart}>
                <ShoppingCart size={16} />
                <span>{getCartCount()} items</span>
              </div>
            </div>

            <div className={styles.heroContent}>
              <p className={styles.eyebrow}>FRESHLY BREWED • MADE WITH CARE</p>

              <ScrollReveal
                baseOpacity={0.15}
                enableBlur
                baseRotation={2}
                blurStrength={4}
                containerClassName={styles.headingReveal}
                textClassName={styles.headingText}
                rotationEnd="bottom center"
                wordAnimationEnd="bottom center"
              >
                Your everyday favourites, made fresh.
              </ScrollReveal>

              <p className={styles.heroDescription}>
                Explore chai, coffee, snacks and everything worth staying a
                little longer for.
              </p>
            </div>
          </div>
        </section>

        <section className={styles.categoryWrapper}>
          <div className={styles.categoryHeader}>
            <div>
              <span className={styles.categoryLabel}>EXPLORE</span>

              <h2>Find your favourite.</h2>
            </div>

            <span className={styles.productCount}>
              {filteredProducts.length} ITEMS
            </span>
          </div>

          <div className={styles.categorySection}>
            <motion.button
              className={
                selectedCategory === "all"
                  ? styles.activeCategory
                  : styles.categoryButton
              }
              onClick={() => setSelectedCategory("all")}
              whileTap={{
                scale: 0.94,
              }}
            >
              All
              {selectedCategory === "all" && (
                <motion.span
                  layoutId="categoryIndicator"
                  className={styles.categoryIndicator}
                />
              )}
            </motion.button>

            {categories.map((category) => (
              <motion.button
                key={category.id}
                className={
                  selectedCategory === category.id
                    ? styles.activeCategory
                    : styles.categoryButton
                }
                onClick={() => setSelectedCategory(category.id)}
                whileTap={{
                  scale: 0.94,
                }}
              >
                {category.name}

                {selectedCategory === category.id && (
                  <motion.span
                    layoutId="categoryIndicator"
                    className={styles.categoryIndicator}
                  />
                )}
              </motion.button>
            ))}
          </div>
        </section>

        <section className={styles.productsWrapper}>
          {loading ? (
            <div className={styles.loadingState}>
              <Utensils size={25} />
              <p>Preparing your favourites...</p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className={styles.emptyState}>
              <Utensils size={30} />

              <h3>Nothing here yet.</h3>

              <p>We're preparing something delicious for this category.</p>
            </div>
          ) : (
            <motion.div className={styles.productsGrid} layout>
              <AnimatePresence mode="popLayout">
                {filteredProducts.map((product, index) => (
                  <motion.article
                    className={styles.productCard}
                    key={product.id}
                    layout
                    initial={{
                      opacity: 0,
                      y: 35,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    exit={{
                      opacity: 0,
                      y: 25,
                      scale: 0.97,
                    }}
                    transition={{
                      duration: 0.45,
                      delay: index * 0.06,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    whileHover={{
                      y: -6,
                    }}
                  >
                    <div className={styles.productImage}>
                      <TiltedCard
                        imageSrc={product.image}
                        altText={product.name}
                        captionText={product.name}
                        containerHeight="100%"
                        containerWidth="100%"
                        rotateAmplitude={7}
                        scaleOnHover={1.04}
                        showMobileWarning={false}
                        showTooltip={false}
                      />

                      {product.featured && (
                        <span className={styles.featuredBadge}>SIGNATURE</span>
                      )}
                    </div>

                    <div className={styles.productDetails}>
                      <div className={styles.productTop}>
                        <div>
                          <span className={styles.productNumber}>
                            {String(index + 1).padStart(2, "0")}
                          </span>

                          <h2>{product.name}</h2>
                        </div>

                        <span className={styles.productPrice}>
                          ₹{product.price}
                        </span>
                      </div>

                      <p className={styles.productDescription}>
                        {product.description}
                      </p>

                      <motion.button
                        className={styles.addButton}
                        onClick={() => handleAddToCart(product)}
                        disabled={!product.available}
                        whileHover={
                          product.available
                            ? {
                                backgroundColor: "#8b5e34",
                                color: "#fffaf2",
                              }
                            : {}
                        }
                        whileTap={
                          product.available
                            ? {
                                scale: 0.97,
                              }
                            : {}
                        }
                      >
                        <span>
                          {product.available ? "Add to Cart" : "Unavailable"}
                        </span>

                        {product.available && <ArrowRight size={16} />}
                      </motion.button>
                    </div>
                  </motion.article>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </section>
      </main>
    </div>
  );
}

export default Menu;
