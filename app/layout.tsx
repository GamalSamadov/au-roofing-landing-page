import type React from 'react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-inter',
})

export const metadata: Metadata = {
	metadataBase: new URL('https://auroofing.net.au'),
	title: {
		default:
			'Au Roofing - Professional Roofing Services | Expert Roof Repair & Installation',
		template: '%s | Au Roofing - Professional Roofing Services',
	},
	description:
		'Expert roofing services with 20+ years of experience. Quality roof repair, installation, and maintenance. Licensed, insured, and trusted by homeowners. Free estimates available.',
	keywords: [
		'roofing services',
		'roof repair',
		'roof installation',
		'roofing contractor',
		'roof maintenance',
		'emergency roof repair',
		'residential roofing',
		'commercial roofing',
		'roof inspection',
		'roof replacement',
		'professional roofer',
		'licensed roofing',
		'insured roofing contractor',
		'quality roofing',
		'roofing experts',
		'storm damage repair',
		'leak repair',
		'gutter services',
	],
	authors: [{ name: 'Au Roofing Team' }],
	creator: 'Au Roofing',
	publisher: 'Au Roofing',
	category: 'Home Improvement',
	classification: 'Business',
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			'max-video-preview': -1,
			'max-image-preview': 'large',
			'max-snippet': -1,
		},
	},
	openGraph: {
		type: 'website',
		locale: 'en_AU',
		url: 'https://auroofing.net.au',
		siteName: 'Au Roofing - Professional Roofing Services',
		title:
			'Au Roofing - Professional Roofing Services | Expert Roof Repair & Installation',
		description:
			'Expert roofing services with 10+ years of experience. Quality roof repair, installation, and maintenance. Licensed, insured, and trusted by homeowners.',
		images: [
			{
				url: '/beautiful-orange-roof.png',
				width: 1200,
				height: 630,
				alt: 'Au Roofing - Professional roof installation and repair services',
				type: 'image/png',
			},
			{
				url: '/completed-house-orange-roof.png',
				width: 800,
				height: 600,
				alt: 'Completed roofing project by Au Roofing',
				type: 'image/png',
			},
		],
	},
	alternates: {
		canonical: 'https://auroofing.net.au',
		languages: {
			'en-AU': 'https://auroofing.net.au',
		},
	},
	verification: {
		google: 'google-site-verification-code-here',
	},
	other: {
		'apple-mobile-web-app-capable': 'yes',
		'apple-mobile-web-app-status-bar-style': 'default',
		'apple-mobile-web-app-title': 'Au Roofing',
		'application-name': 'Au Roofing',
		'mobile-web-app-capable': 'yes',
		'msapplication-TileColor': '#2563eb',
		'msapplication-config': '/browserconfig.xml',
		'theme-color': '#2563eb',
	},
}

export const viewport = {
	width: 'device-width',
	initialScale: 1,
	maximumScale: 1,
	themeColor: '#2563eb',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en' className={inter.variable}>
			<head>
				{/* DNS Prefetch for better performance */}
				<link rel='dns-prefetch' href='//fonts.googleapis.com' />
				<link rel='dns-prefetch' href='//fonts.gstatic.com' />
				<link rel='dns-prefetch' href='//maps.googleapis.com' />

				{/* Preconnect for critical resources */}
				<link rel='preconnect' href='https://fonts.googleapis.com' />
				<link
					rel='preconnect'
					href='https://fonts.gstatic.com'
					crossOrigin='anonymous'
				/>

				{/* Favicon and app icons */}
				<link rel='icon' href='/favicon.ico' sizes='32x32' />
				<link rel='icon' href='/favicon.svg' type='image/svg+xml' />
				<link rel='apple-touch-icon' href='/apple-touch-icon.png' />
				<link rel='manifest' href='/manifest.json' />

				{/* Theme and browser specific */}
				<meta name='theme-color' content='#2563eb' />
				<meta name='color-scheme' content='light' />
				<meta name='format-detection' content='telephone=yes' />
				<meta name='format-detection' content='address=yes' />

				{/* Security headers */}
				<meta httpEquiv='X-Content-Type-Options' content='nosniff' />
				<meta httpEquiv='X-Frame-Options' content='DENY' />
				<meta httpEquiv='X-XSS-Protection' content='1; mode=block' />

				{/* Performance hints */}
				<link
					rel='preload'
					href='/beautiful-orange-roof.png'
					as='image'
					type='image/png'
				/>

				{/* Schema.org structured data */}
				<script
					type='application/ld+json'
					dangerouslySetInnerHTML={{
						__html: JSON.stringify({
							'@context': 'https://schema.org',
							'@type': 'LocalBusiness',
							'@id': 'https://auroofing.net.au/#business',
							name: 'Au Roofing',
							description:
								'Professional roofing services with expert craftsmanship and reliable results',
							url: 'https://auroofing.net.au',
							telephone: '+61-XXX-XXX-XXX',
							email: 'info@auroofing.net.au',
							address: {
								'@type': 'PostalAddress',
								streetAddress: 'Your Street Address',
								addressLocality: 'Your City',
								addressRegion: 'Your State',
								postalCode: 'XXXX',
								addressCountry: 'AU',
							},
							geo: {
								'@type': 'GeoCoordinates',
								latitude: '-33.8688',
								longitude: '151.2093',
							},
							openingHours: ['Mo-Sa 07:00-19:00'],
							sameAs: [
								'https://www.facebook.com/auroofing',
								'https://www.instagram.com/auroofing',
								'https://www.linkedin.com/company/auroofing',
							],
							priceRange: '$$',
							serviceArea: {
								'@type': 'GeoCircle',
								geoMidpoint: {
									'@type': 'GeoCoordinates',
									latitude: '40.7128',
									longitude: '-74.0060',
								},
								geoRadius: '50000',
							},
							hasOfferCatalog: {
								'@type': 'OfferCatalog',
								name: 'Roofing Services',
								itemListElement: [
									{
										'@type': 'Offer',
										itemOffered: {
											'@type': 'Service',
											name: 'Roof Repair',
											description: 'Professional roof repair services',
										},
									},
									{
										'@type': 'Offer',
										itemOffered: {
											'@type': 'Service',
											name: 'Roof Installation',
											description: 'New roof installation services',
										},
									},
									{
										'@type': 'Offer',
										itemOffered: {
											'@type': 'Service',
											name: 'Roof Maintenance',
											description: 'Regular roof maintenance and inspection',
										},
									},
								],
							},
							aggregateRating: {
								'@type': 'AggregateRating',
								ratingValue: '4.9',
								reviewCount: '127',
								bestRating: '5',
								worstRating: '1',
							},
						}),
					}}
				/>

				<style>{`
          :root {
            --font-heading: ${inter.style.fontFamily};
            --font-body: ${inter.style.fontFamily};
          }
        `}</style>
			</head>
			<body className='font-body antialiased'>{children}</body>
		</html>
	)
}
