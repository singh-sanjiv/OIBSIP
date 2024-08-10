const express = require("express");
const viewsController = require("../controllers/viewsController");
const authController = require("../controllers/authController");

const router = express.Router();

// router.use(viewsController.alerts);
// router.get('/tour/:slug', authController.isLoggedIn, viewsController.getTour);

router.get(["/", "/index"], viewsController.index);
router.get("/contact", viewsController.contact);
router.get("/login", authController.isLoggedIn, viewsController.getLoginForm);

router.get("/register", viewsController.registerform);
router.get(
  "/forgotPassword",
  authController.isLoggedIn,
  viewsController.forgotPassword,
);
router.get("/resetPassword/:otp", viewsController.renderResetPasswordForm);
router.get("/dashboard", authController.protect, viewsController.dashboard);
// router.get("/admin/dashboard",authController.restrictTo("admin"), viewsController.admindashboard);

router.get("/my-account", authController.protect, viewsController.myaccount);

// router.get(
//   "/all-users",
//   authController.protect,
//   authController.restrictTo("admin"),
//   viewsController.allusers,
// );

module.exports = router;
