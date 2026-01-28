import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { createClient } from "@sanity/client";

// --- Environment Variables Setup ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Yeh line ensure karti hai ke root folder se .env.local uthayi jaye
dotenv.config({ path: path.resolve(__dirname, "../.env.local") });

const {
  NEXT_PUBLIC_SANITY_PROJECT_ID,
  NEXT_PUBLIC_SANITY_DATASET,
  NEXT_PUBLIC_SANITY_AUTH_TOKEN,
  BASE_URL = "http://localhost:3000",
} = process.env;

// Debugging ke liye (taki aapko pata chale variables load huye ya nahi)
if (!NEXT_PUBLIC_SANITY_PROJECT_ID || !NEXT_PUBLIC_SANITY_AUTH_TOKEN) {
  console.error("❌ Error: Missing environment variables in .env.local");
  console.log("Current Directory:", process.cwd());
  process.exit(1);
}

// --- Sanity Client Setup ---
const targetClient = createClient({
  projectId: NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: NEXT_PUBLIC_SANITY_DATASET || "production",
  useCdn: false,
  apiVersion: "2023-01-01",
  token: NEXT_PUBLIC_SANITY_AUTH_TOKEN,
});

// --- Helper: Image Upload ---
async function uploadImageToSanity(imageUrl) {
  try {
    const response = await fetch(imageUrl);
    if (!response.ok) throw new Error(`Failed to fetch image: ${imageUrl}`);

    const buffer = await response.arrayBuffer();

    const uploadedAsset = await targetClient.assets.upload("image", Buffer.from(buffer), {
      filename: imageUrl.split("/").pop(),
    });

    return uploadedAsset._id;
  } catch (error) {
    console.error("❌ Error uploading image:", error.message);
    return null;
  }
}

// --- Main Migration Function (Only Products) ---
async function migrateData() {
  console.log("🚀 Starting product migration...");

  try {
    // 1. Fetch products from the REST API
    const productsResponse = await fetch(`${BASE_URL}/api/products`);
    if (!productsResponse.ok) throw new Error("Failed to fetch products.");
    const productsData = await productsResponse.json();

    console.log(`📦 Found ${productsData.length} products to migrate.`);

    // 2. Migrate products
    for (const product of productsData) {
      console.log(`🔄 Migrating: ${product.title}`);
      
      const imageId = await uploadImageToSanity(product.imageUrl);

      const newProduct = {
        _type: "products",
        title: product.title,
        price: product.price,
        priceWithoutDiscount: product.priceWithoutDiscount,
        badge: product.badge,
        image: imageId ? { _type: "image", asset: { _ref: imageId } } : undefined,
        description: product.description,
        inventory: product.inventory,
        tags: product.tags,
      };

      const result = await targetClient.create(newProduct);
      console.log(`✅ Success: ${product.title} (ID: ${result._id})`);
    }

    console.log("\n✨ Migration completed successfully!");
  } catch (error) {
    console.error("\n❌ Error during migration:", error.message);
    process.exit(1);
  }
}

// Execute
migrateData();