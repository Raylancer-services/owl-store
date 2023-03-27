const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//Register User
exports.CreateUser = async (req, res) => {
  const { username, email_id, password, role } = req.body;
  try {
    const oldUser = await User.findOne({ email_id });

    if (oldUser)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await User.create({
      username,
      email_id,
      password: hashedPassword,
      role: "ROLE_USER",
    });

    const token = jwt.sign(
      { email: result.email, id: result._id, role: result.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "11h",
      }
    );

    res.status(201).json({ result, token, msg: "Registered successfull!" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });

    console.log(error);
  }
};

//Login User
exports.LoginUser = async (req, res) => {
  const { email_id, password } = req.body;
  try {
    const oldUser = await User.findOne({ email_id });

    if (!oldUser)
      return res
        .status(404)
        .json({ message: "User doesn't exist.Check your email Id." });

    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Wrong Password!" });

    const token = jwt.sign(
      { email: oldUser.email_id, id: oldUser._id, role: oldUser.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "11h",
      }
    );

    res.status(200).json({ oldUser, token, msg: "Login successfull!" });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

//Register Seller
exports.CreateSeller = async (req, res) => {
  const { username, email_id, password } = req.body;
  try {
    const oldUser = await User.findOne({ email_id });

    if (oldUser)
      return res.status(400).json({ message: "Seller already exists" });

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await User.create({
      username,
      email_id,
      password: hashedPassword,
      role: "ROLE_SELLER",
    });

    const token = jwt.sign(
      { email: result.email, id: result._id, role: result.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "11h",
      }
    );

    res.status(201).json({ result, token, msg: "Registered successfull!" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });

    console.log(error);
  }
};

//Login Seller
// exports.LoginSeller = async (req, res) => {
//   const { email_id, password } = req.body;
//   try {
//     const oldUser = await User.findOne({email_id});

//     if (!oldUser)
//       return res.status(404).json({ message: "Seller doesn't exist" });

//     const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

//     if (!isPasswordCorrect)
//       return res.status(400).json({ message: "Invalid credentials" });

//     const token = jwt.sign(
//       { email: oldUser.email_id, id: oldUser._id},
//       process.env.JWT_SECRET,
//       {
//         expiresIn: "11h",
//       }
//     );

//     res.status(200).json({ oldUser, token,msg:"Login successfull!" });
//   } catch (err) {
//     res.status(500).json({ message: "Something went wrong" });
//   }
// };
