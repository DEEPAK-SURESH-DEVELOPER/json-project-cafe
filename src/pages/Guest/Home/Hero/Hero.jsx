import React, { useEffect, useState } from 'react'
import { ArrowDownRight, ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import FoldText from '../../../../components/FoldText/FoldText'
import styles from './Hero.module.css'

function Hero() {
    const navigate = useNavigate()
    const [scrollY, setScrollY] = useState(0)

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY)
        }

        window.addEventListener('scroll', handleScroll, {
            passive: true
        })

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    const parallaxOffset = Math.min(scrollY * 0.25, 180)

    return (
        <section className={styles.hero}>

            <div
                className={styles.background}
                style={{
                    transform: `translate3d(0, ${parallaxOffset}px, 0)`
                }}
                aria-hidden="true"
            />

            <div
                className={styles.overlay}
                aria-hidden="true"
            />

            <div className={styles.heroContainer}>

                <div className={styles.heroContent}>

                    <div className={styles.heroTitle}>

                        <FoldText
                            text="Your daily"
                            splitBy="char"
                            hinge="top"
                            trigger="mount"
                            duration={0.65}
                            stagger={0.035}
                            ease="power3.out"
                            perspective={700}
                            creaseShading={0.3}
                            fontSize="clamp(3.6rem, 8.2vw, 8rem)"
                            fontWeight={700}
                            color="#fff8ef"
                        />

                        <FoldText
                            text="chai ritual."
                            splitBy="char"
                            hinge="top"
                            trigger="mount"
                            duration={0.72}
                            stagger={0.045}
                            ease="power3.out"
                            perspective={700}
                            creaseShading={0.35}
                            fontSize="clamp(3.6rem, 8.2vw, 8rem)"
                            fontWeight={700}
                            color="#e3ae78"
                            className={styles.accentText}
                        />

                    </div>

                    <p className={styles.description}>
                        Fresh chai, good coffee, and moments worth slowing down for.
                    </p>

                    <div className={styles.heroActions}>

                        <button
                            className={styles.primaryButton}
                            onClick={() => navigate('/menu')}
                        >
                            Explore Menu
                            <ArrowRight size={17} />
                        </button>

                        <a
                            href="#about"
                            className={styles.secondaryButton}
                        >
                            Our Story
                            <ArrowDownRight size={17} />
                        </a>

                    </div>

                    <div className={styles.bottomNote}>
                        <span className={styles.noteDot}></span>

                        <span>
                            Good chai. Good company. Good moments.
                        </span>
                    </div>

                </div>

                <div
                    className={styles.sideNote}
                    aria-hidden="true"
                >
                    <span>BREWED WITH LOVE</span>

                    <span className={styles.sideNoteLine}></span>

                    <span>MADE FOR YOUR MOMENTS</span>
                </div>

            </div>

            <div
                className={styles.scrollIndicator}
                aria-hidden="true"
            >
                <span>SCROLL TO EXPLORE</span>

                <span className={styles.scrollLine}></span>
            </div>

            <div
                className={styles.cornerLabel}
                aria-hidden="true"
            >
                <span>CHAI LOOP</span>

                <span>CAFE & BITES</span>
            </div>

        </section>
    )
}

export default Hero