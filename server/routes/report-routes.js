const jwt = require("jsonwebtoken");
const router = require("express").Router();
const reportController = require("./../controllers/report-controllers");

router.use((req, res, next) => {
  const { authorization } = req.headers;

  const token = authorization.slice("Bearer ".length);

  if (!token)
    return res.status(401).json({
      message: "Missing Token",
    });

  try {
    const payload = jwt.verify(token, process.env.SECRET_KEY);
    req.user_id = payload.id;
    next();
  } catch (error) {
    res.status(401).json({
      message: "Invalid Token",
    });
  }
});

router.route("/").get(reportController.index).post(reportController.add);
router
  .route("/:id")
  .delete(reportController.remove)
  .get(reportController.findOne)
  .put(reportController.update);

module.exports = router;
