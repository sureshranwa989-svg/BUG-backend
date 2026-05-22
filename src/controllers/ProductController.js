const Product = require("../model/Product");

// Create Product
exports.createProduct = async (req, res) => {
  try {

    // Get product data from request body
    const {
      name,
      description,
      price,
      category,
      gender,
      discountPrice,
      size,
      colors,
      stock,
      isNewArrival,
      isFeatured,
      imageUrls,
    } =
      req.body;

    // Get uploaded image paths
    const uploadedImages = req.files ? req.files.map((file) => file.path) : [];
    const images = [
      ...uploadedImages,
      ...(Array.isArray(imageUrls)
        ? imageUrls
        : imageUrls
          ? imageUrls.split(",").map((image) => image.trim()).filter(Boolean)
          : []),
    ];

    // Create new product in database
    const product = await Product.create({
      name,
      description,
      price,
      category,
      gender,
      discountPrice,
      images,
      size: Array.isArray(size)
        ? size
        : size
          ? size.split(",").map((item) => item.trim()).filter(Boolean)
          : [],
      colors: Array.isArray(colors)
        ? colors
        : colors
          ? colors.split(",").map((item) => item.trim()).filter(Boolean)
          : [],
      stock,
      isNewArrival,
      isFeatured,
    });

    // Send success response
    res.status(201).json({
      success: true,
      message: "Product created successfully",
      product,
    });

  } catch (error) {

    // Handle server error
    res.status(500).json({
      success: false,
      message: "Failed to create product",
      error: error.message,
    });
  }
};

// Get All Products
exports.getAllProducts = async (req, res) => {
  try {

    const { category, gender, search, featured, newArrival } = req.query;

    const filter = {};

    if (category && category !== "all") {
      filter.category = new RegExp(category, "i");
    }

    if (gender && gender !== "all") {
      filter.gender = gender;
    }

    if (featured === "true") {
      filter.isFeatured = true;
    }

    if (newArrival === "true") {
      filter.isNewArrival = true;
    }

    if (search) {
      filter.$or = [
        { name: new RegExp(search, "i") },
        { description: new RegExp(search, "i") },
        { category: new RegExp(search, "i") },
      ];
    }

    // Fetch all products from database
    const products = await Product.find(filter).sort({ createdAt: -1 });

    // Send products response
    res.status(200).json({
      success: true,
      products,
    });

  } catch (error) {

    // Handle error
    res.status(500).json({
      success: false,
      message: "Failed to fetch products",
      error: error.message,
    });
  }
};

// Get Product By ID
exports.getProductById = async (req, res) => {
  try {

    // Find product using ID
    const product = await Product.findById(req.params.id);

    // Check if product exists
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Send product data
    res.status(200).json({
      success: true,
      product,
    });

  } catch (error) {

    // Handle error
    res.status(500).json({
      success: false,
      message: "Failed to fetch product",
      error: error.message,
    });
  }
};

// Update Product
exports.updateProduct = async (req, res) => {
  try {

    // Find product by ID
    const product = await Product.findById(req.params.id);

    // Check if product exists
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Update product data
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    // Send success response
    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product: updatedProduct,
    });

  } catch (error) {

    // Handle error
    res.status(500).json({
      success: false,
      message: "Failed to update product",
      error: error.message,
    });
  }
};

// Delete Product
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    await product.deleteOne();

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete product",
      error: error.message,
    });
  }
};

// Admin Stats
exports.getProductStats = async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments();
    const menProducts = await Product.countDocuments({ gender: "men" });
    const womenProducts = await Product.countDocuments({ gender: "women" });
    const featuredProducts = await Product.countDocuments({ isFeatured: true });

    res.status(200).json({
      success: true,
      stats: {
        totalProducts,
        menProducts,
        womenProducts,
        featuredProducts,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch product stats",
      error: error.message,
    });
  }
};
