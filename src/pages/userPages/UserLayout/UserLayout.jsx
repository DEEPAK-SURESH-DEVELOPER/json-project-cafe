import React from 'react'
import { Outlet } from 'react-router-dom'
import UserHeader from '../../../components/UserComponents/UserHeader/UserHeader'
import UserSidebar from '../../../components/UserComponents/UserSidebar/UserSidebar'
import styles from './UserLayout.module.css'

function UserLayout() {
    return (
        <div className={styles.userLayout}>
            <UserSidebar />

            <div className={styles.contentArea}>
                <UserHeader/>

                <main className={styles.mainContent}>
                    <Outlet />
                </main>
            </div>
        </div>
    )
}

export default UserLayout