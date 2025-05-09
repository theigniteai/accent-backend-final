// stub controllers: return fixed responses

export const signup = async (req, res) => {
  // you’ll get { name, email, password } in req.body
  return res.json({
    success: true,
    message: "✅ Stub: user signed up",
    token: "stub-signup-token"
  });
};

export const login = async (req, res) => {
  // you’ll get { email, password } in req.body
  return res.json({
    success: true,
    message: "✅ Stub: user logged in",
    token: "stub-login-token"
  });
};

export const forgotPassword = async (req, res) => {
  return res.json({
    success: true,
    message: "✅ Stub: password reset email sent"
  });
};
