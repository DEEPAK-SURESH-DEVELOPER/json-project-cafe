import React from 'react'
import { ArrowRight, MapPin } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import ScrollReveal from '../../../../components/ScrollReveal/ScrollReveal'
import styles from './CTA.module.css'

function CTA() {
    const navigate = useNavigate()

    return (
        <section className={styles.cta}>

            <div className={styles.backgroundCircle}></div>
            <div className={styles.backgroundCircleTwo}></div>

            <div className={styles.ctaContainer}>

                <div className={styles.topLine}>
                    <div className={styles.sectionNumber}>
                        <span>05</span>
                        <span>COME BY</span>
                    </div>

                    <div className={styles.location}>
                        <MapPin size={14} />
                        <span>YOUR EVERYDAY ESCAPE</span>
                    </div>
                </div>

                <div className={styles.mainContent}>

                    <div className={styles.eyebrow}>
                        YOUR NEXT CUP IS WAITING
                    </div>

                    <ScrollReveal
                        baseOpacity={0.15}
                        enableBlur
                        baseRotation={2}
                        blurStrength={4}
                        containerClassName={styles.reveal}
                        textClassName={styles.revealText}
                        rotationEnd="bottom center"
                        wordAnimationEnd="bottom center"
                    >
                        Good chai. Good coffee. Good moments. Come slow down with us.
                    </ScrollReveal>

                    <p className={styles.description}>
                        Take a break from the rush. Find your favourite cup,
                        bring someone along, and stay for a little longer.
                    </p>

                    <button
                        className={styles.menuButton}
                        onClick={() => navigate('/menu')}
                    >
                        <span>Explore Our Menu</span>
                        <ArrowRight size={18} />
                    </button>

                </div>

                <div className={styles.bottomLine}>

                    <div className={styles.bottomText}>
                        <span>CHAI</span>
                        <span>COFFEE</span>
                        <span>COMMUNITY</span>
                    </div>

                    <div className={styles.bottomMessage}>
                        <span>05 / 05</span>
                        <p>
                            Made for slow mornings,
                            <br />
                            long conversations and everything between.
                        </p>
                    </div>

                </div>

            </div>

        </section>
    )
}

export default CTA