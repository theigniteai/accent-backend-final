export const callAiAssistant = (req, res) => {
  // stub: echo back prompt
  const { prompt } = req.body;
  res.json({
    success: true,
    response: `🤖 Stubbed AI says: “You said: ${prompt}”`
  });
};
