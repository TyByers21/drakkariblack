# Drakkari Black - Artist Portfolio Application

## Overview

This is a full-stack artist portfolio application built for "Drakkari Black", featuring a luxury dark theme with red accents. The application serves as a professional showcase with sections for music, appearances, and fan engagement through a contact form system.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized production builds
- **Routing**: Wouter for lightweight client-side routing
- **Styling**: Tailwind CSS with custom luxury color palette and Shadcn/ui components
- **Animations**: Framer Motion and GSAP for sophisticated animations
- **State Management**: TanStack React Query for server state management
- **Form Handling**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM (configured for Neon database)
- **Storage**: Currently using in-memory storage with interface for easy database migration
- **API**: RESTful endpoints for contact form submissions

### UI Component System
- **Design System**: Shadcn/ui with New York variant
- **Theme**: Custom luxury dark theme with deep blacks, crimsons, and gold accents
- **Responsive Design**: Mobile-first approach with Tailwind breakpoints
- **Component Library**: Extensive set of pre-built components (buttons, forms, dialogs, etc.)

## Key Components

### Pages
- **Home**: Hero section with artist branding and call-to-action buttons
- **About**: Artist biography and statistics
- **Listening Lounge**: Music streaming integration and video content
- **Appearances**: Event listings and booking information with calendar integration
- **Merch**: Official merchandise store with product catalog and shopping features
- **Contact**: Professional contact form with event booking capabilities

### Core Features
- **Contact Form System**: Handles inquiries with fields for event details, attendance, and messaging
- **Responsive Navigation**: Mobile-friendly navigation with hamburger menu
- **Animation System**: Text animations and smooth transitions throughout
- **Professional Branding**: Consistent luxury aesthetic with custom fonts and colors
- **Spotify Integration**: Automatic album artwork enhancement for speakeasy setlist using Spotify Web API
- **Calendar Integration**: Add to Calendar functionality for events (Google, Outlook, Yahoo)

### Database Schema
- **Users Table**: Basic user management (username, password)
- **Contact Submissions Table**: Comprehensive form data storage including event details, contact information, and timestamps

## Data Flow

1. **Client-Side Form Submission**: Forms use React Hook Form with Zod validation
2. **API Request**: TanStack React Query handles HTTP requests to Express backend
3. **Server Processing**: Express routes validate data and interact with storage layer
4. **Data Persistence**: Currently in-memory storage, designed for easy PostgreSQL migration
5. **Response Handling**: Client receives success/error feedback via toast notifications

## External Dependencies

### Frontend Dependencies
- **UI Framework**: React ecosystem with modern hooks
- **Styling**: Tailwind CSS with PostCSS processing
- **Component Library**: Radix UI primitives with custom styling
- **Animation Libraries**: Framer Motion and GSAP for advanced animations
- **Form Management**: React Hook Form with Hookform Resolvers
- **HTTP Client**: TanStack React Query for data fetching

### Backend Dependencies
- **Database**: Drizzle ORM with PostgreSQL dialect
- **Validation**: Zod for schema validation
- **Session Management**: Connect-pg-simple for PostgreSQL sessions
- **Development**: TSX for TypeScript execution in development

### Build Tools
- **Bundler**: Vite with React plugin
- **TypeScript**: Full TypeScript support with strict configuration
- **Development**: Hot module replacement and error overlay

## Deployment Strategy

### Development Environment
- **Local Development**: Vite dev server with Express backend
- **Hot Reloading**: Full stack hot reloading with middleware integration
- **Error Handling**: Runtime error modal for development debugging

### Production Build
- **Frontend**: Vite builds optimized React bundle
- **Backend**: ESBuild bundles Express server for production
- **Static Assets**: Served from dist/public directory
- **Environment**: Production mode with optimized settings

### Database Configuration
- **Development**: In-memory storage for rapid prototyping
- **Production Ready**: Drizzle configured for PostgreSQL with migrations
- **Connection**: Environment variable based database URL configuration

## User Preferences

Preferred communication style: Simple, everyday language.

## Changelog

Changelog:
- June 30, 2025. Initial setup