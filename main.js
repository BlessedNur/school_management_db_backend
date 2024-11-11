const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URL).then((connection) => {
  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  // ROUTES
  const authRoutes = require("./routes/auth.route");
  const courseRoutes = require("./routes/course.route");
  const userRoutes = require("./routes/user.route");

  const indexRoutes = require("./routes/index.route");
  app.use("/", indexRoutes);

  app.use("/api/auth", authRoutes);
  app.use("/api/courses", courseRoutes);
  app.use("/api/users", userRoutes);

  app.use((req, res, next) => {
    return res.status(404).json({
      status: "NOT_FOUND",
      status_code: 404,
      message: "Requested resources not found",
      data: {
        protocol: req.protocol,
        method: req.method.toUpperCase(),
        url: req.originalUrl,
      },
    });
  });

  app.use((error, req, res, next) => {
    const status_code = error.status || 500;
    return res.status(500).json({
      status: "ERROR",
      status_code: status_code,
      message: error.message,
      data: {
        protocol: req.protocol,
        method: req.method.toUpperCase(),
        url: req.originalUrl,
        error: error.stack,
      },
    });
  });
  app.listen(3001, () => {
    console.log("app listening on port 3001");
  });
});
