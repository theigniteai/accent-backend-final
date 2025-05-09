// ai assistant stream logic
export const aiRespond = async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required" });
  }

  // Dummy response — integrate GPT + ElevenLabs here
  res.json({
    voiceResponse: "This is a simulated voice response for: " + prompt
  });
};
