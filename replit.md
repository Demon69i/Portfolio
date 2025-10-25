# replit.md

## Overview

This is a personal portfolio website for Imtiaz Mahmud, a cyber security expert. The project is a modern, visually appealing single-page application built with HTML, CSS, JavaScript, and Node.js backend. It features a fully responsive design optimized for all devices (PC, Laptop, Tablet, Phones), smooth animations, 3D effects, modern UI components, and functional email contact form.

## System Architecture

### Frontend Architecture
- **Static Site**: Pure HTML/CSS/JavaScript implementation without any frameworks
- **Single Page Application**: All content is contained within index.html with section-based navigation
- **Responsive Design**: Mobile-first approach with CSS media queries
- **Modern CSS**: Utilizes CSS custom properties, gradients, and advanced styling techniques

### Design System
- **Typography**: Inter and SF Pro Display font families from Google Fonts
- **Color Scheme**: Dark theme with gradient accents (purple to pink gradients)
- **Icons**: Font Awesome 6.4.0 for consistent iconography
- **Animation**: CSS transitions and JavaScript-powered scroll animations
- **Responsive Breakpoints**: 
  - Large Desktop (1920px+)
  - Standard Desktop (1440px - 1919px)
  - Laptop (1024px - 1439px)
  - Tablet Landscape (768px - 1023px)
  - Tablet Portrait/Mobile Landscape (481px - 767px)
  - Mobile Phones (320px - 480px)
  - Extra Small Devices (below 320px)

## Key Components

### Navigation System
- Fixed navigation bar with smooth scrolling
- Mobile-responsive hamburger menu
- Active link highlighting based on scroll position
- Backdrop blur effect for modern glass-morphism aesthetic

### Visual Effects
- **Floating Elements**: Animated background elements for visual interest
- **Gradient Orbs**: Decorative background elements with CSS animations
- **Parallax Effects**: Scroll-based animations for enhanced user experience
- **3D Effects**: CSS transforms for depth and interactivity

### Contact Integration
- **SendGrid Integration**: Full email service for contact form functionality
- **Node.js Backend**: Express server handling email API endpoints
- **Form Handling**: Real-time form submission with success/error states
- **Auto-Reply System**: Automatic confirmation emails to form submitters

## Data Flow

1. **Static Content Delivery**: HTML/CSS/JavaScript served directly to browser
2. **User Interactions**: JavaScript handles navigation, animations, and form submissions
3. **Email Processing**: Contact form data sent via SendGrid API
4. **Visual Updates**: Real-time DOM manipulation for animations and UI feedback

## External Dependencies

### CDN Resources
- **Google Fonts**: Inter and SF Pro Display font families
- **Font Awesome**: Version 6.4.0 for icons

### NPM Dependencies
- **@sendgrid/mail**: Version 8.1.5 for email functionality
- **express**: Web framework for Node.js backend
- **cors**: Cross-origin resource sharing middleware

## Deployment Strategy

### Static Hosting Ready
- No build process required
- Can be deployed to any static hosting service
- Files are production-ready as-is

### Environment Considerations
- SendGrid API key required for contact form functionality
- Responsive design ensures compatibility across devices
- Modern browser features used (backdrop-filter, CSS custom properties)

## Changelog

- October 25, 2025: Enhanced responsive design with comprehensive breakpoints for all device sizes (PC, Laptop, Tablet, Phones)
- October 25, 2025: Changed portfolio from App Developer to Cyber Security Expert
- June 29, 2025: Initial setup

## User Preferences

Preferred communication style: Simple, everyday language.