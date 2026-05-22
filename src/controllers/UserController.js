const User = require("../model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//Register a new user>

exports.register = async (req, res) => {
  try {
    const { username, email, password, phone } = req.body;

    // check if user already exists

    const existingUser = await User.findOne({
      $or: [{ email }, { phone }],
    });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    //Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    //create a new user
    const user = new User({
      username,
      email,
      phone,
      password: hashedPassword,
    });

    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

//login a user

exports.login = async (req, res) => {
  try {
    const { email, password, phone } = req.body;

    //find the user by email and number
    const user = await User.findOne({
      $or: [{ email }, { phone }],
    });
    if (!user) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    //compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    //create jwt token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    //Remove password before sending response
    const userData = await User.findById(user._id).select("-password");

    res.status(200).json({
      token,
      user: userData,
      message: "Login successful",
    });
  } catch (error) {
    (console.log(error),
      res.status(500).json({
        message: "error fetching profile",
        error: error.message,
      }));
  }

};
   exports.updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    // Check user exists
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    // Update user fields
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;
    user.phone = req.body.phone || user.phone;

    // Update profile image
    if (req.file) {
      user.profileImage = req.file.path;
    }

    // Save updated user
    await user.save();

    // Remove password before sending response
    const updatedUser = await User.findById(user._id).select("-password");

    // Success response
    res.status(200).json({
      user: updatedUser,
      message: "Profile updated successfully",
      success: true,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Error updating profile",
      error: error.message,
      success: false,
    });
  }
};
exports.updatePassword = async (req, res) => {
  try {
    const {
      currentPassword,
      newPassword,
      confirmNewPassword
    } = req.body;
    // Find the user by ID
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }
    // Check if current password is correct
    const isMatch = await bcrypt.compare(
      currentPassword,
      user.password
    );
    if (!isMatch) {
      return res.status(400).json({
        message: "Current password is incorrect",
        success: false,
      });
    }
    //confirm password check
    if(newPassword !== confirmNewPassword){
      return res.status(400).json({
        message: "Passwords do not match",
        success: false,
      });
    }
    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    // Update the user's password
    user.password = hashedPassword;
    await user.save();
    // Success response
    res.status(200).json({
      message: "Password updated successfully",
      success: true,
    });   
  } catch (error) {
    res.status(500).json({
      message: "Error updating password",
      error: error.message,
      success: false,
    });
  }
}

