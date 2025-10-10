# ES Monorepo

A TypeScript monorepo with Prisma PostgreSQL database, Express API, and React UI.

## 📦 Project Structure

```
es-monorepo/
├── shared/              # Shared types and utilities
├── api/                 # Express API with Prisma
├── ui/                  # React frontend application
├── package.json         # Root package.json with workspace config
├── tsconfig.json        # Shared TypeScript configuration
└── README.md
```

## 🚀 Quick Start

### Prerequisites

- Node.js (>= 18.0.0)
- npm (>= 9.0.0)
- PostgreSQL database

### Installation

1. **Clone and install dependencies:**
   ```bash
   npm install
   ```

2. **Set up the database:**
   ```bash
   # Copy environment file
   cp api/.env.example api/.env
   
   # Edit api/.env with your database credentials
   # DATABASE_URL="postgresql://username:password@localhost:5432/es_db?schema=public"
   ```

3. **Initialize the database:**
   ```bash
   # Generate Prisma client
   npm run db:generate
   
   # Run database migrations
   npm run db:migrate
   
   # Seed the database (optional)
   npm run db:seed
   ```

4. **Start development servers:**
   ```bash
   # Start both API and UI in development mode
   npm run dev
   
   # Or start them individually:
   npm run dev:api    # API server on http://localhost:3001
   npm run dev:ui     # UI server on http://localhost:3000
   ```

## 📚 Available Scripts

### Root Level Scripts

- `npm run dev` - Start both API and UI in development mode
- `npm run dev:api` - Start only the API server
- `npm run dev:ui` - Start only the UI server
- `npm run build` - Build all packages
- `npm run type-check` - Type check all packages
- `npm run lint` - Lint all packages
- `npm run clean` - Clean all node_modules and build artifacts

### Database Scripts

- `npm run db:generate` - Generate Prisma client
- `npm run db:migrate` - Run database migrations
- `npm run db:studio` - Open Prisma Studio
- `npm run db:seed` - Seed the database with sample data

## 🏗️ Architecture

### Shared Package (`@es/shared`)

Contains shared TypeScript types, interfaces, and utility functions used across the API and UI packages.

**Key exports:**
- `User`, `CreateUserDto`, `UpdateUserDto` - User-related types
- `ApiResponse`, `PaginatedResponse` - API response types
- `createSuccessResponse`, `createErrorResponse` - Response utilities

### API Package (`@es/api`)

Express.js API server with:
- **Prisma ORM** for database operations
- **PostgreSQL** database
- **TypeScript** for type safety
- **Zod** for request validation
- **CORS, Helmet, Morgan** for security and logging

**Endpoints:**
- `GET /api/health` - Health check
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create new user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### UI Package (`@es/ui`)

React application with:
- **Vite** for fast development and building
- **TypeScript** for type safety
- **Axios** for API communication
- **CSS** for styling (no external CSS framework)

**Features:**
- User management (CRUD operations)
- Real-time API status monitoring
- Responsive design
- Error handling and loading states

## 🗄️ Database Schema

```prisma
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String
  posts     Post[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Post {
  id        String   @id @default(cuid())
  title     String
  content   String?
  published Boolean  @default(false)
  author    User     @relation(fields: [authorId], references: [id])
  authorId  String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

## 🔧 Development

### Adding a New Package

1. Create a new directory in `packages/`
2. Add a `package.json` with the workspace naming convention `@es/package-name`
3. Add a `tsconfig.json` that extends the root configuration
4. Update the root `tsconfig.json` references

### Working with the Database

```bash
# Make changes to packages/api/prisma/schema.prisma
# Then run:
npm run db:migrate

# To reset the database (development only):
npx prisma migrate reset --force
```

### Environment Variables

The API uses the following environment variables (see `packages/api/.env.example`):

- `DATABASE_URL` - PostgreSQL connection string
- `PORT` - API server port (default: 3001)
- `NODE_ENV` - Environment (development/production)
- `CORS_ORIGIN` - Allowed CORS origin (default: http://localhost:3000)

## 🚀 Production Deployment

1. **Build all packages:**
   ```bash
   npm run build
   ```

2. **Set up production database:**
   ```bash
   # Deploy migrations to production database
   npm run db:deploy
   ```

3. **Start the API server:**
   ```bash
   cd packages/api
   npm start
   ```

4. **Serve the UI build files** using a web server like Nginx.

## 🧰 Tech Stack

- **TypeScript** - Type safety across the entire stack
- **Node.js** - Runtime environment
- **Express.js** - Web framework for API
- **Prisma** - Database ORM and migration tool
- **PostgreSQL** - Database
- **React** - Frontend framework
- **Vite** - Frontend build tool
- **Zod** - Schema validation
- **Axios** - HTTP client

## 📄 License

This project is licensed under the MIT License.