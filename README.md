# Barbershop Frontend

A modern, responsive frontend application for a barbershop/salon booking platform built with SvelteKit, featuring a public-facing website and an admin panel for content management.

## Features

### Public Website
- **Services Showcase** - Display barbershop services and pricing
- **Gallery** - Photo gallery showcasing work and atmosphere
- **Reviews & Feedback** - Customer testimonials and feedback system
- **Contact Information** - Location with Yandex Maps integration
- **Social Media Integration** - Connected social media presence
- **Online Booking** - YClients widget integration for appointment scheduling

### Admin Panel
- Content management for:
  - Services
  - Gallery images
  - Customer feedback/reviews
  - Contact information
  - Social media links
  - SEO settings
- Secure authentication system
- Image upload and management

## Tech Stack

- **Framework**: [SvelteKit](https://kit.svelte.dev/) v2
- **Language**: TypeScript
- **Styling**: TailwindCSS v4
- **UI Components**:
  - [bits-ui](https://www.bits-ui.com/)
  - [shadcn-svelte](https://www.shadcn-svelte.com/) (via components.json)
- **Form Handling**:
  - [Formsnap](https://formsnap.dev/)
  - [Sveltekit Superforms](https://superforms.rocks/)
- **Maps**: Yandex Maps API
- **Build Tool**: Vite v7
- **Deployment**: Docker-ready with multi-stage builds

## Architecture

This project follows [Feature-Sliced Design](https://feature-sliced.design/) (FSD) methodology:

```
src/
├── app/          # Application initialization
├── entities/     # Business entities (auth, services, gallery, etc.)
├── features/     # User interactions and business features
├── widgets/      # Complete page sections
├── shared/       # Reusable utilities and components
└── routes/       # SvelteKit routing
    ├── (app)/    # Public website routes
    └── admin/    # Admin panel routes
```

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm, pnpm, or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd front
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` and configure:
```env
PUBLIC_YANDEX_MAPS_API_KEY=your_yandex_maps_api_key
PUBLIC_YCLIENTS_SCRIPT=your_yclients_widget_url
PUBLIC_API=your_backend_api_url
PUBLIC_SMART_CAPTCHA_SITE_KEY=your_captcha_key
```

### Development

Start the development server:

```bash
npm run dev

# or with auto-open browser
npm run dev -- --open
```

The application will be available at `http://localhost:5173`

### Building

Create a production build:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

### Type Checking

Run TypeScript and Svelte type checking:

```bash
npm run check

# or in watch mode
npm run check:watch
```

## Docker Deployment

### Build the Docker image:

```bash
docker build -t barbershop-frontend .
```

### Run the container:

```bash
docker run -p 3000:3000 barbershop-frontend
```

### Using Docker Compose:

```bash
docker-compose up -d
```

The application will be available at `http://localhost:3000`

## Project Structure

### Key Directories

- **`src/routes/(app)`** - Public website pages
- **`src/routes/admin`** - Admin panel pages
- **`src/entities`** - Core business entities
- **`src/features`** - Feature implementations
- **`src/widgets`** - Composite UI components
- **`src/shared`** - Shared utilities and components
- **`static`** - Static assets (images, fonts, etc.)

### Configuration Files

- **`svelte.config.js`** - SvelteKit configuration
- **`vite.config.ts`** - Vite build configuration
- **`components.json`** - UI components configuration
- **`tsconfig.json`** - TypeScript configuration
- **`Dockerfile`** - Multi-stage Docker build configuration
- **`docker-compose.yml`** - Docker Compose setup

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run check` | Run type checking |
| `npm run check:watch` | Run type checking in watch mode |
| `npm run prepare` | Sync SvelteKit types |

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `PUBLIC_YANDEX_MAPS_API_KEY` | Yandex Maps API key | Yes |
| `PUBLIC_YCLIENTS_SCRIPT` | YClients widget script URL | Yes |
| `PUBLIC_API` | Backend API endpoint | Yes |
| `PUBLIC_SMART_CAPTCHA_SITE_KEY` | Smart Captcha site key | Yes |

## Contributing

1. Create a feature branch
2. Make your changes
3. Run type checking: `npm run check`
4. Build the project: `npm run build`
5. Submit a pull request

## Support

For issues and questions, please open an issue on the project repository.
