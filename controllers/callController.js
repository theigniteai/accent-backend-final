export const getCallHistory = (req, res) => {
  res.json([
    { id: 1, to: "+1234567890", status: "ended", duration: 120 },
    { id: 2, to: "+1987654321", status: "in-progress", duration: 30 }
  ]);
};

export const startCall = (req, res) => {
  res.json({ success: true, callId: 3, status: "started" });
};

export const endCall = (req, res) => {
  res.json({ success: true, callId: req.body.callId, status: "ended" });
};
