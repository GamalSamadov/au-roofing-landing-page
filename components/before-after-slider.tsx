'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface BeforeAfterItem {
	before: string
	after: string
	title?: string
	description?: string
}

interface BeforeAfterSliderProps {
	items: BeforeAfterItem[]
}

const BeforeAfterComparison = ({
	before,
	after,
	title,
	description,
}: BeforeAfterItem) => {
	const [sliderPosition, setSliderPosition] = useState(50)
	const [isDragging, setIsDragging] = useState(false)
	const containerRef = useRef<HTMLDivElement>(null)
	const rafId = useRef<number | null>(null)

	const updateSliderPosition = useCallback((clientX: number) => {
		if (!containerRef.current) return

		const rect = containerRef.current.getBoundingClientRect()
		const x = clientX - rect.left
		const percentage = (x / rect.width) * 100
		const newPosition = Math.max(0, Math.min(100, percentage))

		// Cancel any pending animation frame
		if (rafId.current) {
			cancelAnimationFrame(rafId.current)
		}

		// Use requestAnimationFrame for smooth updates
		rafId.current = requestAnimationFrame(() => {
			setSliderPosition(newPosition)
		})
	}, [])

	const handleMouseMove = useCallback(
		(e: React.MouseEvent) => {
			if (!isDragging) return
			e.preventDefault()
			updateSliderPosition(e.clientX)
		},
		[isDragging, updateSliderPosition]
	)

	const handleTouchMove = useCallback(
		(e: React.TouchEvent) => {
			if (!isDragging) return
			e.preventDefault()
			updateSliderPosition(e.touches[0].clientX)
		},
		[isDragging, updateSliderPosition]
	)

	const handleStart = useCallback(
		(e: React.MouseEvent | React.TouchEvent) => {
			e.preventDefault()
			setIsDragging(true)

			// Prevent text selection during drag
			document.body.style.userSelect = 'none'
			document.body.style.webkitUserSelect = 'none'

			// Get initial position
			if ('clientX' in e) {
				updateSliderPosition(e.clientX)
			} else if (e.touches?.[0]) {
				updateSliderPosition(e.touches[0].clientX)
			}
		},
		[updateSliderPosition]
	)

	const handleEnd = useCallback(() => {
		setIsDragging(false)
		// Restore text selection
		document.body.style.userSelect = ''
		document.body.style.webkitUserSelect = ''

		// Cancel any pending animation frame
		if (rafId.current) {
			cancelAnimationFrame(rafId.current)
			rafId.current = null
		}
	}, [])

	// Global mouse/touch event listeners for smoother dragging
	useEffect(() => {
		if (!isDragging) return

		const handleGlobalMouseMove = (e: MouseEvent) => {
			e.preventDefault()
			updateSliderPosition(e.clientX)
		}

		const handleGlobalTouchMove = (e: TouchEvent) => {
			e.preventDefault()
			updateSliderPosition(e.touches[0].clientX)
		}

		const handleGlobalEnd = () => {
			handleEnd()
		}

		document.addEventListener('mousemove', handleGlobalMouseMove)
		document.addEventListener('mouseup', handleGlobalEnd)
		document.addEventListener('touchmove', handleGlobalTouchMove, {
			passive: false,
		})
		document.addEventListener('touchend', handleGlobalEnd)

		return () => {
			document.removeEventListener('mousemove', handleGlobalMouseMove)
			document.removeEventListener('mouseup', handleGlobalEnd)
			document.removeEventListener('touchmove', handleGlobalTouchMove)
			document.removeEventListener('touchend', handleGlobalEnd)
		}
	}, [isDragging, updateSliderPosition, handleEnd])

	// Cleanup on unmount
	useEffect(() => {
		return () => {
			if (rafId.current) {
				cancelAnimationFrame(rafId.current)
			}
		}
	}, [])

	return (
		<motion.div
			className='relative w-full h-64 sm:h-80 lg:h-96 overflow-hidden group cursor-grab active:cursor-grabbing select-none rounded-xl sm:rounded-2xl'
			ref={containerRef}
			onMouseDown={handleStart}
			onTouchStart={handleStart}
			style={{ userSelect: 'none', WebkitUserSelect: 'none' }}
		>
			{/* After Image (Background) */}
			<div className='absolute inset-0 pointer-events-none'>
				<img
					src={after}
					alt='After renovation'
					className='w-full h-full object-cover select-none pointer-events-none'
					draggable={false}
					style={{ userSelect: 'none', WebkitUserSelect: 'none' }}
				/>
				<div className='absolute top-2 sm:top-4 right-2 sm:right-4 bg-white/90 backdrop-blur-sm text-gray-800 px-2 sm:px-3 py-1 sm:py-2 rounded-md sm:rounded-lg text-xs sm:text-sm font-medium shadow-lg border border-white/20 pointer-events-none'>
					After
				</div>
			</div>

			{/* Before Image (Foreground with clip) */}
			<div
				className='absolute inset-0 overflow-hidden pointer-events-none will-change-[clip-path]'
				style={{
					clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
					transform: 'translateZ(0)', // Force GPU acceleration
				}}
			>
				<img
					src={before}
					alt='Before renovation'
					className='w-full h-full object-cover select-none pointer-events-none'
					draggable={false}
					style={{ userSelect: 'none', WebkitUserSelect: 'none' }}
				/>
				<div className='absolute top-2 sm:top-4 left-2 sm:left-4 bg-white/90 backdrop-blur-sm text-gray-800 px-2 sm:px-3 py-1 sm:py-2 rounded-md sm:rounded-lg text-xs sm:text-sm font-medium shadow-lg border border-white/20 pointer-events-none'>
					Before
				</div>
			</div>

			{/* Slider Handle */}
			<div
				className='absolute top-0 bottom-0 w-1 sm:w-1.5 bg-white shadow-lg cursor-col-resize group-hover:w-2 transition-[width] duration-200 pointer-events-none will-change-transform'
				style={{
					left: `${sliderPosition}%`,
					transform: 'translateX(-50%) translateZ(0)', // GPU acceleration
				}}
			>
				<div
					className='absolute top-1/2 left-1/2 w-10 h-10 sm:w-8 sm:h-8 bg-white rounded-full shadow-lg flex items-center justify-center pointer-events-none will-change-transform'
					style={{ transform: 'translate(-50%, -50%) translateZ(0)' }}
				>
					<div className='flex space-x-0.5 sm:space-x-1'>
						<ChevronLeft className='w-3 h-3 sm:w-3 sm:h-3 text-gray-600' />
						<ChevronRight className='w-3 h-3 sm:w-3 sm:h-3 text-gray-600' />
					</div>
				</div>
			</div>
		</motion.div>
	)
}

export default function BeforeAfterSlider({ items }: BeforeAfterSliderProps) {
	return (
		<div className='w-full max-w-6xl mx-auto px-4 sm:px-0'>
			{/* Simple 2-column Grid */}
			<div className='grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12'>
				{items.map((item, index) => (
					<motion.div
						key={index}
						className='group'
						initial={{ opacity: 0, y: 40 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{
							duration: 0.5,
							delay: index * 0.15,
							ease: 'easeOut',
						}}
					>
						<div className='rounded-xl sm:rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300'>
							<BeforeAfterComparison {...item} />
						</div>
					</motion.div>
				))}
			</div>
		</div>
	)
}
