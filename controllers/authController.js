// signup, login, otp handlers
export const signup = async (req, res) => {
  // Save user to database (hash password, etc.)
  res.status(201).json({ message: "User registered (demo)" });
};

export const login = async (req, res) => {
  // Verify user and return token
  res.status(200).json({ message: "Login success (demo)", token: "demo-token" });
};

export const sendOtp = async (req, res) => {
  // Generate and send OTP via email/SMS
  res.status(200).json({ message: "OTP sent (demo)" });
};
