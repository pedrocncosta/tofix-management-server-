// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv/config");

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

const app = express();

const { isAuthenticated } = require("./middleware/jwt.middleware");

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

// 👇 Start handling routes here
// Contrary to the views version, all routes are controlled from the routes/index.js
const allRoutes = require("./routes/index.routes");
app.use("/api", allRoutes);
const authRoutes = require("./routes/auth.routes.js");
app.use("/auth", authRoutes);
const categoryRoutes = require("./routes/categories.routes.js");
app.use("/api", isAuthenticated, categoryRoutes);
const profileRoutes = require("./routes/profile.routes");
app.use("/api", isAuthenticated, profileRoutes);
const commentRoutes = require("./routes/comment.routes");
app.use("/api", isAuthenticated, commentRoutes);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
