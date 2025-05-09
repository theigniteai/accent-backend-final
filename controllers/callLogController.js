// accent call log save + fetch
export const saveCallLog = (req, res) => {
  const { accentUsed, duration } = req.body;

  if (!accentUsed || !duration) {
    return res.status(400).json({ error: "Missing data" });
  }

  res.status(201).json({ message: "Call log saved (demo)" });
};

export const getCallLogs = (req, res) => {
  res.json([
    {
      accentUsed: "US",
      duration: 45,
      date: new Date()
    },
    {
      accentUsed: "UK",
      duration: 60,
      date: new Date()
    }
  ]);
};
