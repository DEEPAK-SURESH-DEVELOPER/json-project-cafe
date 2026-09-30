import React, { useCallback, useEffect, useRef } from 'react'
import './ScrollExpand.css'

const clamp = (v, a, b) => {
    return v < a ? a : v > b ? b : v
}

const smoothstep = (edge0, edge1, x) => {
    const t = clamp(
        (x - edge0) / (edge1 - edge0 || 1e-6),
        0,
        1
    )

    return t * t * (3 - 2 * t)
}

function ScrollExpand({
    src = '',
    mediaType = 'image',
    poster = '',
    alt = '',
    title = '',
    scrollHint = '',
    startWidth = 42,
    startHeight = 58,
    startRadius = 24,
    endRadius = 0,
    mediaZoom = 1.35,
    scrollDistance = 0.8,
    holdDistance = 0.2,
    smoothing = 0.1,
    overlayScrim = 0.45,
    useWindowScroll = false,
    enabled = true,
    children,
    className = '',
    style,
    ...rest
}) {
    const rootRef = useRef(null)
    const trackRef = useRef(null)
    const stageRef = useRef(null)
    const frameRef = useRef(null)
    const mediaRef = useRef(null)
    const titleRef = useRef(null)
    const overlayRef = useRef(null)
    const scrimRef = useRef(null)
    const hintRef = useRef(null)

    const propsRef = useRef({})

    propsRef.current = {
        startWidth,
        startHeight,
        startRadius,
        endRadius,
        mediaZoom,
        scrollDistance,
        holdDistance,
        smoothing,
        overlayScrim,
        useWindowScroll,
        enabled
    }

    const applyProgress = useCallback((progress) => {
        const frame = frameRef.current
        const media = mediaRef.current

        if (!frame || !media) {
            return
        }

        const currentProps = propsRef.current

        const progressValue = smoothstep(
            0,
            1,
            progress
        )

        const width =
            currentProps.startWidth +
            (100 - currentProps.startWidth) *
            progressValue

        const height =
            currentProps.startHeight +
            (100 - currentProps.startHeight) *
            progressValue

        const horizontalInset =
            Math.max(0, (100 - width) / 2)

        const verticalInset =
            Math.max(0, (100 - height) / 2)

        const radius =
            currentProps.startRadius +
            (currentProps.endRadius - currentProps.startRadius) *
            progressValue

        frame.style.clipPath = `
            inset(
                ${verticalInset}%
                ${horizontalInset}%
                ${verticalInset}%
                ${horizontalInset}%
                round ${radius}px
            )
        `

        media.style.transform = `
            scale(
                ${
                    currentProps.mediaZoom +
                    (1 - currentProps.mediaZoom) *
                    progressValue
                }
            )
        `

        if (scrimRef.current) {
            scrimRef.current.style.opacity =
                `${currentProps.overlayScrim * progressValue}`
        }

        if (titleRef.current) {
            const titleOut = smoothstep(
                0.3,
                0.75,
                progress
            )

            titleRef.current.style.opacity =
                `${1 - titleOut}`

            titleRef.current.style.transform = `
                translate3d(
                    0,
                    ${-28 * titleOut}px,
                    0
                )
                scale(
                    ${1 + 0.06 * titleOut}
                )
            `
        }

        if (hintRef.current) {
            const hintOut = smoothstep(
                0,
                0.15,
                progress
            )

            hintRef.current.style.opacity =
                `${1 - hintOut}`

            hintRef.current.style.transform = `
                translate3d(
                    0,
                    ${8 * hintOut}px,
                    0
                )
            `
        }

        if (overlayRef.current) {
            const overlayIn = smoothstep(
                0.55,
                0.9,
                progress
            )

            overlayRef.current.style.opacity =
                `${overlayIn}`

            overlayRef.current.style.transform = `
                translate3d(
                    0,
                    ${18 * (1 - overlayIn)}px,
                    0
                )
            `
        }
    }, [])

    useEffect(() => {
        const root = rootRef.current
        const track = trackRef.current
        const stage = stageRef.current

        if (!root || !track || !stage) {
            return
        }

        const reduceMotion = window
            .matchMedia(
                '(prefers-reduced-motion: reduce)'
            )
            .matches

        let animationFrame = 0
        let currentProgress = 0
        let targetProgress = 0
        let stageHeight = 0
        let running = false

        const measure = () => {
            const currentProps = propsRef.current

            stageHeight = currentProps.useWindowScroll
                ? window.innerHeight
                : root.clientHeight

            if (stageHeight <= 0) {
                return
            }

            stage.style.height =
                `${stageHeight}px`

            track.style.height =
                `${stageHeight * (
                    1 +
                    Math.max(
                        0,
                        currentProps.scrollDistance
                    ) +
                    Math.max(
                        0,
                        currentProps.holdDistance
                    )
                )}px`

            const width =
                root.clientWidth || stageHeight

            stage.style.setProperty(
                '--se-title-size',
                `${clamp(
                    width * 0.075,
                    20,
                    84
                )}px`
            )
        }

        const readProgress = () => {
            const currentProps = propsRef.current

            if (!currentProps.enabled) {
                return 1
            }

            const scrollSpan =
                stageHeight *
                Math.max(
                    0.01,
                    currentProps.scrollDistance
                )

            if (currentProps.useWindowScroll) {
                const trackTop =
                    track.getBoundingClientRect().top

                const viewportHeight =
                    window.innerHeight

                /*
                 * Start the animation slightly before
                 * the track reaches the top of the
                 * viewport.
                 */
                const startPoint =
                    viewportHeight * 0.35

                const distance =
                    startPoint - trackTop

                return clamp(
                    distance / scrollSpan,
                    0,
                    1
                )
            }

            return clamp(
                root.scrollTop / scrollSpan,
                0,
                1
            )
        }

        const tick = () => {
            const currentProps = propsRef.current

            const smoothingValue =
                currentProps.smoothing <= 0
                    ? 1
                    : 1 -
                      Math.exp(
                          -1 /
                          (
                              60 *
                              currentProps.smoothing
                          )
                      )

            currentProgress +=
                (
                    targetProgress -
                    currentProgress
                ) *
                smoothingValue

            if (
                Math.abs(
                    targetProgress -
                    currentProgress
                ) < 0.0004
            ) {
                currentProgress =
                    targetProgress

                running = false
            }

            applyProgress(currentProgress)

            animationFrame = running
                ? requestAnimationFrame(tick)
                : 0
        }

        const startAnimation = () => {
            if (running) {
                return
            }

            running = true

            if (!animationFrame) {
                animationFrame =
                    requestAnimationFrame(tick)
            }
        }

        const handleScroll = () => {
            targetProgress =
                readProgress()

            if (
                propsRef.current.smoothing <= 0 ||
                reduceMotion
            ) {
                currentProgress =
                    targetProgress

                applyProgress(currentProgress)

                return
            }

            startAnimation()
        }

        const handleResize = () => {
            measure()

            targetProgress =
                readProgress()

            currentProgress =
                targetProgress

            applyProgress(currentProgress)
        }

        measure()

        targetProgress =
            readProgress()

        currentProgress =
            targetProgress

        applyProgress(currentProgress)

        const scroller =
            useWindowScroll
                ? window
                : root

        scroller.addEventListener(
            'scroll',
            handleScroll,
            { passive: true }
        )

        window.addEventListener(
            'resize',
            handleResize
        )

        const resizeObserver =
            new ResizeObserver(
                handleResize
            )

        resizeObserver.observe(root)

        return () => {
            if (animationFrame) {
                cancelAnimationFrame(
                    animationFrame
                )
            }

            scroller.removeEventListener(
                'scroll',
                handleScroll
            )

            window.removeEventListener(
                'resize',
                handleResize
            )

            resizeObserver.disconnect()
        }
    }, [
        applyProgress,
        useWindowScroll
    ])

    const media =
        mediaType === 'video' ? (
            <video
                ref={mediaRef}
                className="scroll-expand__media"
                src={src}
                poster={poster}
                autoPlay
                muted
                loop
                playsInline
            />
        ) : (
            <img
                ref={mediaRef}
                className="scroll-expand__media"
                src={src}
                alt={alt}
                draggable={false}
            />
        )

    return (
        <div
            ref={rootRef}
            className={`
                scroll-expand
                ${
                    useWindowScroll
                        ? ''
                        : 'scroll-expand--scroller'
                }
                ${className}
            `.trim()}
            style={style}
            {...rest}
        >
            <div
                ref={trackRef}
                className="scroll-expand__track"
            >
                <div
                    ref={stageRef}
                    className="scroll-expand__stage"
                >
                    <div
                        ref={frameRef}
                        className="scroll-expand__frame"
                    >
                        {media}

                        <div
                            ref={scrimRef}
                            className="scroll-expand__scrim"
                        />

                        {children && (
                            <div
                                ref={overlayRef}
                                className="scroll-expand__overlay"
                            >
                                {children}
                            </div>
                        )}
                    </div>

                    {title && (
                        <div
                            ref={titleRef}
                            className="scroll-expand__title"
                        >
                            {title}
                        </div>
                    )}

                    {scrollHint && (
                        <div
                            ref={hintRef}
                            className="scroll-expand__hint"
                        >
                            {scrollHint}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ScrollExpand