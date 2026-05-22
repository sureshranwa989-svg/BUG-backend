const express = require("express");
const router = express.Router();
const upload = require("../Middlewares/upload");
const{
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getProductStats,
} = require("../controllers/ProductController");
const authMiddleware = require("../Middlewares/AuthMiddleware");

const adminOnly = (req, res, next) => {
  if (req.user?.role !== "admin") {
    return res.status(403).json({
      success: false,
      message: "Admin access required",
    });
  }

  next();
};


router.post("/add", authMiddleware, adminOnly, upload.array("images", 5), createProduct);
router.get("/", getAllProducts);
router.get("/admin/stats", authMiddleware, adminOnly, getProductStats);
router.get("/:id", getProductById);
router.put("/:id", authMiddleware, adminOnly, updateProduct);
router.delete("/:id", authMiddleware, adminOnly, deleteProduct);
module.exports = router;        
