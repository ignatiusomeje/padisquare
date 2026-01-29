# PadiSquare - E-Commerce Shop Application

## Why These Decisions?

### Next.js App Router
**Why**: Modern routing provides better performance, built-in code splitting, and SEO optimization out of the box. The App Router paradigm is more intuitive than Pages Router for organizing complex applications.

**Decision**: Used dynamic routes with `[shopId]` to support multiple shop instances without duplicating code.

---

### Redux Toolkit + Redux Persist
**Why**: Redux provides a predictable, centralized state management system that makes debugging easier and enables time-travel debugging. Redux Persist automatically maintains state across browser sessions without writing boilerplate code, improving user experience.

**Decision**: Configured to persist shop state (products, search, sort) but excluded RTK Query API cache to avoid stale data, and excluded certain temporary UI states to keep the store clean.

---

### Redux Toolkit Query (RTK Query)
**Why**: RTK Query eliminates manual data fetching logic, handles caching automatically, deduplicates in-flight requests, and generates hooks that integrate seamlessly with Redux. This reduces boilerplate significantly compared to traditional Redux async thunks.

**Decision**: Injected endpoints specifically for product fetching to keep API concerns separated from business logic, making the codebase more maintainable.

---

### Framer Motion for Animations
**Why**: Provides smooth, performant animations that enhance perceived performance and user experience. More efficient than CSS-in-JS solutions and doesn't require heavy animation libraries.

**Decision**: Used for component entrance animations (skeleton loaders → actual content) and interactive button effects to provide visual feedback without compromising performance.

---

### Infinite Scroll Pagination
**Why**: Better UX than traditional pagination, especially on mobile devices. Users expect content to load seamlessly as they scroll. Improves perceived performance by loading data progressively.

**Decision**: Implemented using `react-intersection-observer` to efficiently detect when the user scrolls near the bottom, triggering `useLazyFetchMoreProductsQuery` only when needed.

---

### Debounced Search (500ms)
**Why**: Reduces unnecessary API calls during typing. Without debouncing, each keystroke triggers a request, causing server load, network overhead, and worse user experience.

**Decision**: Set 500ms delay as a balance between responsiveness and server efficiency. Users typically type 4-6 characters per second, so this prevents ~80% of unnecessary requests.

---

### Tailwind CSS + Class Variance Authority
**Why**: Tailwind's utility-first approach enables rapid styling without writing custom CSS. CVA adds component-level abstraction for consistent variant management.

**Decision**: Combined Tailwind with Shadcn/UI components for a cohesive design system that's both fast to develop and maintainable.

---

### Shadcn/UI Components
**Why**: Pre-built, accessible components based on Radix UI primitives. They follow web accessibility standards, are customizable via CSS, and reduce the need to build components from scratch.

**Decision**: Used Input, Select, and Skeleton components to maintain design consistency across the application while keeping development velocity high.

---

### TypeScript
**Why**: Catches bugs at compile time rather than runtime. Provides IDE autocomplete and better developer experience. Makes refactoring safer across a large codebase.

**Decision**: Used strict type checking throughout the application, especially for Redux state shapes and API response types.

---

### React Icons + Lucide React
**Why**: Reduces bundle size compared to including SVGs manually. Provides tree-shakeable icon sets that only include icons actually used in the code.

**Decision**: Used for loading indicators, search icons, and other UI elements to maintain visual consistency.

---

### Skeleton Loaders
**Why**: Perceived performance improvement. Users perceive content loading faster when they see a skeleton placeholder instead of blank space.

**Decision**: Created reusable `ProductCardLoader` and `ProductCardsLoader` components that match product card dimensions exactly to reduce layout shift.

---

### Centralized Error Handling
**Why**: Consistent error messaging across the application. Single source of truth for error formatting and user-friendly messages.

**Decision**: Created `ErrorHandler.ts` to parse API errors and Redux promise rejections into user-readable messages, used by both initial fetch and infinite scroll pagination.

---

### Feature-Based File Organization
**Why**: As the app grows, feature-based organization scales better than file-type organization (components/, pages/, etc.). Related code stays together, making it easier to find and modify features.

**Decision**: Organized shop functionality under `features/shop/` with components, data (Redux), and types colocated, making the shop feature independently manageable.

---

## What Gets Persisted and Why

**Persisted State:**
- Products list
- Search query
- Sort preference
- Pagination offset

**Why**: Users expect their search/sort preferences and product view to persist when they leave and return to the shop. Improves UX.

**Not Persisted:**
- Loading states
- Error states
- RTK Query API cache

**Why**: Loading/error states are transient and should reset. API cache shouldn't persist to avoid showing stale products on app reload.

---

## Performance Optimizations Implemented

1. **Debounced Search** - Reduces API load during typing
2. **Lazy Query Loading** - Products only fetched when needed via infinite scroll
3. **Skeleton Loaders** - Perceived performance improvement during loading
4. **Redux Persist Selective** - Only persists necessary state, keeps store lean
5. **RTK Query Caching** - Automatic deduplication of in-flight requests
6. **Next.js Code Splitting** - Each route loads only necessary code
7. **Intersection Observer** - Efficient infinite scroll detection without scroll event listeners

---

## Trade-Offs Made

- **Redux over Context API**: Added complexity upfront but provides better debugging, middleware support, and performance at scale
- **Infinite Scroll over Pagination**: Better UX but harder to jump to specific pages
- **RTK Query over Direct API Calls**: More opinionated but eliminates massive amounts of boilerplate
- **Tailwind over CSS Modules**: Utility classes sometimes feel verbose but provide consistency and speed
