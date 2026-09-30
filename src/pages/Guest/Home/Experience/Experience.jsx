import React from 'react'
import { ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import ScrollExpand from '../../../../components/ScrollExpand/ScrollExpand'
import experienceImage from '../../../../assets/experience.jpg'
import styles from './Experience.module.css'

function Experience() {
    const navigate = useNavigate()

    return (
        <section
            className={styles.experience}
            id="experience"
        >

            <div className={styles.intro}>

                <div className={styles.introLabel}>
                    <span>02</span>
                    <span>THE EXPERIENCE</span>
                </div>

                <div className={styles.introContent}>

                    <span className={styles.smallText}>
                        MORE THAN A CUP
                    </span>

                    <h2>
                        Come for the chai.
                        <br />
                        <em>Stay for the moment.</em>
                    </h2>

                    <p className={styles.description}>
                        Freshly brewed chai, good coffee, and a place
                        to slow down, connect, and enjoy the moment.
                    </p>

                </div>

            </div>

            <div className={styles.expandWrapper}>

                <ScrollExpand
                    src={experienceImage}
                    alt="Chai Loop cafe experience"
                    title="A place to slow down."
                    scrollHint="Scroll to explore"
                    startWidth={78}
                    startHeight={62}
                    startRadius={24}
                    endRadius={0}
                    mediaZoom={1.3}
                    scrollDistance={1.1}
                    holdDistance={0.25}
                    smoothing={0.08}
                    overlayScrim={0.5}
                    useWindowScroll
                    enabled
                >

                    <div className={styles.imageContent}>

                        <div className={styles.imageTop}>
                            <span>CHAI LOOP / 02</span>
                            <span>EST. 2026</span>
                        </div>

                        <div className={styles.imageCenter}>

                            <span className={styles.imageLabel}>
                                YOUR EVERYDAY ESCAPE
                            </span>

                            <h3>
                                Good chai.
                                <br />
                                Great moments.
                            </h3>

                            <p>
                                Sip slowly. Stay longer.
                            </p>

                            <button
                                className={styles.imageButton}
                                onClick={() => navigate('/menu')}
                            >
                                Explore Menu
                                <ArrowRight size={16} />
                            </button>

                        </div>

                        <div className={styles.imageBottom}>

                            <span>INDIAN SOUL</span>

                            <span>MODERN SPIRIT</span>

                        </div>

                    </div>

                </ScrollExpand>

            </div>

            <div className={styles.bottomStatement}>

                <div className={styles.statementNumber}>
                    02
                </div>

                <div className={styles.statementText}>

                    <span>
                        YOUR EVERYDAY ESCAPE
                    </span>

                    <h3>
                        Good chai.
                        <br />
                        Good people.
                        <br />
                        Good moments.
                    </h3>

                </div>

                <div className={styles.statementDescription}>

                    <p>
                        From a quiet morning coffee to an evening
                        conversation, Chai Loop is made for the
                        moments in between.
                    </p>

                </div>

            </div>

        </section>
    )
}

export default Experience