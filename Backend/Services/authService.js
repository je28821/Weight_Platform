const User = require("../Model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mailer = require("./mailServices");
const { OAuth2Client } = require("google-auth-library");
const googleClient = require("../Config/googleConfig");

module.exports.registerUser = async (data) => {
  const { name, email, password, address, contactNo } = data;

  if (!name || !email || !password || !address || !contactNo) {
    throw new Error("All fields are required");
  }

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new Error("Email already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
    address,
    contactNo,
  });

  user.isLoggedinn = true;
  await user.save();

  const token = jwt.sign(
    {
      id: user._id,
      role: user.role,
    },
    process.env.JWT_SCREAT,
    { expiresIn: "60d" },
  );

  await mailer({
    to: email,
    subject: "Register Successfully",
    html: `
    <div>
      <h1>Welcome to Nidhi Corporation! 🎉</h1>
      <p>Hello,</p>
      <p>Thank you for joining <strong>Nidhi Corporation</strong>. We're delighted to have you as part of our community.</p>
      <p>Your account has been created successfully, and you can now start exploring our platform.</p>
      <p>We look forward to serving you and hope you have a great experience with us.</p>
      <br>
      <p>Best Regards,</p>
      <p><strong>Nidhi Corporation Team</strong></p>
    </div>
  `,
  });

  user.password = undefined;

  return {
    token,
  };
};

module.exports.loginUser = async (data) => {
  const { email, password } = data;

  if (!email || !password) {
    throw new Error("All fields are required");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("Enter Correct Mail");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Enter Valid Password");
  }

  user.isLoggedinn = true;
  await user.save();

  const token = jwt.sign(
    {
      id: user._id,
      role: user.role,
    },
    process.env.JWT_SCREAT,
    { expiresIn: "60d" },
  );

  await mailer({
    to: email,
    subject: "Login Sucessfully",
    html: `
    <div>
      <h1>Welcome to Nidhi Corporation! 🎉</h1>
      <p>Hello,</p>
      <p>Thank you for joining <strong>Nidhi Corporation</strong>. We're delighted to have you as part of our community.</p>
      <p>Your account has been created successfully, and you can now start exploring our platform.</p>
      <p>We look forward to serving you and hope you have a great experience with us.</p>
      <br>
      <p>Best Regards,</p>
      <p><strong>Nidhi Corporation Team</strong></p>
    </div>
  `,
  });

  user.password = undefined;

  return {
    token,
  };
};

module.exports.googleLogin = async (token) => {
  const ticket = await googleClient.verifyIdToken({
    idToken: token,
    audience: process.env.GOOGLE_CLIENT_ID,
  });

  const payload = ticket.getPayload();

  const { sub, email, name, picture, email_verified } = payload;

  if (!email_verified) {
    throw new Error("Google email is not verified");
  }

  let user = await User.findOne({ email });
  if (!user) {
    throw new Error("No User Find With This Email");
  }

  user.isLoggedinn = true;
  await user.save();

  const jwtToken = jwt.sign(
    {
      id: user._id,
      role: user.role,
    },
    process.env.JWT_SCREAT,
    {
      expiresIn: "60d",
    },
  );

  await mailer({
    to: email,
    subject: "Login Sucessfully",
    html: `
    <div>
      <h1>Welcome to Nidhi Corporation! 🎉</h1>
      <p>Hello,</p>
      <p>Thank you for joining <strong>Nidhi Corporation</strong>. We're delighted to have you as part of our community.</p>
      <p>Your account has been created successfully, and you can now start exploring our platform.</p>
      <p>We look forward to serving you and hope you have a great experience with us.</p>
      <br>
      <p>Best Regards,</p>
      <p><strong>Nidhi Corporation Team</strong></p>
    </div>
  `,
  });

  return {
    jwtToken,
  };
};

module.exports.logOut = async (userId) => {
  const user = await User.findByIdAndUpdate(
    userId,
    { isLoggedinn: false },
    { new: true },
  );

  if (!user) {
    throw new Error("User not found");
  }
};
