# ADmyBRAND Analytics Dashboard

## Overview

This is a full-stack analytics dashboard application built for ADmyBRAND, designed to provide comprehensive insights into marketing campaigns, user analytics, and business metrics. The application features a modern React frontend with a Node.js/Express backend, utilizing PostgreSQL for data persistence and offering real-time analytics visualization.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

The application follows a monorepo structure with clear separation between client, server, and shared components:

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **UI Library**: Shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with CSS variables for theming
- **State Management**: TanStack React Query for server state management
- **Routing**: Wouter for lightweight client-side routing
- **Charts**: Chart.js for data visualization
- **Theme Support**: Light/dark mode with persistent storage

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (@neondatabase/serverless)
- **Session Management**: PostgreSQL-based sessions (connect-pg-simple)
- **Development**: Hot reloading with Vite integration

### Data Layer
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Schema Validation**: Zod schemas generated from Drizzle tables
- **Migration System**: Drizzle-kit for database migrations
- **Connection**: Serverless PostgreSQL connection pooling

## Key Components

### Database Schema
The application uses three main entities:
- **Analytics**: Stores revenue, user metrics, conversions, growth rates, and traffic source data
- **Campaigns**: Manages marketing campaign data including platform, status, impressions, clicks, and spend
- **Activities**: Records system activities and user actions with timestamps and metadata

### API Structure
RESTful API endpoints organized by resource:
- `/api/analytics` - Analytics data retrieval and creation
- `/api/campaigns` - Campaign management operations
- `/api/activities` - Activity logging and retrieval

### Frontend Components
- **Dashboard Layout**: Responsive layout with sidebar navigation and header
- **Metrics Cards**: Key performance indicators with trend indicators
- **Charts**: Interactive charts for data visualization (line, pie, bar charts)
- **Data Tables**: Sortable, filterable campaign data tables
- **Activity Feed**: Real-time activity logging display

### Storage Implementation
Pure in-memory storage approach for simplicity:
- **Memory Storage**: Complete in-memory storage with comprehensive seeded data
- **No Database Required**: Perfect for hackathon deployment and demonstration
- **Persistent Session**: Data persists during application runtime

## Data Flow

1. **Client Request**: React components initiate data requests through TanStack Query
2. **API Layer**: Express routes handle requests and validate data using Zod schemas
3. **Storage Layer**: Storage interface abstracts data access (memory or database)
4. **Response**: JSON data returned to client with error handling
5. **UI Update**: React Query manages cache updates and component re-renders

The application implements optimistic updates and caching strategies to ensure responsive user experience.

## External Dependencies

### Core Framework Dependencies
- **React Ecosystem**: React 18, React DOM, React Query for state management
- **Build Tools**: Vite, TypeScript, ESBuild for production builds
- **UI Framework**: Extensive Radix UI component library, Tailwind CSS

### Backend Dependencies
- **Database**: Drizzle ORM, Neon Database serverless client, PostgreSQL session store
- **Validation**: Zod for runtime type checking and schema validation
- **Utilities**: Various utility libraries for date handling, UUID generation

### Development Tools
- **Replit Integration**: Custom Vite plugins for Replit development environment
- **Error Handling**: Runtime error overlay for development debugging

## Deployment Strategy

### Development Environment
- **Local Development**: Vite dev server with hot module replacement
- **Replit Integration**: Specialized configuration for Replit development environment
- **Environment Variables**: DATABASE_URL required for PostgreSQL connection

### Production Build
- **Frontend**: Vite builds optimized static assets to `dist/public`
- **Backend**: ESBuild bundles server code with external packages excluded
- **Single Command Deploy**: `npm run build` creates production-ready application

### Database Setup
- **Migrations**: `npm run db:push` applies schema changes
- **Connection**: Serverless PostgreSQL connection via environment variable
- **Seeding**: Development data seeding through memory storage implementation

## Recent Updates (January 29, 2025)
- ✅ **Database-Free Operation**: Converted to pure in-memory storage for hackathon deployment
- ✅ **Export Functionality**: Added CSV export for analytics data with automatic file download
- ✅ **Advanced Filtering**: Implemented status and platform filters for campaign data table
- ✅ **Campaign Management**: Added pause/resume/stop actions for campaigns with real-time status updates
- ✅ **Notification System**: Integrated notification center with real-time alerts and updates
- ✅ **Real-time Simulation**: Added live data simulation with configurable update intervals
- ✅ **Performance Metrics**: Advanced goal tracking with progress indicators and trend analysis
- ✅ **Interactive Sidebar**: Functional navigation with toast notifications for different sections
- ✅ **Enhanced UX**: Added loading states, hover effects, and smooth animations throughout
- ✅ **Theme Support**: Fully functional dark/light mode toggle with persistent storage
- ✅ **Data Integrity**: All buttons and interactive elements are now fully functional
- ✅ **Expanded Dataset**: Added more comprehensive sample data for better demonstration

The application is designed to be easily deployable on various platforms with zero external dependencies. Simply run `npm run dev` and the dashboard is ready with comprehensive sample data for demonstration.