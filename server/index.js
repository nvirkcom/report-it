require("dotenv").config();
const express = require("express");
const app = express();

app.listen(process.env.PORT || 8080, () =>
  console.log("Report It Server Running")
);

app.all("*", (_req, res) => {
  res.status(404).json({ message: "Invalid Endpoint" });
});
