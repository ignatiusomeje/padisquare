# PadiSquare - E-Commerce Shop Application

## Overview

PadiSquare is a modern, feature-rich e-commerce platform built with Next.js 16, React 19, and Redux Toolkit. It provides a seamless shopping experience with advanced product discovery, real-time search, sorting capabilities, and infinite scrolling for optimal performance.

## Project Architecture

### Tech Stack

- **Frontend Framework**: Next.js 16.1.6 with App Router
- **UI Library**: React 19.2.3
- **State Management**: Redux Toolkit with Redux Persist
- **Styling**: Tailwind CSS 4 with class-variance-authority
- **Animations**: Framer Motion 12.26.2
- **API Communication**: Redux Toolkit Query
- **Type Safety**: TypeScript 5
- **Icons**: Lucide React & React Icons
- **Utilities**: Clsx, use-debounce, react-intersection-observer

### Folder Structure

```
padisquare/
├── app/                          # Next.js app directory
│   ├── layout.tsx               # Root layout with Redux provider
│   ├── page.tsx                 # Homepage
│   ├── StoreProvider.tsx        # Redux store configuration
│   ├── globals.css              # Global styles
│   └── site/
│       └── [shopId]/
│           └── page.tsx         # Dynamic shop page
├── features/                    # Feature modules
│   ├── components/
│   │   ├── NavBar.tsx          # Navigation component
│   │   └── index.ts            # Component exports
│   └── shop/                   # Shop feature module
│       ├── components/
│       │   ├── SingleShop.tsx              # Main shop container
│       │   ├── Header.tsx                  # Hero header section
│       │   ├── ProductCards.tsx           # Product grid with search/sort
│       │   ├── ProductCard.tsx            # Individual product card
│       │   ├── ProductCardLoader.tsx      # Skeleton loader for single card
│       │   ├── ProductCardsLoader.tsx     # Skeleton loader for grid
│       │   ├── ProductNotFound.tsx        # Empty state
│       │   └── ProductError.tsx           # Error state
│       ├── data/
│       │   ├── shopAPI.ts                 # RTK Query endpoints
│       │   └── shopSlice.ts               # Redux slice & state management
│       └── types/
│           └── index.d.ts                 # TypeScript definitions
├── components/                  # Reusable UI components
│   └── ui/
│       ├── input.tsx           # Input field (shadcn/ui)
│       ├── select.tsx          # Select dropdown (shadcn/ui)
│       └── skeleton.tsx        # Skeleton loader (shadcn/ui)
├── store/                      # Global store configuration
│   ├── store.ts               # Redux store setup with persistence
│   ├── hooks.ts               # Custom Redux hooks
│   ├── ShopAPI.ts             # RTK Query API base configuration
│   └── ErrorHandler.ts        # Centralized error handling
├── lib/
│   └── utils.ts               # Utility functions
└── types/
    └── index.d.ts             # Global TypeScript definitions
```

## Key Features Implemented

### 1. **Product Display & Discovery**
- Dynamic product grid displaying items from the backend API
- Responsive design that works on mobile, tablet, and desktop
- Smooth animations and transitions using Framer Motion
- Custom product cards with images, pricing, brand, and availability info

### 2. **Search Functionality**
- Real-time search with debounced input (500ms delay)
- Separate API endpoint for search queries (`/search`)
- Automatic state synchronization with Redux
- Instantly filters products as user types

### 3. **Sorting Options**
- **Recent**: Default sort by creation date (descending)
- **Low to High**: Sort products by price in ascending order
- **High to Low**: Sort products by price in descending order
- Dynamic query parameter generation based on selected sort option

### 4. **Infinite Scroll Pagination**
- Automatically loads more products as user scrolls near bottom
- Uses `react-intersection-observer` to detect when to fetch more
- Prevents duplicate requests and shows loading state
- Gracefully stops when all products are loaded

### 5. **Loading States**
- Skeleton loaders for initial product cards and grid
- Custom loader component for "loading more" state
- Smooth loading indicators provide visual feedback

### 6. **Error Handling**
- Centralized error handling in `ErrorHandler.ts`
- Custom error components that display user-friendly messages
- Graceful fallbacks for network failures
- Redux state tracks error messages

### 7. **Empty/Not Found State**
- Custom component displays when no products match search criteria
- Helps user understand why results are empty

### 8. **State Management**
- Redux Toolkit for centralized state management
- Redux Persist for persisting shop state across sessions
- Separate slices for organized state logic
- RTK Query for efficient data fetching and caching

### 9. **Navigation**
- Dynamic shop routing with `[shopId]` parameter
- NavBar component for brand and navigation
- Hero header section with marketing copy and CTA button

## State Management Details

### Redux Slices

**Shop Slice** (`shopSlice.ts`):
```
- products: Product[] - Array of fetched products
- fetchProductsLoading: boolean - Loading state for initial fetch
- fetchProductsError: string - Error message from fetch
- fetchMoreProductsLoading: boolean - Loading state for pagination
- fetchMoreProductsError: string - Error message from pagination
- skip: number - Current pagination offset
- totalProducts: number - Total products available
- limit: number - Products per page (default: 20)
- search: string - Current search query
- sort: string - Current sort option
```

**Actions**:
- `setSkip()` - Update pagination offset
- `setAppSearch()` - Update search query
- `setAppSort()` - Update sort option

### RTK Query Endpoints

**fetchProducts**: Initial product fetch with search/sort parameters
**fetchMoreProducts**: Lazy-loaded endpoint for pagination

## Data Flow

```
User Input (Search/Sort/Scroll)
    ↓
Redux Action Dispatch
    ↓
State Update (Redux Slice)
    ↓
RTK Query Endpoint Triggered
    ↓
API Request with Updated Params
    ↓
Response Data Merged into State
    ↓
Components Re-render with New Data
```

## Component Hierarchy

```
SingleShop (Main Container)
├── NavBar (Header Navigation)
├── Header (Hero Section)
└── ProductCards (Main Content)
    ├── Search Input
    ├── Sort Dropdown
    ├── ProductCardsLoader (Skeleton Grid - initial load)
    ├── ProductCards Grid
    │   └── ProductCard (Individual Items)
    ├── ProductNotFound (Empty State)
    ├── ProductError (Error State)
    └── Infinite Scroll Trigger
```

## Why These Choices?

### Next.js App Router
- **Why**: Modern routing with better performance, built-in code splitting, and SEO optimization
- **Implementation**: Dynamic routes with `[shopId]` for multiple shops

### Redux Toolkit + Redux Persist
- **Why**: Predictable state management, easy debugging, and automatic session persistence
- **Implementation**: Configured to persist shop state but exclude API cache and certain data

### RTK Query
- **Why**: Built-in caching, automatic request deduplication, and simplified async operations
- **Implementation**: Injected endpoints for products fetching to keep API concerns separated

### Framer Motion
- **Why**: Smooth, performant animations enhance UX without heavy CSS dependencies
- **Implementation**: Used for component entrance animations and interactive button effects

### Infinite Scroll
- **Why**: Better performance than pagination and improved UX for mobile users
- **Implementation**: `react-intersection-observer` detects when user reaches bottom

### Debounced Search
- **Why**: Reduces API calls and server load while typing
- **Implementation**: 500ms delay prevents excessive requests during rapid keystrokes

### Tailwind CSS
- **Why**: Utility-first approach enables rapid, consistent styling without writing custom CSS
- **Implementation**: Combined with class-variance-authority for component-level styling

### Shadcn/UI Components
- **Why**: Pre-built, accessible, and customizable components based on Radix UI
- **Implementation**: Input, Select, and Skeleton components for consistent design

## API Integration

The application communicates with a backend API that provides:

### Endpoints
- `GET /` - Fetch all products with pagination and filtering
- `GET /search` - Search products by query

### Query Parameters
- `limit` - Number of products per page
- `skip` - Pagination offset
- `q` - Search query string
- `sortBy` - Field to sort by (price, meta.createdAt)
- `order` - Sort direction (asc, desc)
- `select` - Fields to include in response

### Response Format
```typescript
{
  products: Product[],
  skip: number,
  total: number
}
```

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view in browser.

### Build for Production
```bash
npm run build
npm start
```

### Linting
```bash
npm run lint
```

## Performance Optimizations

1. **Image Optimization**: Next.js Image component for automatic optimization
2. **Code Splitting**: Automatic route-based code splitting by Next.js
3. **Debounced Search**: Reduces API calls and processing overhead
4. **Skeleton Loaders**: Perceived performance improvement
5. **Redis Persistence**: Maintains state across sessions
6. **Lazy Queries**: `useLazyFetchMoreProductsQuery` for on-demand pagination

## Future Enhancements

- Product filtering by category, brand, price range
- Shopping cart functionality
- User authentication and accounts
- Wishlist feature
- Product reviews and ratings
- Advanced search with filters
- Mobile app version
- Performance metrics and analytics

## Contributing

Follow the existing patterns:
- Keep components focused and single-responsibility
- Use Redux for app-level state
- Create feature modules for scalability
- Use TypeScript for type safety
- Follow Tailwind conventions for styling
