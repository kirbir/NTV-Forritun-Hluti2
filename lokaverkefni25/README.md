# Restaurant Ordering System

A modern, mobile-first restaurant ordering system built with Next.js. The interface is optimized for mobile devices, offering a smooth and intuitive ordering experience.

## Note
This project was created as a semester final project for NTV Programming Course.

## Key Features

- 🎯 Mobile-first design
- 📱 Responsive UI components
- 🎨 Modern, clean interface
- 🛍️ Easy order management
- 📅 Table booking system
- 🔄 Real-time order tracking

## Tech Stack

### Core
- Next.js 14
- React 18
- TypeScript
- Tailwind CSS

### UI Components
- **Swiper** - Interactive image carousel for the homepage
- **shadcn/ui Components**
  - Drawer - Bottom sheet for order lookup
  - Calendar - Date picker for table bookings
  - Button - Customizable button components
  - Progress - Loading and progress indicators
- **Radix UI** - Accessible UI primitives (used by shadcn/ui)
- **Vaul** - Drawer component library

### Backend
- **Express.js API Server**
  - Order management endpoints
  - Table booking system
  - Email notifications
  - Order status updates

## API Endpoints

```
/api/orders
  POST   / - Create new order
  GET    / - Get all orders
  GET    /:id - Get order by ID
  PUT    /:id - Update order status
  DELETE /:id - Cancel order

/api/bookings
  POST   / - Create new booking
  GET    / - Get all bookings
  GET    /:id - Get booking by ID
  PUT    /:id - Update booking
  DELETE /:id - Cancel booking
```

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Run API server (in a separate terminal)
cd orders-api
npm install
npm run dev
```

Visit `http://localhost:3000` to view the project. For the best experience, view on a mobile device or use mobile view in your browser.

