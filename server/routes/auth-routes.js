const router = require("express").Router();
const authController = require("../controllers/auth-controller");

router
  .route("/authenticate", (req, res, next) => {
    const { authorization } = req.headers;

    const token = authorization?.slice("Bearer ".length);

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
  })
  .post(authController.authenticate);
router.route("/login").post(authController.login);
router.route("/register").post(authController.register);

module.exports = router;
