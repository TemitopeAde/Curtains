# LuxeHome - Curtains & Home Decor Store

A full-stack Next.js 15 e-commerce platform with quote request system, admin dashboard, and Cloudinary image management.

## Features

### Customer Features
- **Modern Landing Page** with hero section, featured products, and category showcase
- **Products Page** with advanced filtering, search, and sorting
- **Individual Product Pages** with image slider and multiple product images
- **Quote Request System** instead of traditional checkout
  - Add multiple products to quote
  - Bedding-specific fields (bed size, design, set type)
  - Special notes for each product
- **WhatsApp Integration** for direct customer communication
- **Responsive Design** with mobile-first approach

### Admin Features
- **Admin Dashboard** with secure authentication
- **Product Management** with easy creation, editing, and deletion
- **Cloudinary Integration** for multiple image uploads
- **Quote Management** to view and manage customer requests

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js v5
- **Image Upload**: Cloudinary
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Forms**: React Hook Form + Zod

## Setup Instructions

### 1. Prerequisites

- Node.js 18+ installed
- PostgreSQL database (local or hosted)
- Cloudinary account ([sign up for free](https://cloudinary.com))

### 2. Install Dependencies

\`\`\`bash
npm install
\`\`\`

### 3. Environment Variables

Create a `.env.local` file in the root directory with the following variables:

\`\`\`env
# Database (PostgreSQL)
DATABASE_URL="postgresql://username:password@localhost:5432/curtains_db?schema=public"

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your_cloud_name"
CLOUDINARY_API_KEY="your_api_key"
CLOUDINARY_API_SECRET="your_api_secret"

# NextAuth
NEXTAUTH_SECRET="your-random-secret-key" # Generate with: openssl rand -base64 32
NEXTAUTH_URL="http://localhost:3000"

# WhatsApp (include country code without +)
NEXT_PUBLIC_WHATSAPP_NUMBER="1234567890"
\`\`\`

#### Getting Cloudinary Credentials:
1. Sign up at [cloudinary.com](https://cloudinary.com)
2. Go to Dashboard
3. Copy Cloud Name, API Key, and API Secret

### 4. Database Setup

\`\`\`bash
# Generate Prisma Client
npx prisma generate

# Run migrations to create database tables
npx prisma migrate dev --name init

# (Optional) Open Prisma Studio to view database
npx prisma studio
\`\`\`

### 5. Create Admin User

Run this script to create an admin user:

\`\`\`bash
node scripts/create-admin.js
\`\`\`

Or manually insert into the database:

\`\`\`sql
INSERT INTO "Admin" (id, email, password, name, "createdAt", "updatedAt")
VALUES (
  'admin1',
  'admin@example.com',
  '$2a$10$YourHashedPasswordHere', -- Use bcrypt to hash your password
  'Admin User',
  NOW(),
  NOW()
);
\`\`\`

### 6. Seed Categories (Optional)

\`\`\`bash
node scripts/seed-categories.js
\`\`\`

Or manually add categories via API or Prisma Studio.

### 7. Run Development Server

\`\`\`bash
npm run dev
\`\`\`

Visit [http://localhost:3000](http://localhost:3000)

## Admin Access

- **URL**: `/admin/login`
- **Default Email**: `admin@example.com`
- **Password**: Whatever you set during admin creation

### Admin Routes
- `/admin/login` - Admin login page
- `/admin/products` - Product management
- `/admin/quotes` - View customer quote requests

## Customer Flow

1. Browse products on homepage or products page
2. Click product to view details
3. Add products to quote request
4. Fill out quote form with:
   - Personal information
   - Bedding-specific options (for bedding products)
   - Special notes
5. Submit quote - Admin receives the quote in database
6. Alternative: Use WhatsApp button to chat directly

## Product Management

### Adding Products (Admin)

1. Login to admin dashboard
2. Go to Products page
3. Click "Add Product"
4. Fill in product details:
   - Name
   - Description
   - Price
   - Category
   - Upload multiple images (drag & drop supported)
   - Toggle featured status
5. Click "Create Product"

### Images

- Automatically uploaded to Cloudinary
- Supports multiple images per product
- First image used as thumbnail
- All images shown in product detail page slider

## Database Schema

### Products
- `id`, `name`, `slug`, `description`, `price`
- `images` (array of Cloudinary URLs)
- `featured`, `rating`, `reviews`
- Relationship with Category

### Quotes
- Customer info: name, email, phone, address
- Quote items with product details
- Bedding-specific fields: bedSize, design, setType
- Status tracking: pending, contacted, completed

### Categories
- Predefined categories for organization
- Product count tracking

## API Routes

### Public Routes
- `GET /api/products` - List all products (with filters)
- `GET /api/products/[id]` - Get single product
- `POST /api/quotes` - Submit quote request
- `GET /api/categories` - List categories

### Protected Routes (Admin Only)
- `POST /api/products` - Create product
- `PUT /api/products/[id]` - Update product
- `DELETE /api/products/[id]` - Delete product
- `POST /api/upload` - Upload images to Cloudinary
- `GET /api/quotes` - List all quotes

## Customization

### Fonts
Custom Google Fonts configured in `app/globals.css`:
- Playfair Display (headings)
- Inter (body text)
- Montserrat (accents)

### Colors
Configured in Tailwind classes. Main colors:
- Primary: Gray-900 (#111827)
- Accent: Amber-500
- Background: Gray-50

### Categories
Edit categories in Prisma Studio or via admin API:
- Bedspread Sets
- Duvet Sets
- Blankets
- Fibre Pillows
- Throw Pillows
- Interior Flowers
- Interior Decor
- Window Blinds
- Curtains
- Cotton Towels
- Bathrobes
- Footmats

## Production Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Database

Use a hosted PostgreSQL service:
- Vercel Postgres
- Supabase
- Railway
- Neon

### Cloudinary

Free tier includes:
- 25GB storage
- 25GB bandwidth
- Suitable for small to medium stores

## Troubleshooting

### Prisma Client Issues
\`\`\`bash
npx prisma generate
\`\`\`

### Database Connection
- Ensure PostgreSQL is running
- Check DATABASE_URL format
- Test connection with Prisma Studio

### Image Upload Fails
- Verify Cloudinary credentials
- Check file size limits
- Ensure proper CORS settings

### Authentication Issues
- Regenerate NEXTAUTH_SECRET
- Clear browser cookies
- Check admin credentials

## Support

For issues or questions:
1. Check Prisma documentation
2. Review Next.js 15 App Router docs
3. Consult Cloudinary integration guide

## License

MIT License - feel free to use for commercial projects.
