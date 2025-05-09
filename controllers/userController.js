// get profile, update settings
export const getProfile = (req, res) => {
  res.json({
    name: "Admin",
    email: "admin@accentshift.ai",
    assistantEnabled: true,
    voiceId: "elevenlabs-id",
    subscription: "Pro"
  });
};

export const updateSettings = (req, res) => {
  // Save assistantEnabled, voiceId, password
  res.json({ message: "Settings updated (demo)" });
};
