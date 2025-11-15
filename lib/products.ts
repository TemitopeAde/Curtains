import { Product, Category } from "./types";

export const products: Product[] = [
  // Bedding Category
  {
    id: "1",
    name: "Luxury Cotton Bedspread Set",
    slug: "luxury-cotton-bedspread-set",
    category: "Bedspread Sets",
    price: 149.99,
    description: "Premium cotton bedspread set with intricate embroidery. Includes 1 bedspread and 2 pillow shams. Perfect for adding elegance to your bedroom.",
    images: [
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800",
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800"
    ],
    featured: true,
    rating: 4.8,
    reviews: 124
  },
  {
    id: "2",
    name: "Quilted Bedspread Set - King",
    slug: "quilted-bedspread-set-king",
    category: "Bedspread Sets",
    price: 189.99,
    description: "King-sized quilted bedspread with modern geometric patterns. Machine washable and fade-resistant.",
    images: [
      "https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=800",
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800"
    ],
    rating: 4.6,
    reviews: 89
  },
  {
    id: "3",
    name: "Premium Duvet Set - White",
    slug: "premium-duvet-set-white",
    category: "Duvet Sets",
    price: 129.99,
    description: "Soft and breathable duvet set made from 100% Egyptian cotton. Includes duvet cover and matching pillowcases.",
    images: [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800",
      "https://images.unsplash.com/photo-1615873968403-89e068629265?w=800",
      "https://images.unsplash.com/photo-1582735689341-f6c7c4d7cbb0?w=800"
    ],
    featured: true,
    rating: 4.9,
    reviews: 203
  },
  {
    id: "4",
    name: "Floral Duvet Set",
    slug: "floral-duvet-set",
    category: "Duvet Sets",
    price: 159.99,
    description: "Beautiful floral pattern duvet set that brings a touch of nature to your bedroom. Hypoallergenic material.",
    images: [
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800",
      "https://images.unsplash.com/photo-1617325247661-675ab4b64ae2?w=800"
    ],
    rating: 4.7,
    reviews: 156
  },
  // Blankets
  {
    id: "5",
    name: "Fleece Throw Blanket",
    slug: "fleece-throw-blanket",
    category: "Blankets",
    price: 39.99,
    description: "Ultra-soft fleece blanket perfect for cozy nights. Available in multiple colors and patterns.",
    images: [
      "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=800",
      "https://images.unsplash.com/photo-1610714909179-4973dfd2b1ef?w=800"
    ],
    featured: true,
    rating: 4.5,
    reviews: 312
  },
  {
    id: "6",
    name: "Weighted Comfort Blanket",
    slug: "weighted-comfort-blanket",
    category: "Blankets",
    price: 89.99,
    description: "15lb weighted blanket designed to promote better sleep. Removable, washable cover included.",
    images: [
      "https://images.unsplash.com/photo-1541123437800-1bb1317badc2?w=800",
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800"
    ],
    rating: 4.8,
    reviews: 267
  },
  // Pillows
  {
    id: "7",
    name: "Memory Foam Fibre Pillows (Set of 2)",
    slug: "memory-foam-fibre-pillows-set-of-2",
    category: "Fibre Pillows",
    price: 49.99,
    description: "Ergonomic memory foam pillows that provide excellent neck and head support. Breathable cover.",
    images: [
      "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=800",
      "https://images.unsplash.com/photo-1603111646011-1a3d33dd0efa?w=800"
    ],
    rating: 4.6,
    reviews: 178
  },
  {
    id: "8",
    name: "Hotel Collection Fibre Pillows",
    slug: "hotel-collection-fibre-pillows",
    category: "Fibre Pillows",
    price: 69.99,
    description: "Luxury hotel-quality pillows with premium hollow fibre filling. Set of 4 pillows.",
    images: [
      "https://images.unsplash.com/photo-1631049552240-59c37f38802b?w=800",
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800"
    ],
    rating: 4.7,
    reviews: 145
  },
  {
    id: "9",
    name: "Velvet Throw Pillow - Gold",
    slug: "velvet-throw-pillow-gold",
    category: "Throw Pillows",
    price: 24.99,
    description: "Elegant velvet throw pillow with hidden zipper. Perfect accent for sofas and beds.",
    images: [
      "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=800",
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800"
    ],
    featured: true,
    rating: 4.5,
    reviews: 201
  },
  {
    id: "10",
    name: "Decorative Throw Pillows (Set of 4)",
    slug: "decorative-throw-pillows-set-of-4",
    category: "Throw Pillows",
    price: 79.99,
    description: "Mix and match decorative pillows with various patterns and textures. Includes 4 coordinated designs.",
    images: [
      "https://images.unsplash.com/photo-1629079447777-1e605162dc8d?w=800",
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800"
    ],
    rating: 4.6,
    reviews: 134
  },
  // Interior Decor
  {
    id: "11",
    name: "Artificial Orchid Arrangement",
    slug: "artificial-orchid-arrangement",
    category: "Interior Flowers",
    price: 45.99,
    description: "Realistic artificial orchid in ceramic pot. Maintenance-free and perfect for any room.",
    images: [
      "https://images.unsplash.com/photo-1600411833196-7c1f6b1a8b90?w=800",
      "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=800"
    ],
    rating: 4.4,
    reviews: 98
  },
  {
    id: "12",
    name: "Eucalyptus Greenery Bundle",
    slug: "eucalyptus-greenery-bundle",
    category: "Interior Flowers",
    price: 34.99,
    description: "Dried eucalyptus stems in a modern glass vase. Adds a natural touch to your decor.",
    images: [
      "https://images.unsplash.com/photo-1542328088-d8f09b6b9b0f?w=800",
      "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=800"
    ],
    rating: 4.7,
    reviews: 87
  },
  {
    id: "13",
    name: "Modern Wall Art Set",
    slug: "modern-wall-art-set",
    category: "Interior Decor",
    price: 129.99,
    description: "Set of 3 framed abstract art prints. Contemporary design perfect for living rooms and offices.",
    images: [
      "https://images.unsplash.com/photo-1513519245088-0e12902e35ca?w=800",
      "https://images.unsplash.com/photo-1582053433548-6de7adbd3eea?w=800"
    ],
    featured: true,
    rating: 4.8,
    reviews: 176
  },
  {
    id: "14",
    name: "Decorative Mirror - Gold Frame",
    slug: "decorative-mirror-gold-frame",
    category: "Interior Decor",
    price: 89.99,
    description: "Round decorative mirror with elegant gold frame. Perfect statement piece for any room.",
    images: [
      "https://images.unsplash.com/photo-1618220179428-22790b461013?w=800",
      "https://images.unsplash.com/photo-1616047006789-b7af5afb8c20?w=800"
    ],
    rating: 4.6,
    reviews: 143
  },
  // Window Treatments
  {
    id: "15",
    name: "Blackout Window Blinds",
    slug: "blackout-window-blinds",
    category: "Window Blinds",
    price: 79.99,
    description: "Premium blackout roller blinds. Easy to install and operate. Custom sizes available.",
    images: [
      "https://images.unsplash.com/photo-1613082442324-62ef5249275e?w=800",
      "https://images.unsplash.com/photo-1585464231875-d9ef1f5ad396?w=800"
    ],
    rating: 4.7,
    reviews: 234
  },
  {
    id: "16",
    name: "Bamboo Roman Shades",
    slug: "bamboo-roman-shades",
    category: "Window Blinds",
    price: 119.99,
    description: "Natural bamboo roman shades for an eco-friendly, elegant look. Light filtering.",
    images: [
      "https://images.unsplash.com/photo-1615876234886-fd9a39fda97f?w=800",
      "https://images.unsplash.com/photo-1512910297129-742f5d3d0d8f?w=800"
    ],
    rating: 4.5,
    reviews: 109
  },
  {
    id: "17",
    name: "Sheer Linen Curtains",
    slug: "sheer-linen-curtains",
    category: "Curtains",
    price: 69.99,
    description: "Elegant sheer linen curtains that allow natural light while providing privacy. Set of 2 panels.",
    images: [
      "https://images.unsplash.com/photo-1547819374-5fc8cb0d7680?w=800",
      "https://images.unsplash.com/photo-1604881991405-47b85a60d52f?w=800",
      "https://images.unsplash.com/photo-1557980840-8c6df5874c3c?w=800"
    ],
    featured: true,
    rating: 4.9,
    reviews: 289
  },
  {
    id: "18",
    name: "Velvet Blackout Curtains",
    slug: "velvet-blackout-curtains",
    category: "Curtains",
    price: 99.99,
    description: "Luxurious velvet curtains with blackout lining. Thermal insulated to keep rooms comfortable year-round.",
    images: [
      "https://images.unsplash.com/photo-1546484396-fb3fc6f95f98?w=800",
      "https://images.unsplash.com/photo-1618220924273-338d82d6b886?w=800"
    ],
    rating: 4.8,
    reviews: 198
  },
  // Bath & Towels
  {
    id: "19",
    name: "Egyptian Cotton Towel Set",
    slug: "egyptian-cotton-towel-set",
    category: "Cotton Towels",
    price: 59.99,
    description: "6-piece premium Egyptian cotton towel set. Includes 2 bath towels, 2 hand towels, and 2 washcloths.",
    images: [
      "https://images.unsplash.com/photo-1562183241-b937e95585b6?w=800",
      "https://images.unsplash.com/photo-1628276303236-a6f8a35e85dd?w=800"
    ],
    rating: 4.7,
    reviews: 267
  },
  {
    id: "20",
    name: "Luxury Bath Towels - White",
    slug: "luxury-bath-towels-white",
    category: "Cotton Towels",
    price: 79.99,
    description: "Hotel-quality 100% organic cotton bath towels. Super absorbent and quick-drying. Set of 4.",
    images: [
      "https://images.unsplash.com/photo-1616594266303-e1105a80114e?w=800",
      "https://images.unsplash.com/photo-1604587378676-4c1e36d2f43b?w=800"
    ],
    featured: true,
    rating: 4.9,
    reviews: 345
  },
  {
    id: "21",
    name: "Plush Spa Bathrobe",
    slug: "plush-spa-bathrobe",
    category: "Bathrobes",
    price: 89.99,
    description: "Ultra-soft terry cloth bathrobe with shawl collar. Available in multiple sizes and colors.",
    images: [
      "https://images.unsplash.com/photo-1564694202883-46e5b89c3c14?w=800",
      "https://images.unsplash.com/photo-1609955308110-164232e0d739?w=800"
    ],
    rating: 4.6,
    reviews: 156
  },
  {
    id: "22",
    name: "Lightweight Waffle Bathrobe",
    slug: "lightweight-waffle-bathrobe",
    category: "Bathrobes",
    price: 64.99,
    description: "Breathable waffle-weave bathrobe perfect for all seasons. Includes matching belt.",
    images: [
      "https://images.unsplash.com/photo-1583000683812-b8f6523b244c?w=800",
      "https://images.unsplash.com/photo-1616486616449-9dbda0b2e3b9?w=800"
    ],
    rating: 4.5,
    reviews: 123
  },
  {
    id: "23",
    name: "Memory Foam Bath Mat",
    slug: "memory-foam-bath-mat",
    category: "Footmats",
    price: 29.99,
    description: "Ultra-absorbent memory foam bath mat with non-slip backing. Quick-dry technology.",
    images: [
      "https://images.unsplash.com/photo-1595814432314-90095f342694?w=800",
      "https://images.unsplash.com/photo-1604588264551-b80f447e0a8e?w=800"
    ],
    rating: 4.7,
    reviews: 289
  },
  {
    id: "24",
    name: "Cotton Bath Mat Set (3-Piece)",
    slug: "cotton-bath-mat-set-3-piece",
    category: "Footmats",
    price: 44.99,
    description: "Coordinated 3-piece cotton bath mat set. Machine washable and highly absorbent.",
    images: [
      "https://images.unsplash.com/photo-1600210491369-e753d80a41f3?w=800",
      "https://images.unsplash.com/photo-1606480364020-d5c3a0697e44?w=800"
    ],
    rating: 4.4,
    reviews: 167
  }
];

export const categories: Category[] = [
  { id: "all", name: "All Products", count: products.length },
  { id: "bedspread", name: "Bedspread Sets", count: products.filter(p => p.category === "Bedspread Sets").length },
  { id: "duvet", name: "Duvet Sets", count: products.filter(p => p.category === "Duvet Sets").length },
  { id: "blankets", name: "Blankets", count: products.filter(p => p.category === "Blankets").length },
  { id: "fibre-pillows", name: "Fibre Pillows", count: products.filter(p => p.category === "Fibre Pillows").length },
  { id: "throw-pillows", name: "Throw Pillows", count: products.filter(p => p.category === "Throw Pillows").length },
  { id: "flowers", name: "Interior Flowers", count: products.filter(p => p.category === "Interior Flowers").length },
  { id: "decor", name: "Interior Decor", count: products.filter(p => p.category === "Interior Decor").length },
  { id: "blinds", name: "Window Blinds", count: products.filter(p => p.category === "Window Blinds").length },
  { id: "curtains", name: "Curtains", count: products.filter(p => p.category === "Curtains").length },
  { id: "towels", name: "Cotton Towels", count: products.filter(p => p.category === "Cotton Towels").length },
  { id: "bathrobes", name: "Bathrobes", count: products.filter(p => p.category === "Bathrobes").length },
  { id: "footmats", name: "Footmats", count: products.filter(p => p.category === "Footmats").length },
];
