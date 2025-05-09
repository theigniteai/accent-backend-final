export const getProfile = (req, res) => {
  // stubbed user info
  res.json({
    id: "user123",
    name: "John Doe",
    email: "john@example.com",
    subscription: "Pro Plan",
  });
};

export const updateProfile = (req, res) => {
  // accept any body, echo back
  res.json({
    success: true,
    updated: req.body
  });
};
