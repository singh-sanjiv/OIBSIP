/* eslint-disable */
// import axios from 'axios';
// import { showAlert } from "./login";

// Ensure axios is imported
// import axios from 'axios';

const forgotPassword = async (newPassword, passwordConfirm) => {
  try {
    const res = await axios({
      method: "PATCH",
      url: `/api/v1/users/resetPassword/${encodeURIComponent(otp)}`,
      data: {
        newPassword,
        passwordConfirm,
      },
    });

    console.log(res); // Log the response to see what you get back

    if (res.data && res.data.status === "success") {
      showAlert("success", "Password Changed Successfully!");
      window.setTimeout(() => {
        location.assign("/login");
      }, 1500);
    } else {
      throw new Error('Unexpected response structure');
    }
  } catch (err) {
    console.log(err); // Log the error for debugging
    const errorMsg = err.response && err.response.data && err.response.data.message 
      ? err.response.data.message 
      : 'An unknown error occurred';
    showAlert("error", errorMsg);
  }
};

document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();
  const newPassword = document.getElementById('newPassword').value;
  const passwordConfirm = document.getElementById('passwordConfirm').value;
  forgotPassword(newPassword, passwordConfirm);
});

// Function to show alerts
const hideAlert = () => {
  const el = document.querySelector('.alert');
  if (el) el.parentElement.removeChild(el);
};

// type is 'success' or 'error'
const showAlert = (type, msg, time = 7) => {
  hideAlert();
  const markup = `<div class="alert alert--${type}">${msg}</div>`;
  document.querySelector('body').insertAdjacentHTML('afterbegin', markup);
  window.setTimeout(hideAlert, time * 1000);
};
