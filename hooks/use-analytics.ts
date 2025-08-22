import { useEffect } from 'react'

// Type declarations for global analytics
declare global {
	interface Window {
		gtag?: (command: string, targetId: string, config?: any) => void
	}
}

export function usePageTracking() {
	useEffect(() => {
		// Google Analytics page view tracking
		if (typeof window !== 'undefined' && window.gtag) {
			window.gtag('config', 'GA_MEASUREMENT_ID', {
				page_title: document.title,
				page_location: window.location.href,
			})
		}
	}, [])
}

export function usePerformance() {
	useEffect(() => {
		// Report Core Web Vitals (install with: npm install web-vitals)
		if (typeof window !== 'undefined') {
			// Basic performance monitoring without external dependency
			try {
				if ('performance' in window) {
					const navigation = performance.getEntriesByType(
						'navigation'
					)[0] as PerformanceNavigationTiming
					console.log(
						'Page Load Time:',
						navigation.loadEventEnd - navigation.fetchStart
					)
				}
			} catch (error) {
				console.log('Performance monitoring not available')
			}
		}
	}, [])
}
