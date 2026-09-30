import React from 'react'
import { ArrowUpRight, MapPin } from 'lucide-react'
import { Link } from 'react-router-dom'
import logo from '../../../../assets/logo.png'
import ScrollVelocity from '../../../../components/ScrollVelocity/ScrollVelocity'
import styles from './Footer.module.css'

function Footer() {
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }

    return (
        <footer className={styles.footer}>

            <div className={styles.footerContainer}>

                <div className={styles.footerTop}>

                    <div className={styles.brandSection}>

                        <Link
                            to="/"
                            className={styles.logo}
                        >
                            <img
                                src={logo}
                                alt="Chai Loop"
                            />

                            <div>
                                <span>Chai</span>
                                <strong>Loop</strong>
                            </div>
                        </Link>

                        <p>
                            A warm cup, a slower moment.
                            <br />
                            Chai, coffee and good company.
                        </p>

                        <div className={styles.location}>
                            <MapPin size={15} />
                            <span>Kerala, India</span>
                        </div>

                    </div>

                    <div className={styles.footerLinks}>

                        <div className={styles.linkGroup}>

                            <span className={styles.linkTitle}>
                                EXPLORE
                            </span>

                            <Link to="/">
                                Home
                            </Link>

                            <Link to="/menu">
                                Menu
                            </Link>

                            <a href="/#experience">
                                Experience
                            </a>

                            <a href="/#about">
                                About
                            </a>

                        </div>

                        <div className={styles.linkGroup}>

                            <span className={styles.linkTitle}>
                                VISIT
                            </span>

                            <a href="/#experience">
                                Our Cafe
                            </a>

                            <a href="/#about">
                                Our Story
                            </a>

                            <Link to="/menu">
                                Order Online
                            </Link>

                        </div>

                        <div className={styles.linkGroup}>

                            <span className={styles.linkTitle}>
                                CONNECT
                            </span>

                            <a
                                href="#"
                                className={styles.socialLink}
                            >
                                <span className={styles.instagramIcon}>
                                    ◎
                                </span>
                                Instagram
                            </a>

                            <a href="mailto:hello@chailoop.com">
                                Email Us
                            </a>

                        </div>

                    </div>

                </div>

                <div className={styles.marqueeSection}>

                    <ScrollVelocity
                        texts={[
                            'CHAI • COFFEE • COMMUNITY • GOOD VIBES •',
                            'SLOW MOMENTS • FRESHLY BREWED • STAY A LITTLE LONGER •'
                        ]}
                        velocity={35}
                        damping={40}
                        stiffness={300}
                        numCopies={5}
                        velocityMapping={{
                            input: [0, 1000],
                            output: [0, 3]
                        }}
                        className={styles.marqueeText}
                    />

                </div>

                <div className={styles.footerBrand}>

                    <span>CHAI</span>
                    <span>LOOP</span>

                </div>

                <div className={styles.footerBottom}>

                    <p>
                        © 2026 Chai Loop Cafe. All rights reserved.
                    </p>

                    <div className={styles.bottomCenter}>
                        <span>CHAI</span>
                        <span>•</span>
                        <span>COFFEE</span>
                        <span>•</span>
                        <span>COMMUNITY</span>
                    </div>

                    <button
                        className={styles.backToTop}
                        onClick={scrollToTop}
                    >
                        <span>BACK TO TOP</span>
                        <ArrowUpRight size={16} />
                    </button>

                </div>

            </div>

        </footer>
    )
}

export default Footer