'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
	Sheet,
	SheetContent,
	SheetTrigger,
	SheetTitle,
} from '@/components/ui/sheet'
import {
	Phone,
	Mail,
	MapPin,
	Shield,
	Wrench,
	Clock,
	Menu,
	ExternalLink,
} from 'lucide-react'
import Image from 'next/image'
import { domAnimation, LazyMotion, m } from 'motion/react'
import { useState, useEffect } from 'react'
import BeforeAfterSlider from '@/components/before-after-slider'

const fadeInUp = {
	initial: { opacity: 0, y: 60 },
	animate: { opacity: 1, y: 0 },
	transition: { duration: 0.6, ease: 'easeOut' },
}

const fadeInLeft = {
	initial: { opacity: 0, x: -60 },
	animate: { opacity: 1, x: 0 },
	transition: { duration: 0.6, ease: 'easeOut' },
}

const fadeInRight = {
	initial: { opacity: 0, x: 60 },
	animate: { opacity: 1, x: 0 },
	transition: { duration: 0.6, ease: 'easeOut' },
}

const staggerContainer = {
	animate: {
		transition: {
			staggerChildren: 0.1,
		},
	},
}

export default function HomePage() {
	const [isMenuOpen, setIsMenuOpen] = useState(false)

	const menuItems = ['Home', 'Services', 'Gallery', 'Contact']

	// Before/After data for the slider
	const beforeAfterData = [
		{
			before: '/before-1.png',
			after: '/after-1.png',
		},
		{
			before: '/before-3.png',
			after: '/after-3.png',
		},
		{
			before: '/before-4.png',
			after: '/after-4.png',
		},
		{
			before: '/before-5.png',
			after: '/after-5.png',
		},
	]

	// Handle body scroll when mobile menu is open
	useEffect(() => {
		if (isMenuOpen) {
			// Save current scroll position
			const scrollY = window.scrollY
			document.body.style.overflow = 'hidden'
			document.body.style.position = 'fixed'
			document.body.style.top = `-${scrollY}px`
			document.body.style.width = '100%'
		} else {
			// Restore scroll position
			const scrollY = document.body.style.top
			document.body.style.overflow = ''
			document.body.style.position = ''
			document.body.style.top = ''
			document.body.style.width = ''
			if (scrollY) {
				window.scrollTo(0, parseInt(scrollY || '0') * -1)
			}
		}

		return () => {
			document.body.style.overflow = ''
			document.body.style.position = ''
			document.body.style.top = ''
			document.body.style.width = ''
		}
	}, [isMenuOpen])

	return (
		<LazyMotion features={domAnimation}>
			<div className='min-h-screen bg-background'>
				{/* Header */}
				<m.header
					className='fixed top-0 left-0 right-0 z-50 glass-nav bg-background/80 backdrop-blur-lg border-b border-border/20 supports-[backdrop-filter]:bg-background/60'
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
				>
					<div className='max-w-6xl mx-auto px-4 sm:px-6'>
						<div className='flex justify-between items-center h-14 sm:h-16 lg:h-20'>
							<m.div
								className='flex items-center'
								whileHover={{ scale: 1.05 }}
								transition={{ type: 'spring', stiffness: 300 }}
							>
								<Image
									src='/logo.jpg'
									alt='Au Roofing Logo'
									width={500}
									height={500}
									className='h-8 sm:h-10 lg:h-14 w-auto'
								/>
							</m.div>

							{/* Desktop Navigation */}
							<nav className='hidden md:flex space-x-8 lg:space-x-12'>
								{menuItems.map((item, index) => (
									<m.a
										key={item}
										href={`#${item.toLowerCase()}`}
										className='text-foreground hover:text-primary transition-colors font-medium text-sm tracking-wide'
										initial={{ opacity: 0, y: -10 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ delay: index * 0.1 + 0.2 }}
										whileHover={{ y: -2 }}
									>
										{item}
									</m.a>
								))}
							</nav>

							{/* Desktop Call Button */}
							<m.div
								className='hidden md:block'
								initial={{ opacity: 0, scale: 0.8 }}
								animate={{ opacity: 1, scale: 1 }}
								transition={{ delay: 0.3 }}
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
							>
								<Button className='bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg'>
									<Phone className='w-4 h-4 mr-2' />
									Call Now
								</Button>
							</m.div>

							{/* Mobile Menu Button */}
							<div className='md:hidden flex items-center'>
								<Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
									<SheetTrigger asChild>
										<Button
											variant='ghost'
											size='sm'
											className='z-50 relative hover:bg-primary/10 p-2'
											aria-label='Open menu'
										>
											<Menu className='h-6 w-6 text-foreground' />
										</Button>
									</SheetTrigger>
									<SheetContent
										side='right'
										className='w-64 bg-background/95 backdrop-blur-lg border-l border-border/30 z-[60]'
									>
										<SheetTitle className='sr-only'>Navigation Menu</SheetTitle>
										<div className='flex flex-col space-y-6 mt-8 px-2'>
											<div className='flex items-center justify-between mb-4'>
												<h3 className='text-lg font-semibold text-foreground'>
													Menu
												</h3>
											</div>
											{menuItems.map((item, index) => (
												<m.a
													key={item}
													href={`#${item.toLowerCase()}`}
													className='mobile-menu-item text-foreground hover:text-primary transition-colors font-medium text-lg py-2 px-4 rounded-lg hover:bg-primary/10 block'
													onClick={() => setIsMenuOpen(false)}
													initial={{ opacity: 0, x: 20 }}
													animate={{ opacity: 1, x: 0 }}
													transition={{ delay: index * 0.1 }}
													whileHover={{ x: 4 }}
												>
													{item}
												</m.a>
											))}
											<m.div
												initial={{ opacity: 0, y: 20 }}
												animate={{ opacity: 1, y: 0 }}
												transition={{ delay: 0.4 }}
												className='pt-4'
											>
												<Button
													className='bg-primary hover:bg-primary/90 text-primary-foreground mt-6 w-full'
													onClick={() => setIsMenuOpen(false)}
												>
													<Phone className='w-4 h-4 mr-2' />
													Call Now
												</Button>
											</m.div>
										</div>
									</SheetContent>
								</Sheet>
							</div>
						</div>
					</div>
				</m.header>

				{/* Hero Section */}
				<section
					id='home'
					className='pt-20 sm:pt-24 lg:pt-28 pb-12 sm:pb-16 lg:pb-24'
				>
					<div className='max-w-6xl mx-auto px-4 sm:px-6'>
						<div className='grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center'>
							<m.div
								initial='initial'
								animate='animate'
								variants={staggerContainer}
								className='text-center lg:text-left'
							>
								<m.h1
									className='font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black text-foreground mb-4 sm:mb-6 lg:mb-8 leading-tight'
									variants={fadeInLeft}
								>
									Quality Roofing
									<span className='text-primary block'>Solutions</span>
								</m.h1>
								<m.p
									className='text-base sm:text-lg lg:text-xl text-muted-foreground mb-6 sm:mb-8 lg:mb-12 leading-relaxed max-w-lg mx-auto lg:mx-0'
									variants={fadeInLeft}
								>
									Professional roofing services with expert craftsmanship and
									reliable results.
								</m.p>
								<m.div
									className='flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center lg:justify-start'
									variants={fadeInLeft}
								>
									<m.div
										whileHover={{ scale: 1.05 }}
										whileTap={{ scale: 0.95 }}
									>
										<Button
											size='lg'
											className='bg-primary hover:bg-primary/90 text-primary-foreground shadow-xl px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg w-full sm:w-auto'
										>
											Get Free Estimate
										</Button>
									</m.div>
									<m.div
										whileHover={{ scale: 1.05 }}
										whileTap={{ scale: 0.95 }}
									>
										<Button
											size='lg'
											variant='outline'
											className='border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg w-full sm:w-auto'
										>
											View Our Work
										</Button>
									</m.div>
								</m.div>
							</m.div>
							<m.div
								className='relative order-first lg:order-last'
								variants={fadeInRight}
								initial='initial'
								animate='animate'
							>
								<m.div
									whileHover={{ scale: 1.02 }}
									transition={{ type: 'spring', stiffness: 300 }}
								>
									<img
										src='/landing.jpg'
										alt='Professional roofing work'
										className='rounded-xl sm:rounded-2xl shadow-2xl w-full h-auto max-h-64 sm:max-h-96 lg:max-h-none object-cover'
									/>
								</m.div>
							</m.div>
						</div>
					</div>
				</section>

				{/* Services Section */}
				<section id='services' className='py-16 sm:py-24 lg:py-32 bg-card/50'>
					<div className='max-w-6xl mx-auto px-4 sm:px-6'>
						<m.div
							className='text-center mb-12 sm:mb-16 lg:mb-20'
							initial={{ opacity: 0, y: 40 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.6 }}
						>
							<h2 className='font-heading text-3xl sm:text-4xl lg:text-5xl font-black text-foreground mb-4 sm:mb-6'>
								Our Services
							</h2>
							<p className='text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto'>
								Comprehensive roofing solutions for your property
							</p>
						</m.div>

						<m.div
							className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8'
							variants={staggerContainer}
							initial='initial'
							whileInView='animate'
							viewport={{ once: true }}
						>
							{[
								{
									icon: Shield,
									title: 'Roof Replacement',
									desc: 'Complete roof replacement with high-quality materials and professional installation.',
								},
								{
									icon: Wrench,
									title: 'Roof Repair',
									desc: 'Expert repair services for leaks, damaged shingles, and structural issues.',
								},
								{
									icon: Clock,
									title: 'Emergency Services',
									desc: '24/7 emergency roofing services for urgent repairs and storm damage.',
								},
							].map((service, index) => (
								<m.div
									key={service.title}
									variants={fadeInUp}
									whileHover={{ y: -8, scale: 1.02 }}
									transition={{ type: 'spring', stiffness: 300 }}
								>
									<Card className='bg-card border-border/20 hover:shadow-2xl transition-all duration-300 h-full'>
										<CardContent className='p-4 sm:p-6 lg:p-8 text-center'>
											<m.div
												whileHover={{ rotate: 360 }}
												transition={{ duration: 0.6 }}
											>
												<service.icon className='w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 text-primary mb-3 sm:mb-4 lg:mb-6 mx-auto' />
											</m.div>
											<h3 className='font-heading text-lg sm:text-xl lg:text-2xl font-bold text-card-foreground mb-2 sm:mb-3 lg:mb-4'>
												{service.title}
											</h3>
											<p className='text-muted-foreground leading-relaxed text-sm sm:text-base'>
												{service.desc}
											</p>
										</CardContent>
									</Card>
								</m.div>
							))}
						</m.div>
					</div>
				</section>

				{/* Before/After Gallery */}
				<section id='gallery' className='py-16 sm:py-24 lg:py-32'>
					<div className='max-w-6xl mx-auto px-4 sm:px-6'>
						<m.div
							initial={{ opacity: 0, y: 60 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.8, delay: 0.2 }}
						>
							<BeforeAfterSlider items={beforeAfterData} />
						</m.div>

						{/* Additional Info */}
						<m.div
							className='mt-12 sm:mt-16 text-center'
							initial={{ opacity: 0 }}
							whileInView={{ opacity: 1 }}
							viewport={{ once: true }}
							transition={{ duration: 0.6, delay: 0.4 }}
						>
							<p className='text-muted-foreground mb-6'>
								Drag the slider to see the incredible transformations we've
								achieved for our clients
							</p>
							<m.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
								<Button
									size='lg'
									className='bg-primary hover:bg-primary/90 text-primary-foreground shadow-xl px-6 sm:px-8 py-3 sm:py-4'
								>
									View More Projects
								</Button>
							</m.div>
						</m.div>
					</div>
				</section>

				{/* Contact Section */}
				<section id='contact' className='py-12 sm:py-16 lg:py-24 bg-card/50'>
					<div className='max-w-6xl mx-auto px-4 sm:px-6'>
						<div className='grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16'>
							<m.div
								initial={{ opacity: 0, x: -60 }}
								whileInView={{ opacity: 1, x: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 0.6 }}
								className='text-center lg:text-left order-2 lg:order-1'
							>
								<h2 className='font-heading text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-black text-foreground mb-4 sm:mb-6 lg:mb-8'>
									Get In Touch
								</h2>
								<p className='text-base sm:text-lg lg:text-xl text-muted-foreground mb-6 sm:mb-8 lg:mb-12'>
									Ready to protect your home with quality roofing? Contact us
									today.
								</p>

								{/* Contact Cards Grid for Mobile */}
								<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 sm:gap-6 mb-8 sm:mb-12'>
									{[
										{
											icon: Phone,
											title: 'Call Us',
											info: '(555) 123-ROOF',
											action: 'tel:+15551237663',
										},
										{
											icon: Mail,
											title: 'Email',
											info: 'info@auroofing.com',
											action: 'mailto:info@auroofing.com',
										},
										{
											icon: MapPin,
											title: 'Service Area',
											info: 'Local area and surrounding regions',
											action: 'https://maps.app.goo.gl/YJHkYw81zseTfb9E6',
										},
									].map((contact, index) => (
										<m.a
											key={contact.title}
											href={contact.action}
											target={
												contact.action.startsWith('http') ? '_blank' : undefined
											}
											rel={
												contact.action.startsWith('http')
													? 'noopener noreferrer'
													: undefined
											}
											className='block'
											initial={{ opacity: 0, y: 20 }}
											whileInView={{ opacity: 1, y: 0 }}
											viewport={{ once: true }}
											transition={{ delay: index * 0.1 }}
											whileHover={{ scale: 1.02, y: -4 }}
											whileTap={{ scale: 0.98 }}
										>
											<div className='bg-white/80 backdrop-blur-sm rounded-xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20 text-center lg:text-left'>
												<contact.icon className='w-8 h-8 sm:w-10 sm:h-10 text-primary mb-3 sm:mb-4 mx-auto lg:mx-0' />
												<h3 className='font-semibold text-foreground text-base sm:text-lg mb-1'>
													{contact.title}
												</h3>
												<p className='text-muted-foreground text-sm sm:text-base'>
													{contact.info}
												</p>
											</div>
										</m.a>
									))}
								</div>

								<m.div
									className='flex justify-center lg:justify-start'
									initial={{ opacity: 0, y: 20 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true }}
									transition={{ delay: 0.3 }}
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}
								>
									<Button
										size='lg'
										className='bg-primary hover:bg-primary/90 text-primary-foreground shadow-xl px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg w-full sm:w-auto min-h-[48px]'
									>
										Schedule Free Consultation
									</Button>
								</m.div>
							</m.div>

							{/* Professional Location Card */}
							<m.div
								className='relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-50 via-white to-blue-50/30 border border-slate-200/50 shadow-2xl order-1 lg:order-2'
								initial={{ opacity: 0, x: 60 }}
								whileInView={{ opacity: 1, x: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 0.6 }}
							>
								{/* Background Pattern */}
								<div className='absolute inset-0 bg-gradient-to-br from-primary/[0.02] via-transparent to-blue-500/[0.03]' />
								<div className='absolute top-0 right-0 w-64 h-64 bg-gradient-radial from-primary/5 to-transparent' />
								<div className='absolute bottom-0 left-0 w-48 h-48 bg-gradient-radial from-blue-400/5 to-transparent' />

								<div className='relative z-10 p-6 sm:p-8 lg:p-12'>
									{/* Header */}
									<div className='text-center mb-8 lg:mb-12'>
										<m.h3
											className='font-heading text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-3'
											initial={{ opacity: 0, y: 20 }}
											whileInView={{ opacity: 1, y: 0 }}
											viewport={{ once: true }}
											transition={{ delay: 0.1 }}
										>
											Visit Our Location
										</m.h3>
										<m.p
											className='text-slate-600 text-base lg:text-lg max-w-md mx-auto'
											initial={{ opacity: 0, y: 20 }}
											whileInView={{ opacity: 1, y: 0 }}
											viewport={{ once: true }}
											transition={{ delay: 0.2 }}
										>
											Professional roofing services at your convenience
										</m.p>
									</div>

									{/* Interactive Map Area */}
									<m.div
										className='relative group cursor-pointer mb-8 lg:mb-10'
										initial={{ opacity: 0, scale: 0.95 }}
										whileInView={{ opacity: 1, scale: 1 }}
										viewport={{ once: true }}
										transition={{ delay: 0.3, duration: 0.5 }}
										whileHover={{ scale: 1.02 }}
									>
										<div className='aspect-[16/10] lg:aspect-[16/9] bg-gradient-to-br from-white to-slate-100 rounded-2xl border-2 border-slate-200/60 overflow-hidden shadow-lg group-hover:shadow-xl transition-all duration-500'>
											{/* Map Content */}
											<div className='w-full h-full relative flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100'>
												{/* Decorative Grid */}
												<div className='absolute inset-0 opacity-30'>
													<div
														className='w-full h-full'
														style={{
															backgroundImage: `
															linear-gradient(rgba(148, 163, 184, 0.1) 1px, transparent 1px),
															linear-gradient(90deg, rgba(148, 163, 184, 0.1) 1px, transparent 1px)
														`,
															backgroundSize: '20px 20px',
														}}
													/>
												</div>

												{/* Center Content */}
												<div className='relative z-10 text-center group-hover:transform group-hover:scale-105 transition-transform duration-300 px-4 py-6 lg:px-8 lg:py-8'>
													<div className='bg-gradient-to-br from-primary/10 to-blue-500/10 rounded-full p-6 lg:p-8 w-24 h-24 lg:w-32 lg:h-32 mx-auto mb-4 lg:mb-6 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300 border border-primary/20'>
														<MapPin className='w-12 h-12 lg:w-16 lg:h-16 text-primary drop-shadow-sm' />
													</div>
													<h4 className='font-bold text-slate-800 text-lg lg:text-xl mb-3 lg:mb-4 px-2'>
														Our Service Center
													</h4>
													<p className='text-slate-600 text-sm lg:text-base px-2 lg:px-4 leading-relaxed'>
														Professional roofing headquarters
													</p>
												</div>

												{/* Corner Indicators */}
												<div className='absolute top-4 left-4 w-3 h-3 bg-green-400 rounded-full animate-pulse' />
												<div className='absolute top-4 right-4 w-2 h-2 bg-blue-400 rounded-full' />
												<div className='absolute bottom-4 left-4 w-2 h-2 bg-orange-400 rounded-full' />
											</div>
										</div>
									</m.div>

									{/* Info Cards */}
									<div className='grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6 mb-8 lg:mb-10'>
										<m.div
											className='bg-white/80 backdrop-blur-sm rounded-xl p-4 lg:p-6 border border-slate-200/50 shadow-sm hover:shadow-md transition-all duration-300'
											initial={{ opacity: 0, y: 20 }}
											whileInView={{ opacity: 1, y: 0 }}
											viewport={{ once: true }}
											transition={{ delay: 0.4 }}
											whileHover={{ y: -2 }}
										>
											<div className='flex items-center mb-3'>
												<div className='w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3'>
													<Clock className='w-5 h-5 text-green-600' />
												</div>
												<div>
													<p className='text-xs lg:text-sm font-medium text-slate-500 uppercase tracking-wider'>
														Business Hours
													</p>
													<p className='font-bold text-slate-800 text-sm lg:text-base'>
														Mon-Sat: 7AM - 7PM
													</p>
												</div>
											</div>
										</m.div>

										<m.div
											className='bg-white/80 backdrop-blur-sm rounded-xl p-4 lg:p-6 border border-slate-200/50 shadow-sm hover:shadow-md transition-all duration-300'
											initial={{ opacity: 0, y: 20 }}
											whileInView={{ opacity: 1, y: 0 }}
											viewport={{ once: true }}
											transition={{ delay: 0.5 }}
											whileHover={{ y: -2 }}
										>
											<div className='flex items-center mb-3'>
												<div className='w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3'>
													<MapPin className='w-5 h-5 text-blue-600' />
												</div>
												<div>
													<p className='text-xs lg:text-sm font-medium text-slate-500 uppercase tracking-wider'>
														Service Area
													</p>
													<p className='font-bold text-slate-800 text-sm lg:text-base'>
														Metro & Surrounding
													</p>
												</div>
											</div>
										</m.div>
									</div>

									{/* Action Button */}
									<m.div
										initial={{ opacity: 0, y: 20 }}
										whileInView={{ opacity: 1, y: 0 }}
										viewport={{ once: true }}
										transition={{ delay: 0.6 }}
									>
										<m.a
											href='https://maps.app.goo.gl/YJHkYw81zseTfb9E6'
											target='_blank'
											rel='noopener noreferrer'
											className='block'
											whileHover={{ scale: 1.02 }}
											whileTap={{ scale: 0.98 }}
										>
											<Button
												size='lg'
												className='w-full bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 text-white font-bold py-4 lg:py-5 text-base lg:text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border-0'
											>
												<MapPin className='w-5 h-5 lg:w-6 lg:h-6 mr-3' />
												Open in Google Maps
												<ExternalLink className='w-4 h-4 lg:w-5 lg:h-5 ml-3 opacity-70' />
											</Button>
										</m.a>
									</m.div>
								</div>
							</m.div>
						</div>
					</div>
				</section>

				{/* Footer */}
				<m.footer
					className='bg-foreground text-background py-12 sm:py-16'
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6 }}
				>
					<div className='max-w-6xl mx-auto px-4 sm:px-6'>
						<div className='text-center'>
							<m.div
								whileHover={{ scale: 1.05 }}
								transition={{ type: 'spring', stiffness: 300 }}
							>
								<Image
									src='/logo.jpg'
									alt='Au Roofing Logo'
									width={160}
									height={80}
									className='h-10 sm:h-12 lg:h-16 w-auto mb-3 sm:mb-4 lg:mb-6 brightness-0 invert mx-auto'
								/>
							</m.div>
							<p className='text-background/80 text-sm sm:text-base lg:text-lg mb-4 sm:mb-6 lg:mb-8 max-w-2xl mx-auto px-4'>
								Professional roofing services with quality craftsmanship and
								reliable results.
							</p>
							<div className='border-t border-background/20 pt-4 sm:pt-6 lg:pt-8'>
								<p className='text-background/60 text-xs sm:text-sm lg:text-base px-4'>
									&copy; 2025 Au Roofing. All rights reserved. Licensed &
									Insured.
								</p>
							</div>
						</div>
					</div>
				</m.footer>
			</div>
		</LazyMotion>
	)
}
