import React, { useEffect, useState } from 'react'
import {
    Plus,
    Upload,
    ImagePlus,
    Package,
    Pencil,
    Trash2,
    X,
    Check,
    Star,
    Eye,
    EyeOff
} from 'lucide-react'
import {
    addProductAPI,
    deleteProductAPI,
    getAllCategoriesAPI,
    getAllProductsAPI,
    updateProductAPI
} from '../../../services/allAPI'
import cloudinaryAPI from '../../../services/cloudinaryAPI'
import styles from './Products.module.css'

function Products() {
    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState([])
    const [isEditing, setIsEditing] = useState(false)
    const [editId, setEditId] = useState(null)
    const [selectedImage, setSelectedImage] = useState(null)
    const [imagePreview, setImagePreview] = useState('')
    const [isUploading, setIsUploading] = useState(false)
    const [loading, setLoading] = useState(true)
    const [deletingId, setDeletingId] = useState(null)

    const [productData, setProductData] = useState({
        name: '',
        description: '',
        price: '',
        image: '',
        categoryId: '',
        available: true,
        featured: false
    })

    const getProducts = async () => {
        try {
            const response = await getAllProductsAPI()
            setProducts(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    const getCategories = async () => {
        try {
            const response = await getAllCategoriesAPI()
            setCategories(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    const loadData = async () => {
        try {
            setLoading(true)

            await Promise.all([
                getProducts(),
                getCategories()
            ])
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        loadData()
    }, [])

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target

        setProductData((previousData) => ({
            ...previousData,
            [name]: type === 'checkbox' ? checked : value
        }))
    }

    const handleImageChange = (e) => {
        const imageFile = e.target.files[0]

        if (!imageFile) {
            return
        }

        setSelectedImage(imageFile)
        setImagePreview(URL.createObjectURL(imageFile))
    }

    const uploadImage = async () => {
        if (!selectedImage) {
            return productData.image
        }

        const response = await cloudinaryAPI(selectedImage)

        return response.data.secure_url
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!productData.name || !productData.price || !productData.categoryId) {
            return
        }

        try {
            setIsUploading(true)

            const imageUrl = await uploadImage()

            const product = {
                ...productData,
                image: imageUrl,
                price: Number(productData.price),
                categoryId: Number(productData.categoryId)
            }

            if (isEditing) {
                await updateProductAPI(editId, product)
            } else {
                await addProductAPI(product)
            }

            await getProducts()
            resetForm()
        } catch (error) {
            console.log(error)
        } finally {
            setIsUploading(false)
        }
    }

    const handleEdit = (product) => {
        setIsEditing(true)
        setEditId(product.id)

        setProductData({
            name: product.name,
            description: product.description,
            price: product.price,
            image: product.image,
            categoryId: product.categoryId,
            available: product.available,
            featured: product.featured
        })

        setSelectedImage(null)
        setImagePreview(product.image)

        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm(
            'Are you sure you want to delete this product?'
        )

        if (!confirmDelete) {
            return
        }

        try {
            setDeletingId(id)

            await deleteProductAPI(id)

            setProducts((previousProducts) =>
                previousProducts.filter(
                    (product) => product.id !== id
                )
            )
        } catch (error) {
            console.log(error)
        } finally {
            setDeletingId(null)
        }
    }

    const resetForm = () => {
        setIsEditing(false)
        setEditId(null)
        setSelectedImage(null)
        setImagePreview('')

        setProductData({
            name: '',
            description: '',
            price: '',
            image: '',
            categoryId: '',
            available: true,
            featured: false
        })
    }

    const getCategoryName = (categoryId) => {
        return (
            categories.find(
                (category) => category.id === categoryId
            )?.name || 'Uncategorized'
        )
    }

    return (
        <div className={styles.productsContainer}>
            <div className={styles.pageHeader}>
                <div>
                    <span className={styles.eyebrow}>
                        Management
                    </span>

                    <h1>Products</h1>

                    <p>
                        Manage the products available across your Chai Loop store.
                    </p>
                </div>

                <div className={styles.productCount}>
                    <Package size={17} />

                    <div>
                        <strong>{products.length}</strong>
                        <span>Products</span>
                    </div>
                </div>
            </div>

            <section className={styles.productFormSection}>
                <div className={styles.formHeader}>
                    <div className={styles.formTitle}>
                        <div className={styles.formIcon}>
                            {isEditing ? (
                                <Pencil size={18} />
                            ) : (
                                <Plus size={19} />
                            )}
                        </div>

                        <div>
                            <span>
                                {isEditing
                                    ? 'Product Update'
                                    : 'Product Creation'}
                            </span>

                            <h2>
                                {isEditing
                                    ? 'Edit Product'
                                    : 'Add New Product'}
                            </h2>
                        </div>
                    </div>

                    {isEditing && (
                        <button
                            type="button"
                            className={styles.cancelTopButton}
                            onClick={resetForm}
                        >
                            <X size={15} />
                            Cancel
                        </button>
                    )}
                </div>

                <form
                    className={styles.productForm}
                    onSubmit={handleSubmit}
                >
                    <div className={styles.formMain}>
                        <div className={styles.formFields}>
                            <div className={styles.inputGroup}>
                                <label htmlFor="name">
                                    Product Name
                                </label>

                                <input
                                    id="name"
                                    type="text"
                                    name="name"
                                    placeholder="e.g. Classic Masala Chai"
                                    value={productData.name}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className={styles.formRow}>
                                <div className={styles.inputGroup}>
                                    <label htmlFor="price">
                                        Price
                                    </label>

                                    <div className={styles.priceInput}>
                                        <span>₹</span>

                                        <input
                                            id="price"
                                            type="number"
                                            name="price"
                                            min="0"
                                            placeholder="0.00"
                                            value={productData.price}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>

                                <div className={styles.inputGroup}>
                                    <label htmlFor="categoryId">
                                        Category
                                    </label>

                                    <select
                                        id="categoryId"
                                        name="categoryId"
                                        value={productData.categoryId}
                                        onChange={handleChange}
                                    >
                                        <option value="">
                                            Select category
                                        </option>

                                        {categories.map((category) => (
                                            <option
                                                key={category.id}
                                                value={category.id}
                                            >
                                                {category.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className={styles.inputGroup}>
                                <label htmlFor="description">
                                    Description
                                </label>

                                <textarea
                                    id="description"
                                    name="description"
                                    rows="5"
                                    placeholder="Describe the product..."
                                    value={productData.description}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className={styles.toggleRow}>
                                <label className={styles.toggleItem}>
                                    <input
                                        type="checkbox"
                                        name="available"
                                        checked={productData.available}
                                        onChange={handleChange}
                                    />

                                    <span className={styles.toggle}></span>

                                    <span className={styles.toggleText}>
                                        <strong>Available</strong>
                                        <small>
                                            Customers can order this product
                                        </small>
                                    </span>
                                </label>

                                <label className={styles.toggleItem}>
                                    <input
                                        type="checkbox"
                                        name="featured"
                                        checked={productData.featured}
                                        onChange={handleChange}
                                    />

                                    <span className={styles.toggle}></span>

                                    <span className={styles.toggleText}>
                                        <strong>Featured</strong>
                                        <small>
                                            Highlight this product in the store
                                        </small>
                                    </span>
                                </label>
                            </div>
                        </div>

                        <div className={styles.imageUpload}>
                            <span className={styles.imageLabel}>
                                Product Image
                            </span>

                            <label
                                htmlFor="productImage"
                                className={
                                    imagePreview
                                        ? styles.imagePreview
                                        : styles.uploadBox
                                }
                            >
                                {imagePreview ? (
                                    <>
                                        <img
                                            src={imagePreview}
                                            alt="Product preview"
                                        />

                                        <div className={styles.changeImage}>
                                            <Upload size={15} />
                                            Change Image
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className={styles.uploadIcon}>
                                            <ImagePlus size={24} />
                                        </div>

                                        <strong>
                                            Upload product image
                                        </strong>

                                        <span>
                                            PNG, JPG or WEBP
                                        </span>

                                        <small>
                                            Click to browse
                                        </small>
                                    </>
                                )}

                                <input
                                    id="productImage"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                />
                            </label>
                        </div>
                    </div>

                    <div className={styles.formActions}>
                        <button
                            type="submit"
                            className={styles.primaryButton}
                            disabled={isUploading}
                        >
                            {isUploading ? (
                                <>
                                    <span className={styles.buttonSpinner}></span>
                                    Uploading...
                                </>
                            ) : (
                                <>
                                    {isEditing ? (
                                        <Check size={17} />
                                    ) : (
                                        <Plus size={17} />
                                    )}

                                    {isEditing
                                        ? 'Update Product'
                                        : 'Add Product'}
                                </>
                            )}
                        </button>

                        {isEditing && (
                            <button
                                type="button"
                                className={styles.secondaryButton}
                                onClick={resetForm}
                            >
                                Cancel
                            </button>
                        )}
                    </div>
                </form>
            </section>

            <section className={styles.productsSection}>
                <div className={styles.sectionHeader}>
                    <div>
                        <span className={styles.sectionEyebrow}>
                            Inventory
                        </span>

                        <h2>All Products</h2>
                    </div>

                    <span className={styles.totalProducts}>
                        {products.length} items
                    </span>
                </div>

                {loading ? (
                    <div className={styles.loadingGrid}>
                        {[1, 2, 3, 4].map((item) => (
                            <div
                                className={styles.skeletonCard}
                                key={item}
                            >
                                <div className={styles.skeletonImage}></div>
                                <div className={styles.skeletonLine}></div>
                                <div className={styles.skeletonSmall}></div>
                            </div>
                        ))}
                    </div>
                ) : products.length === 0 ? (
                    <div className={styles.emptyState}>
                        <div className={styles.emptyIcon}>
                            <Package size={28} />
                        </div>

                        <h3>No products yet</h3>

                        <p>
                            Start building your menu by adding your first
                            Chai Loop product.
                        </p>
                    </div>
                ) : (
                    <div className={styles.productsGrid}>
                        {products.map((product, index) => (
                            <article
                                className={styles.productCard}
                                key={product.id}
                                style={{
                                    '--product-index': index
                                }}
                            >
                                <div className={styles.productImage}>
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                    />

                                    <div className={styles.imageOverlay}>
                                        <button
                                            type="button"
                                            onClick={() =>
                                                handleEdit(product)
                                            }
                                        >
                                            <Pencil size={15} />
                                            Edit
                                        </button>
                                    </div>

                                    <div className={styles.cardBadges}>
                                        <span className={styles.categoryBadge}>
                                            {getCategoryName(
                                                product.categoryId
                                            )}
                                        </span>

                                        {product.featured && (
                                            <span className={styles.featuredBadge}>
                                                <Star size={11} />
                                                Featured
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <div className={styles.productContent}>
                                    <div className={styles.productHeading}>
                                        <h3>{product.name}</h3>

                                        <strong>
                                            ₹{product.price}
                                        </strong>
                                    </div>

                                    <p className={styles.productDescription}>
                                        {product.description}
                                    </p>

                                    <div className={styles.productFooter}>
                                        <span
                                            className={
                                                product.available
                                                    ? styles.available
                                                    : styles.unavailable
                                            }
                                        >
                                            {product.available ? (
                                                <Eye size={13} />
                                            ) : (
                                                <EyeOff size={13} />
                                            )}

                                            {product.available
                                                ? 'Available'
                                                : 'Unavailable'}
                                        </span>

                                        <button
                                            type="button"
                                            className={styles.deleteButton}
                                            disabled={
                                                deletingId === product.id
                                            }
                                            onClick={() =>
                                                handleDelete(product.id)
                                            }
                                        >
                                            {deletingId === product.id ? (
                                                <span className={styles.buttonSpinner}></span>
                                            ) : (
                                                <Trash2 size={15} />
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </section>
        </div>
    )
}

export default Products