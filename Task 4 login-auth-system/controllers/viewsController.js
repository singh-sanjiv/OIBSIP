const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.index = catchAsync(async (req, res, next) => {
  res.status(200).render("index");
});

exports.contact = catchAsync(async (req, res, next) => {
  res.status(200).render("contact");
});

exports.dashboard = catchAsync(async (req, res, next) => {
  // console.log(res.locals.user.role);

  // const role  = JSON.stringify(res.locals.user.role);
  // console.log(role);

  // if (res.locals.user.role === "admin") {
  //   res.redirect('/admin/dashboard');
  // } else {
  res.status(200).render("dashboard", {
    user: res.locals.user,
    photo: res.locals.user.photo,
  });
  // }
});

exports.registerform = catchAsync(async (req, res, next) => {
  // console.log(res.locals.user.name);
  res.status(200).render("registerform");
});

exports.getLoginForm = (req, res) => {
  res.status(200).render("login");
};
exports.forgotPassword = (req, res) => {
  res.status(200).render("forgotPassword");
};
exports.myaccount = (req, res) => {
  res.status(200).render("my-account");
};

exports.renderResetPasswordForm = (req, res) => {
  res.status(200).render("resetPassword", {
    otp: req.params.otp,
  });
};
