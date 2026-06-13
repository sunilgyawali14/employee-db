require("dotenv").config();
const app = require("./src/app");

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`
╔═══════════════════════════════════════╗
║   Employee Database API Started       ║
║   Server running on port: ${PORT}     ║
║   Environment: ${process.env.NODE_ENV}          ║
╚═══════════════════════════════════════╝
  `);
});

// Handle unhandled rejections
process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection:", err);
  process.exit(1);
});