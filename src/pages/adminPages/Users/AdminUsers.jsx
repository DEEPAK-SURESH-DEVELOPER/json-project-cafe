import React, { useEffect, useState } from 'react'
import {
    Users,
    UserRound,
    Mail,
    Phone,
    Pencil,
    Trash2,
    X,
    Check,
    Search,
    UserCheck
} from 'lucide-react'
import {
    deleteUserAPI,
    getAllUsersAPI,
    updateUserAPI
} from '../../../services/allAPI'
import styles from './AdminUsers.module.css'

function AdminUsers() {
    const [users, setUsers] = useState([])
    const [filteredUsers, setFilteredUsers] = useState([])
    const [isEditing, setIsEditing] = useState(false)
    const [editId, setEditId] = useState(null)
    const [searchTerm, setSearchTerm] = useState('')
    const [loading, setLoading] = useState(true)
    const [updating, setUpdating] = useState(false)
    const [deletingId, setDeletingId] = useState(null)

    const [userData, setUserData] = useState({
        name: '',
        email: '',
        phone: ''
    })

    const getUsers = async () => {
        try {
            setLoading(true)

            const response = await getAllUsersAPI()

            const normalUsers = response.data.filter(
                (user) => user.role === 'user'
            )

            setUsers(normalUsers)
            setFilteredUsers(normalUsers)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getUsers()
    }, [])

    useEffect(() => {
        const search = searchTerm.toLowerCase().trim()

        if (!search) {
            setFilteredUsers(users)
            return
        }

        const filtered = users.filter(
            (user) =>
                user.name?.toLowerCase().includes(search) ||
                user.email?.toLowerCase().includes(search) ||
                user.phone?.toString().includes(search)
        )

        setFilteredUsers(filtered)
    }, [searchTerm, users])

    const handleChange = (e) => {
        const { name, value } = e.target

        setUserData((previousData) => ({
            ...previousData,
            [name]: value
        }))
    }

    const handleEdit = (user) => {
        setIsEditing(true)
        setEditId(user.id)

        setUserData({
            name: user.name || '',
            email: user.email || '',
            phone: user.phone || ''
        })

        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }

    const handleUpdate = async (e) => {
        e.preventDefault()

        try {
            setUpdating(true)

            await updateUserAPI(editId, {
                name: userData.name,
                email: userData.email,
                phone: userData.phone
            })

            setUsers((previousUsers) =>
                previousUsers.map((user) =>
                    user.id === editId
                        ? {
                              ...user,
                              name: userData.name,
                              email: userData.email,
                              phone: userData.phone
                          }
                        : user
                )
            )

            handleCancel()
        } catch (error) {
            console.log(error)
        } finally {
            setUpdating(false)
        }
    }

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm(
            'Are you sure you want to delete this user?'
        )

        if (!confirmDelete) {
            return
        }

        try {
            setDeletingId(id)

            await deleteUserAPI(id)

            setUsers((previousUsers) =>
                previousUsers.filter(
                    (user) => user.id !== id
                )
            )
        } catch (error) {
            console.log(error)
        } finally {
            setDeletingId(null)
        }
    }

    const handleCancel = () => {
        setIsEditing(false)
        setEditId(null)

        setUserData({
            name: '',
            email: '',
            phone: ''
        })
    }

    return (
        <div className={styles.usersContainer}>
            <div className={styles.pageHeader}>
                <div>
                    <span className={styles.eyebrow}>
                        Management
                    </span>

                    <h1>Users</h1>

                    <p>
                        Manage registered customers and their account details.
                    </p>
                </div>

                <div className={styles.userSummary}>
                    <Users size={17} />

                    <div>
                        <strong>{users.length}</strong>
                        <span>Customers</span>
                    </div>
                </div>
            </div>

            {isEditing && (
                <section className={styles.editSection}>
                    <div className={styles.editHeader}>
                        <div className={styles.editTitle}>
                            <div className={styles.editIcon}>
                                <Pencil size={17} />
                            </div>

                            <div>
                                <span>User Management</span>
                                <h2>Edit Customer</h2>
                            </div>
                        </div>

                        <button
                            type="button"
                            className={styles.closeButton}
                            onClick={handleCancel}
                        >
                            <X size={16} />
                        </button>
                    </div>

                    <form
                        className={styles.editForm}
                        onSubmit={handleUpdate}
                    >
                        <div className={styles.inputGroup}>
                            <label htmlFor="userName">
                                Name
                            </label>

                            <div className={styles.inputWrapper}>
                                <UserRound size={15} />

                                <input
                                    id="userName"
                                    type="text"
                                    name="name"
                                    value={userData.name}
                                    onChange={handleChange}
                                    placeholder="Customer name"
                                    required
                                />
                            </div>
                        </div>

                        <div className={styles.inputGroup}>
                            <label htmlFor="userEmail">
                                Email
                            </label>

                            <div className={styles.inputWrapper}>
                                <Mail size={15} />

                                <input
                                    id="userEmail"
                                    type="email"
                                    name="email"
                                    value={userData.email}
                                    onChange={handleChange}
                                    placeholder="Customer email"
                                    required
                                />
                            </div>
                        </div>

                        <div className={styles.inputGroup}>
                            <label htmlFor="userPhone">
                                Phone
                            </label>

                            <div className={styles.inputWrapper}>
                                <Phone size={15} />

                                <input
                                    id="userPhone"
                                    type="tel"
                                    name="phone"
                                    value={userData.phone}
                                    onChange={handleChange}
                                    placeholder="Phone number"
                                />
                            </div>
                        </div>

                        <div className={styles.formActions}>
                            <button
                                type="button"
                                className={styles.cancelButton}
                                onClick={handleCancel}
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                className={styles.updateButton}
                                disabled={updating}
                            >
                                {updating ? (
                                    <>
                                        <span className={styles.spinner}></span>
                                        Updating...
                                    </>
                                ) : (
                                    <>
                                        <Check size={15} />
                                        Update User
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </section>
            )}

            <section className={styles.usersSection}>
                <div className={styles.sectionHeader}>
                    <div>
                        <span className={styles.sectionEyebrow}>
                            Customers
                        </span>

                        <h2>All Users</h2>
                    </div>

                    <div className={styles.headerActions}>
                        <div className={styles.searchBox}>
                            <Search size={15} />

                            <input
                                type="text"
                                placeholder="Search users..."
                                value={searchTerm}
                                onChange={(e) =>
                                    setSearchTerm(e.target.value)
                                }
                            />
                        </div>

                        <span className={styles.userCount}>
                            {filteredUsers.length} users
                        </span>
                    </div>
                </div>

                {loading ? (
                    <div className={styles.loadingList}>
                        {[1, 2, 3, 4].map((item) => (
                            <div
                                className={styles.skeletonUser}
                                key={item}
                            >
                                <div className={styles.skeletonAvatar}></div>

                                <div className={styles.skeletonInfo}>
                                    <span></span>
                                    <small></small>
                                </div>

                                <div className={styles.skeletonLine}></div>

                                <div className={styles.skeletonLine}></div>
                            </div>
                        ))}
                    </div>
                ) : filteredUsers.length === 0 ? (
                    <div className={styles.emptyState}>
                        <div className={styles.emptyIcon}>
                            {searchTerm ? (
                                <Search size={27} />
                            ) : (
                                <Users size={27} />
                            )}
                        </div>

                        <h3>
                            {searchTerm
                                ? 'No users found'
                                : 'No customers yet'}
                        </h3>

                        <p>
                            {searchTerm
                                ? 'Try searching with a different name, email or phone number.'
                                : 'Registered customers will appear here.'}
                        </p>
                    </div>
                ) : (
                    <div className={styles.usersList}>
                        <div className={styles.tableHeader}>
                            <span>Customer</span>
                            <span>Contact</span>
                            <span>Role</span>
                            <span>Actions</span>
                        </div>

                        {filteredUsers.map((user, index) => (
                            <div
                                className={styles.userCard}
                                key={user.id}
                                style={{
                                    '--user-index': index
                                }}
                            >
                                <div className={styles.customerInfo}>
                                    <div className={styles.avatar}>
                                        {user.name
                                            ?.charAt(0)
                                            .toUpperCase()}
                                    </div>

                                    <div>
                                        <h3>{user.name}</h3>

                                        <span>
                                            Customer ID #{user.id}
                                        </span>
                                    </div>
                                </div>

                                <div className={styles.contactInfo}>
                                    <div>
                                        <Mail size={13} />

                                        <span>
                                            {user.email}
                                        </span>
                                    </div>

                                    <div>
                                        <Phone size={13} />

                                        <span>
                                            {user.phone || 'Not provided'}
                                        </span>
                                    </div>
                                </div>

                                <div>
                                    <span className={styles.roleBadge}>
                                        <UserCheck size={12} />
                                        {user.role}
                                    </span>
                                </div>

                                <div className={styles.actionButtons}>
                                    <button
                                        type="button"
                                        className={styles.editButton}
                                        onClick={() =>
                                            handleEdit(user)
                                        }
                                    >
                                        <Pencil size={14} />
                                        Edit
                                    </button>

                                    <button
                                        type="button"
                                        className={styles.deleteButton}
                                        disabled={
                                            deletingId === user.id
                                        }
                                        onClick={() =>
                                            handleDelete(user.id)
                                        }
                                    >
                                        {deletingId === user.id ? (
                                            <span className={styles.deleteSpinner}></span>
                                        ) : (
                                            <Trash2 size={14} />
                                        )}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </div>
    )
}

export default AdminUsers