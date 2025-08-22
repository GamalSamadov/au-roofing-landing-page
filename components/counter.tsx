import { useState, useEffect, useRef } from 'react'

interface CounterProps {
	end: number
	duration?: number
	suffix?: string
	className?: string
}

export function Counter({
	end,
	duration = 2000,
	suffix = '',
	className = '',
}: CounterProps) {
	const [count, setCount] = useState(0)
	const [isVisible, setIsVisible] = useState(false)
	const countRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting && !isVisible) {
					setIsVisible(true)
				}
			},
			{ threshold: 0.1 }
		)

		if (countRef.current) {
			observer.observe(countRef.current)
		}

		return () => observer.disconnect()
	}, [isVisible])

	useEffect(() => {
		if (!isVisible) return

		let startTime: number
		let animationId: number

		const animateCount = (timestamp: number) => {
			if (!startTime) startTime = timestamp

			const progress = Math.min((timestamp - startTime) / duration, 1)

			// Easing function for smoother animation
			const easeOutQuart = 1 - Math.pow(1 - progress, 4)
			const currentCount = Math.floor(easeOutQuart * end)

			setCount(currentCount)

			if (progress < 1) {
				animationId = requestAnimationFrame(animateCount)
			} else {
				setCount(end)
			}
		}

		animationId = requestAnimationFrame(animateCount)

		return () => {
			if (animationId) {
				cancelAnimationFrame(animationId)
			}
		}
	}, [isVisible, end, duration])

	return (
		<div ref={countRef} className={className}>
			{count}
			{suffix}
		</div>
	)
}
