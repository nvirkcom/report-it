require("dotenv").config();
const authRoutes = require("./routes/auth-routes");
const express = require("express");
const reportRoutes = require("./routes/report-routes");
const app = express();

app.listen(process.env.PORT || 8080, () =>
  console.log("Report It Server Running")
);

app.use(express.json());

app.use("/auth", authRoutes);
app.use("/reports", reportRoutes);

app.all("*", (_req, res) => {
  res.status(404).json({ message: "Invalid Endpoint" });
});
