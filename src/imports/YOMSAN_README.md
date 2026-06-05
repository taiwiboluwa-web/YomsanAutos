# Yomsan Motors - Premium Car Dealership E-Commerce Platform

A luxury automotive e-commerce platform built with React, TypeScript, Tailwind CSS, and Framer Motion. Featuring live showroom inventory, advanced filtering, and inspection booking system.

## Design Philosophy: Neo-Brutalist Luxury

This platform embodies a sophisticated aesthetic that combines the gallery-like "Architectural Presence" of a premium showroom with the structured, lightning-fast marketplace utility of modern e-commerce platforms.

### Visual Identity

- **Color Palette**: Deep charcoal background (#0a0a0a) with gold accents (#d4af37)
- **Typography**: Poppins (bold, geometric) + Playfair Display (refined, elegant) + Inter (clean, readable)
- **Aesthetic**: Precision borders, minimal bento cards, smooth micro-interactions
- **Animation**: 150-300ms transitions with ease-out curves, respects `prefers-reduced-motion`

## Features

### Core Features

1. **Live Showroom Status**
   - Real-time showroom availability indicator
   - Inventory status badges (Available in Lot, Ready for Inspection, Customs Fully Cleared, Incoming Transit)
   - Quick stats display

2. **Advanced Filtering System**
   - Filter by Body Type (SUV, Sedan, Performance)
   - Filter by Condition (Brand New, Foreign Used)
   - Price range slider (₦10M - ₦50M)
   - Year range selector (2015 - 2024)
   - Instant filter application with smooth transitions

3. **Vehicle Showcase**
   - Image-dominant bento card layout
   - Specs matrix with icons (Engine, Mileage, Transmission, Fuel Type)
   - Real-time pricing in Nigerian Naira
   - Hover effects with scale and shadow animations

4. **Inspection Booking System**
   - Ultra-sleek modal for booking vehicle inspections
   - Auto-populated vehicle details
   - Date and time selection
   - Contact information capture
   - Optional message field

5. **WhatsApp Integration**
   - Direct WhatsApp CTAs on vehicle cards
   - WhatsApp button in navbar
   - Contact CTA section

6. **Responsive Design**
   - Mobile-first approach
   - Adaptive grid layout (1 column mobile → 2 columns tablet → 2 columns desktop)
   - Sticky filter sidebar on desktop
   - Collapsible mobile menu

## Project Structure

```
client/
├── public/
│   └── __manus__/          # Manus runtime files
├── src/
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── ShowroomTicker.tsx
│   │   ├── HeroSection.tsx
│   │   ├── VehicleCard.tsx
│   │   ├── FilterHub.tsx
│   │   └── InspectionBookingModal.tsx
│   ├── pages/
│   │   ├── Home.tsx        # Main inventory page
│   │   └── NotFound.tsx
│   ├── data/
│   │   └── vehicles.ts     # Vehicle inventory data
│   ├── lib/
│   │   ├── utils.ts
│   │   └── formatting.ts   # Utility functions
│   ├── contexts/
│   │   └── ThemeContext.tsx
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css           # Global theme and styles
├── index.html
└── ...

server/                      # Placeholder for future backend
shared/                      # Placeholder for shared types
```

## Theme Configuration

### Dark Mode (Default)

The platform uses a dark theme optimized for luxury automotive presentation:

- **Background**: `#0a0a0a` (Deep charcoal)
- **Card**: `#1a1a1a` (Slightly lighter charcoal)
- **Border**: `#2a2a2a` (Subtle grid lines)
- **Text**: `#ffffff` (Pure white for maximum contrast)
- **Accent**: `#d4af37` (Warm metallic gold)
- **Muted**: `#a0a0a0` (Gray for secondary text)

### Typography

- **Display Headings**: Poppins Bold (700) - 3.5rem
- **Section Titles**: Poppins SemiBold (600) - 1.5rem
- **Car Model Names**: Playfair Display Bold (700) - 2rem
- **Body Text**: Inter Regular (400) - 1rem
- **Small Text**: Inter Regular (400) - 0.875rem

## Component Details

### Navbar
- Fixed header with Yomsan Motors branding
- Navigation links (Inventory, About, Contact)
- WhatsApp CTA button
- Mobile-responsive hamburger menu

### ShowroomTicker
- Live showroom status (Open/Closed)
- Location information
- Quick inventory stats
- Animated pulse indicator

### HeroSection
- Asymmetric layout (60/40 split)
- Featured vehicle showcase image
- Premium copy and value propositions
- Dual CTAs (Explore Inventory, Contact Us)

### VehicleCard
- Image-dominant layout with hover effects
- Status badge with color coding
- Specs matrix (4 key specs displayed)
- Dual CTAs (Book Inspection, WhatsApp)
- Smooth animations on hover

### FilterHub
- Sticky sidebar on desktop
- Checkbox filters for Body Type and Condition
- Range inputs for Price and Year
- Reset button for active filters
- Instant filter application

### InspectionBookingModal
- Centered modal with backdrop blur
- Vehicle preview section
- Form fields: Name, Email, Phone, Date, Time, Message
- Form validation
- Success toast notification
- Smooth entrance/exit animations

## Customization Guide

### Adding New Vehicles

Edit `client/src/data/vehicles.ts`:

```typescript
{
  id: 'unique-id',
  model: 'Model Name',
  brand: 'Brand Name',
  year: 2024,
  price: 25000000,
  condition: 'foreign_used',
  bodyType: 'suv',
  mileage: 0,
  transmission: 'automatic',
  fuelType: 'petrol',
  engine: '3.0L Twin-Turbo V6',
  image: '/manus-storage/image-url.png',
  status: 'available',
  location: 'Egbeda Showroom - Lot X',
  description: 'Vehicle description...',
}
```

### Updating Contact Information

Update the following files:
- `client/src/components/Navbar.tsx` - WhatsApp link
- `client/src/components/HeroSection.tsx` - Contact CTA
- `client/src/pages/Home.tsx` - Footer contact details

### Changing Colors

Edit `client/src/index.css` in the `:root` section:

```css
:root {
  --background: #0a0a0a;
  --accent: #d4af37;
  /* ... other colors ... */
}
```

### Adjusting Filter Ranges

Edit `client/src/components/FilterHub.tsx` and `client/src/pages/Home.tsx`:

```typescript
priceRange: [10000000, 50000000],  // Min and max price in Naira
yearRange: [2015, 2024],           // Min and max year
```

## Performance Optimizations

- Image lazy loading with intersection observer
- Memoized filter calculations
- Smooth animations using GPU-accelerated transforms
- Optimized bundle size with tree-shaking
- Responsive images for different screen sizes

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Deployment

The platform is ready for deployment on Manus hosting or any static hosting provider:

1. Build: `pnpm build`
2. Preview: `pnpm preview`
3. Deploy via Manus UI or export to external hosting

## Future Enhancements

- Backend integration for dynamic inventory management
- User authentication and saved favorites
- Advanced search with AI-powered recommendations
- Vehicle comparison tool
- Trade-in valuation calculator
- Finance/loan calculator
- Customer reviews and ratings
- Virtual showroom tour (360° vehicle views)
- Real-time availability sync
- Payment integration

## Support

For questions or issues, contact Yomsan Motors:
- 📞 +234 700 000 0000
- 📧 info@yosanmotors.com
- 📍 Egbeda, Lagos, Nigeria

---

**Built with ❤️ for Yomsan Motors**
*Quality without compromise*
