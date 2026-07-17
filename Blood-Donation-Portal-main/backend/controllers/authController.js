const User = require("../models/User");
const jwt = require("jsonwebtoken");

function generateToken(user) {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET || "bloodlink_secret_123",
    {
      expiresIn: "7d",
    }
  );
}


// REGISTER

exports.register = async (req, res) => {
  try {
    const { name, email, phoneNo, password, role } = req.body;

    if (!name || !email || !phoneNo || !password) {
      return res.status(400).json({
        message: "Please provide all required fields",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const user = await User.create({
      name,
      email,
      phoneNo,
      password,
      role: role || "recipient",
      isVerified: true,
    });

    const token = generateToken(user);

    res.status(201).json({
      success: true,
      message: "Registration successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (error) {
    console.error("REGISTER ERROR:", error);

    res.status(500).json({
      message: "Registration failed",
      error: error.message,
    });
  }
};


// LOGIN

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

   const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }

   

    const isMatch = await user.matchPassword(password);

if (!isMatch) {
      return res.status(400).json({
        message: "Invalid password",
      });
    }

    const token = generateToken(user);

    res.json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (error) {
    console.error("LOGIN ERROR:", error);

    res.status(500).json({
      message: "Login failed",
      error: error.message,
    });
  }
};
exports.getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.json({
      success: true,
      user,
    });

  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};
// ==========================
// CHANGE PASSWORD
// ==========================
exports.changePassword = async (req, res) => {
  try {
    const {
      currentPassword,
      newPassword,
      confirmPassword
    } = req.body;


    if (!currentPassword || !newPassword || !confirmPassword) {
      return res.status(400).json({
        message: "Please fill all password fields"
      });
    }


    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        message: "New passwords do not match"
      });
    }


    const user = await User.findById(req.user.id)
      .select("+password");


    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }


    const isMatch = await user.matchPassword(currentPassword);


    if (!isMatch) {
      return res.status(400).json({
        message: "Current password is incorrect"
      });
    }


    user.password = newPassword;

    await user.save();


    res.json({
      success: true,
      message: "Password changed successfully"
    });


  } catch (error) {

    console.error("CHANGE PASSWORD ERROR:", error);

    res.status(500).json({
      message: "Password change failed"
    });

  }
};
// ==========================
// UPDATE PROFILE
// ==========================
exports.updateProfile = async (req, res) => {
  try {
    const { name, phoneNo } = req.body;

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    if (name) {
      user.name = name;
    }

    if (phoneNo) {
      user.phoneNo = phoneNo;
    }

    await user.save();

    res.json({
      success: true,
      message: "Profile updated successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phoneNo: user.phoneNo,
        role: user.role
      }
    });

  } catch (error) {

    console.error("UPDATE PROFILE ERROR:", error);

    res.status(500).json({
      message: "Profile update failed"
    });

  }
};