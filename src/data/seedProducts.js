require("dotenv").config();
const connectDB = require("../db/db");
const Product = require("../model/Product");

const products = [
  {
    name: "Relaxed Linen Shirt",
    description: "Lightweight button-up shirt with a relaxed summer fit.",
    price: 2499,
    discountPrice: 1999,
    category: "clothing",
    gender: "men",
    size: ["S", "M", "L", "XL"],
    colors: ["White", "Sage"],
    stock: 42,
    isFeatured: true,
    isNewArrival: true,
    images: ["https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=1200&auto=format&fit=crop"],
  },
  {
    name: "Tailored Wide Leg Trouser",
    description: "High-waist trousers with a clean drape and smart finish.",
    price: 3499,
    discountPrice: 0,
    category: "clothing",
    gender: "women",
    size: ["XS", "S", "M", "L"],
    colors: ["Black", "Stone"],
    stock: 36,
    isFeatured: true,
    isNewArrival: false,
    images: ["https://images.unsplash.com/photo-1485968579580-b6d095142e6e?q=80&w=1200&auto=format&fit=crop"],
  },
  {
    name: "Oversized Cotton T-Shirt",
    description: "Soft heavyweight tee with dropped shoulders.",
    price: 1299,
    discountPrice: 999,
    category: "clothing",
    gender: "unisex",
    size: ["XS", "S", "M", "L", "XL"],
    colors: ["Black", "White", "Grey"],
    stock: 80,
    isFeatured: true,
    isNewArrival: true,
    images: ["https://images.unsplash.com/photo-1503341504253-dff4815485f1?q=80&w=1200&auto=format&fit=crop"],
  },
  {
    name: "Cropped Denim Jacket",
    description: "Structured denim jacket with front pockets and a cropped cut.",
    price: 4299,
    discountPrice: 3799,
    category: "clothing",
    gender: "women",
    size: ["XS", "S", "M", "L"],
    colors: ["Blue", "Washed Black"],
    stock: 28,
    isFeatured: false,
    isNewArrival: true,
    images: ["https://images.unsplash.com/photo-1543076447-215ad9ba6923?q=80&w=1200&auto=format&fit=crop"],
  },
  {
    name: "Utility Overshirt",
    description: "Layering overshirt with utility pockets and a modern straight fit.",
    price: 3999,
    discountPrice: 0,
    category: "clothing",
    gender: "men",
    size: ["S", "M", "L", "XL"],
    colors: ["Olive", "Charcoal"],
    stock: 31,
    isFeatured: true,
    isNewArrival: false,
    images: ["https://images.unsplash.com/photo-1520975916090-3105956dac38?q=80&w=1200&auto=format&fit=crop"],
  },
  {
    name: "Rib Knit Midi Dress",
    description: "Minimal rib-knit dress with a slim silhouette.",
    price: 2999,
    discountPrice: 2499,
    category: "clothing",
    gender: "women",
    size: ["XS", "S", "M", "L"],
    colors: ["Black", "Cream"],
    stock: 24,
    isFeatured: false,
    isNewArrival: true,
    images: ["https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=1200&auto=format&fit=crop"],
  },
];

const seedProducts = async () => {
  try {
    await connectDB();
    await Promise.all(
      products.map((product) =>
        Product.updateOne(
          { name: product.name },
          { $set: product },
          { upsert: true },
        ),
      ),
    );
    console.log("Products seeded successfully");
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedProducts();
