# ☕ Drift Coffee

> **Premium Coffee Cart Booking Platform** — A full-stack MERN application for booking mobile coffee carts for events and weddings across the GCC region.

![Version](https://img.shields.io/badge/version-1.0.0-brown)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![Node](https://img.shields.io/badge/Node.js-20-339933?logo=nodedotjs)
![MongoDB](https://img.shields.io/badge/MongoDB-8-47A248?logo=mongodb)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS_v4-06B6D4?logo=tailwindcss)

---

## ✨ Features

### Public
- **Booking Form** — Full-name, phone with GCC country codes, event country selection, interactive map picker, cup count, sweet option, and notes
- **Interactive Map** — Leaflet-based map for location selection with geolocation support
- **Responsive Design** — Fully mobile-optimized with premium UI/UX
- **Dark / Light Mode** — Persistent theme toggle with smooth transitions
- **Bilingual** — Arabic (RTL) / English (LTR) with i18next

### Admin Dashboard
- **Secure Login** — JWT-based authentication with httpOnly cookies
- **Bookings Management** — View, search, filter, update status, and delete bookings
- **Analytics** — Charts for bookings by country, status distribution, and daily trends (Recharts)
- **Interactive Map View** — See booking locations on map modal

---

## 🛠 Tech Stack

### Frontend
| Technology | Purpose |
|-----------|---------|
| React 19 + Vite | UI framework & build tool |
| React Router DOM v7 | Client-side routing |
| Tailwind CSS v4 | Utility-first styling |
| Framer Motion | Animations & transitions |
| React Leaflet | Interactive map integration |
| Recharts | Dashboard charts & analytics |
| React Hook Form | Form state management |
| React Hot Toast | Toast notifications |
| i18next | Internationalization (AR/EN) |
| Lucide React | Icon library |
| Axios | HTTP client |

### Backend
| Technology | Purpose |
|-----------|---------|
| Node.js + Express | Server & REST API |
| MongoDB + Mongoose | Database & ODM |
| JWT (jsonwebtoken) | Authentication |
| bcrypt | Password hashing |
| Helmet | Security headers |
| express-rate-limit | Rate limiting |
| CORS | Cross-origin support |

---

## 📁 Project Structure

```
drift-coffee/
├── backend/
│   ├── config/         # Database configuration
│   ├── controllers/    # Route handlers
│   ├── middleware/      # Auth & error handling
│   ├── models/         # Mongoose schemas
│   ├── routes/         # Express routes
│   ├── services/       # Business logic
│   ├── utils/          # Helper classes
│   ├── validations/    # Input validation
│   ├── scripts/        # Seed scripts
│   ├── server.js       # Entry point
│   └── package.json
├── frontend/
│   ├── public/         # Static assets
│   ├── src/
│   │   ├── components/ # Reusable components
│   │   │   ├── booking/
│   │   │   ├── dashboard/
│   │   │   ├── layout/
│   │   │   └── ui/
│   │   ├── context/    # React contexts
│   │   ├── hooks/      # Custom hooks
│   │   ├── i18n/       # Translations
│   │   ├── pages/      # Route pages
│   │   └── services/   # API layer
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** 20+
- **MongoDB** 7+ (local or Atlas)
- **npm** 10+

### 1. Clone & Install

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 2. Environment Variables

```bash
# Backend (backend/.env)
cp backend/.env.example backend/.env
```

Edit `backend/.env`:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/drift_coffee
JWT_SECRET=your_super_secret_jwt_key_change_in_production
JWT_EXPIRES_IN=7d
ADMIN_EMAIL=admin@driftcoffee.com
ADMIN_PASSWORD=Admin@123456
CORS_ORIGIN=http://localhost:5173
NODE_ENV=development
```

### 3. Seed Admin User

```bash
cd backend
npm run seed
```

### 4. Run the Project

```bash
# Terminal 1 — Backend
cd backend
npm run dev

# Terminal 2 — Frontend
cd frontend
npm run dev
```

Visit **http://localhost:5173**

### 5. Access Dashboard

Login at `/login` with:
- **Email:** `admin@driftcoffee.com`
- **Password:** `Admin@123456`

---

## 📡 API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/api/bookings` | — | Create a new booking |
| `GET` | `/api/bookings` | ✓ | List all bookings |
| `GET` | `/api/bookings/stats` | ✓ | Dashboard statistics |
| `GET` | `/api/bookings/:id` | ✓ | Get booking details |
| `PATCH` | `/api/bookings/:id` | ✓ | Update booking status |
| `DELETE` | `/api/bookings/:id` | ✓ | Delete a booking |
| `POST` | `/api/auth/login` | — | Admin login |
| `POST` | `/api/auth/logout` | ✓ | Admin logout |
| `GET` | `/api/auth/me` | ✓ | Check auth status |

---

## 🎨 Design System

### Brand Colors
| Color | Hex | Usage |
|-------|-----|-------|
| Coffee 950 | `#1a0f0a` | Darkest bg |
| Coffee 900 | `#2C1810` | Dark bg |
| Coffee 800 | `#3E2218` | Primary |
| Coffee 700 | `#5C3A2A` | Hover |
| Coffee 500 | `#A67B5B` | Accent |
| Coffee 300 | `#D4BFA5` | Light accent |
| Caramel | `#C68E5E` | Highlight |

### Typography
- **Font:** Zain (sans-serif) — imported from Google Fonts
- **Weights:** 300, 400, 700, 800, 900

### Components
- Glassmorphism navbar with backdrop blur
- Smooth card hover effects with scale transform
- Animated form inputs with focus rings
- Skeleton loaders for async content
- Toast notifications with coffee-themed colors
- Responsive grid layouts

---

## 🔒 Security

- JWT stored in httpOnly cookies
- Password hashing with bcrypt (12 rounds)
- Helmet security headers
- Rate limiting on API routes
- Input validation on all endpoints
- CORS configured for frontend origin
- Environment variables for secrets

---

## 🌐 Internationalization

- **Arabic** — Full RTL support with proper typography
- **English** — LTR fallback
- Dynamic language switcher in navbar
- Date formatting adapts to locale
- Persistent language preference in localStorage

---

## 📱 Responsive Breakpoints

| Breakpoint | Width | Behavior |
|-----------|-------|----------|
| Mobile | < 768px | Single column, hamburger menu |
| Tablet | 768–1024px | 2-column grids |
| Desktop | > 1024px | Full layout with charts |

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is proprietary. All rights reserved.

---

<p align="center">Made with ☕ by Drift Coffee Team</p>
# drift_coffee
