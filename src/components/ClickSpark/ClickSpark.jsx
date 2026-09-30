import React, { useRef, useEffect, useCallback } from 'react'

function ClickSpark({
    sparkColor = '#8b5e34',
    sparkSize = 9,
    sparkRadius = 18,
    sparkCount = 8,
    duration = 450,
    easing = 'ease-out',
    extraScale = 1,
    children
}) {
    const canvasRef = useRef(null)
    const sparksRef = useRef([])
    const startTimeRef = useRef(null)

    useEffect(() => {
        const canvas = canvasRef.current

        if (!canvas) {
            return
        }

        const parent = canvas.parentElement

        if (!parent) {
            return
        }

        let resizeTimeout

        const resizeCanvas = () => {
            const {
                width,
                height
            } = parent.getBoundingClientRect()

            const pixelRatio =
                window.devicePixelRatio || 1

            canvas.width = width * pixelRatio
            canvas.height = height * pixelRatio

            canvas.style.width = `${width}px`
            canvas.style.height = `${height}px`

            const context = canvas.getContext('2d')

            context.setTransform(
                pixelRatio,
                0,
                0,
                pixelRatio,
                0,
                0
            )
        }

        const handleResize = () => {
            clearTimeout(resizeTimeout)

            resizeTimeout = setTimeout(
                resizeCanvas,
                100
            )
        }

        const resizeObserver =
            new ResizeObserver(handleResize)

        resizeObserver.observe(parent)

        resizeCanvas()

        return () => {
            resizeObserver.disconnect()
            clearTimeout(resizeTimeout)
        }
    }, [])

    const easeFunc = useCallback(
        (value) => {
            switch (easing) {
                case 'linear':
                    return value

                case 'ease-in':
                    return value * value

                case 'ease-in-out':
                    return value < 0.5
                        ? 2 * value * value
                        : -1 +
                        (4 - 2 * value) * value

                default:
                    return value * (2 - value)
            }
        },
        [easing]
    )

    useEffect(() => {
        const canvas = canvasRef.current

        if (!canvas) {
            return
        }

        const context = canvas.getContext('2d')

        let animationFrame

        const draw = (timestamp) => {
            if (!startTimeRef.current) {
                startTimeRef.current = timestamp
            }

            context.clearRect(
                0,
                0,
                canvas.clientWidth,
                canvas.clientHeight
            )

            sparksRef.current =
                sparksRef.current.filter(
                    (spark) => {
                        const elapsed =
                            timestamp -
                            spark.startTime

                        if (elapsed >= duration) {
                            return false
                        }

                        const progress =
                            elapsed / duration

                        const eased =
                            easeFunc(progress)

                        const distance =
                            eased *
                            sparkRadius *
                            extraScale

                        const lineLength =
                            sparkSize *
                            (1 - eased)

                        const x1 =
                            spark.x +
                            distance *
                            Math.cos(spark.angle)

                        const y1 =
                            spark.y +
                            distance *
                            Math.sin(spark.angle)

                        const x2 =
                            spark.x +
                            (distance +
                                lineLength) *
                            Math.cos(spark.angle)

                        const y2 =
                            spark.y +
                            (distance +
                                lineLength) *
                            Math.sin(spark.angle)

                        context.strokeStyle =
                            sparkColor

                        context.lineWidth = 1.7
                        context.lineCap = 'round'

                        context.beginPath()

                        context.moveTo(
                            x1,
                            y1
                        )

                        context.lineTo(
                            x2,
                            y2
                        )

                        context.stroke()

                        return true
                    }
                )

            animationFrame =
                requestAnimationFrame(draw)
        }

        animationFrame =
            requestAnimationFrame(draw)

        return () => {
            cancelAnimationFrame(
                animationFrame
            )
        }
    }, [
        sparkColor,
        sparkSize,
        sparkRadius,
        sparkCount,
        duration,
        easeFunc,
        extraScale
    ])

    const handleClick = (event) => {
        const canvas = canvasRef.current

        if (!canvas) {
            return
        }

        const rect =
            canvas.getBoundingClientRect()

        const x =
            event.clientX - rect.left

        const y =
            event.clientY - rect.top

        const now =
            performance.now()

        const newSparks =
            Array.from(
                {
                    length: sparkCount
                },
                (_, index) => ({
                    x,
                    y,
                    angle:
                        (2 *
                            Math.PI *
                            index) /
                        sparkCount,
                    startTime: now
                })
            )

        sparksRef.current.push(
            ...newSparks
        )
    }

    return (
        <div
            style={{
                position: 'relative',
                width: '100%'
            }}
            onClick={handleClick}
        >
            <canvas
                ref={canvasRef}
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    display: 'block',
                    pointerEvents: 'none',
                    userSelect: 'none',
                    zIndex: 9999
                }}
            />

            {children}
        </div>
    )
}

export default ClickSpark