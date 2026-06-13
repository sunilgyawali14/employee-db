const authMiddleware = (req, res, next) => {
  try {
    const apiKey = req.headers["x-api-key"];
    
    if (!apiKey || apiKey !== process.env.API_KEY) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized - Invalid API Key",
      });
    }
    
    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Authentication error",
      error: error.message,
    });
  }
};

module.exports = authMiddleware;