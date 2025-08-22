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
	title: 'Au Roofing - Professional Roofing Services',
	description:
		'Quality roofing solutions you can trust. Professional roofing services with expert craftsmanship and reliable results.',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en' className={inter.variable}>
			<head>
				<link rel='preconnect' href='https://fonts.googleapis.com' />
				<link
					rel='preconnect'
					href='https://fonts.gstatic.com'
					crossOrigin='anonymous'
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
