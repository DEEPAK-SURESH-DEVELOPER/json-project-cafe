import React, { useEffect, useState } from 'react'
import { ArrowRight, Plus } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { getAllProductsAPI } from '../../../../services/allAPI'
import { useCart } from '../../../../context/CartContext'
import CircularGallery from '../../../../components/CircularGallery/CircularGallery'
import styles from './SignatureMenu.module.css'

function SignatureMenu() {
    const navigate = useNavigate()
    const { addToCart } = useCart()

    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)

    const loggedInUser = JSON.parse(
        localStorage.getItem('loggedInUser')
    )

    const getFeaturedProducts = async () => {
        try {
            const response = await getAllProductsAPI()

            const featuredProducts = response.data
                .filter((product) => product.featured === true)
                .filter((product) => product.available === true)
                .slice(0, 8)

            setProducts(featuredProducts)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getFeaturedProducts()
    }, [])

    const handleAddToCart = (product) => {
        if (!loggedInUser) {
            navigate('/login')
            return
        }

        addToCart(product)
    }

    const galleryItems = products.map((product) => ({
        image: product.image,
        text: product.name
    }))

    return (
        <section
            className={styles.signatureMenu}
            id="signature-menu"
        >

            <div className={styles.sectionHeader}>

                <div className={styles.sectionNumber}>
                    <span>04</span>
                    <span>SIGNATURE MENU</span>
                </div>

                <div className={styles.headerContent}>

                    <span className={styles.eyebrow}>
                        OUR FAVOURITES
                    </span>

                    <h2>
                        Made for your
                        <br />
                        <em>everyday ritual.</em>
                    </h2>

                    <p>
                        Take a little scroll through some of the
                        favourites that keep our guests coming back.
                    </p>

                </div>

            </div>

            <div className={styles.galleryArea}>

                {loading ? (
                    <div className={styles.message}>
                        <span>Preparing something good...</span>
                    </div>
                ) : products.length === 0 ? (
                    <div className={styles.message}>
                        <span>
                            Our signature menu is being prepared.
                        </span>
                    </div>
                ) : (
                    <>

                        <div className={styles.galleryFrame}>

                            <CircularGallery
                                items={galleryItems}
                                bend={1}
                                textColor="#fff8ef"
                                borderRadius={0.05}
                                scrollEase={0.05}
                                scrollSpeed={1.5}
                            />

                        </div>

                        <div className={styles.galleryHint}>
                            <span></span>
                            <p>
                                Scroll or drag to explore
                            </p>
                            <span></span>
                        </div>

                    </>
                )}

            </div>

            {!loading && products.length > 0 && (
                <div className={styles.quickProducts}>

                    {products.slice(0, 3).map((product, index) => (

                        <div
                            className={styles.quickProduct}
                            key={product.id}
                        >

                            <div className={styles.quickProductInfo}>

                                <span className={styles.productNumber}>
                                    {String(index + 1).padStart(2, '0')}
                                </span>

                                <div>
                                    <h3>{product.name}</h3>

                                    <p>
                                        {product.description}
                                    </p>
                                </div>

                            </div>

                            <div className={styles.quickProductAction}>

                                <span className={styles.price}>
                                    ₹{product.price}
                                </span>

                                <button
                                    className={styles.addButton}
                                    onClick={() =>
                                        handleAddToCart(product)
                                    }
                                >
                                    <span>Add</span>
                                    <Plus size={15} />
                                </button>

                            </div>

                        </div>

                    ))}

                </div>
            )}

            <div className={styles.menuFooter}>

                <div className={styles.footerLine}></div>

                <div className={styles.footerContent}>

                    <div>

                        <span className={styles.footerEyebrow}>
                            THE FULL MENU
                        </span>

                        <p>
                            More chai. More coffee.
                            <br />
                            More reasons to stay.
                        </p>

                    </div>

                    <button
                        onClick={() => navigate('/menu')}
                        className={styles.menuButton}
                    >
                        <span>
                            View Full Menu
                        </span>

                        <ArrowRight size={18} />

                    </button>

                </div>

            </div>

        </section>
    )
}

export default SignatureMenu