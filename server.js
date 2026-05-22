require("dotenv").config();

const app = require("./src/app");
const connectDB = require("./src/db/db");

// Default Route
app.get("/", (req, res) => {
  res.send("Backend is running successfully 🚀");
});

// Connect Database
connectDB();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
