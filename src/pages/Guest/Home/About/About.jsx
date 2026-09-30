import React from 'react'
import ScrollReveal from '../../../../components/ScrollReveal/ScrollReveal'
import styles from './About.module.css'

function About() {
    return (
        <section className={styles.about} id="about">

            <div className={styles.aboutTop}>

                <div className={styles.sectionLabel}>
                    <span>03</span>
                    <span>ABOUT CHAI LOOP</span>
                </div>

                <div className={styles.topText}>
                    <span>OUR STORY</span>
                    <p>
                        A café built around the simple idea that
                        every cup can create a moment worth remembering.
                    </p>
                </div>

            </div>

            <div className={styles.revealContainer}>

                <ScrollReveal
                    baseOpacity={0.12}
                    enableBlur
                    baseRotation={3}
                    blurStrength={4}
                    containerClassName={styles.reveal}
                    textClassName={styles.revealText}
                    rotationEnd="bottom center"
                    wordAnimationEnd="bottom center"
                >
                    Chai Loop is where traditional Indian chai meets modern
                    café culture, creating a warm place to slow down, connect
                    with people, and enjoy the little moments in between.
                </ScrollReveal>

            </div>

            <div className={styles.aboutBottom}>

                <div className={styles.aboutNumber}>
                    <span>03</span>
                </div>

                <div className={styles.aboutContent}>

                    <span className={styles.contentLabel}>
                        MADE FOR EVERYDAY MOMENTS
                    </span>

                    <h3>
                        Not just a café.
                        <br />
                        <em>A feeling.</em>
                    </h3>

                </div>

                <div className={styles.aboutDescription}>

                    <p>
                        Morning chai, afternoon coffee, evening conversations
                        or a quiet moment by yourself. Chai Loop is designed
                        to feel familiar every time you walk in.
                    </p>

                    <div className={styles.aboutLine}></div>

                    <span>
                        CHAI • COFFEE • COMMUNITY
                    </span>

                </div>

            </div>

        </section>
    )
}

export default About