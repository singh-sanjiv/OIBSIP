// import axios from "axios";
// const axios = require("js/axios.min.js");
// import { displayMap } from "./mapbox";
// import { login, logout } from "./login";
// import { updateSettings } from "./updateSettings";
// import { showAlert } from "./alerts";

// DOM ELEMENTS
const userDataForm = document.querySelector(".form-user-data");
const userPasswordForm = document.querySelector(".form-user-password");

// DELEGATION
if (userDataForm)
  userDataForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let form = new FormData();
    form.append("name", document.getElementById("name").value);
    form.append("email", document.getElementById("useremail").value);
    form.append("phoneNumber", document.getElementById("usermobile").value);
    form.append("dateOfBirth", document.getElementById("userbirthdate").value);
    
    // for (let [key, value] of form.entries()) {
    //   alert(`${key}: ${value}`);
    // }

    updateSettings(form, "data");
  });

if (userPasswordForm)
  userPasswordForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    document.querySelector(".btn--save-password").textContent = "Updating...";

    const passwordCurrent = document.getElementById("password-current").value;
    const password = document.getElementById("password-new").value;
    const passwordConfirm = document.getElementById("password-confirm").value;
    await updateSettings(
      { passwordCurrent, password, passwordConfirm },
      "password",
    );

    document.querySelector(".btn--save-password").textContent = "Update";
    document.getElementById("password-current").value = "";
    document.getElementById("password").value = "";
    document.getElementById("password-confirm").value = "";
  });

const alertMessage = document.querySelector("body").dataset.alert;
if (alertMessage) alert("success", alertMessage, 20);

// updateSettings

// type is either 'password' or 'data'

const updateSettings = async (data, type) => {
  try {
    const url =
      type === "password"
        ? "/api/v1/users/updateMyPassword"
        : "/api/v1/users/updateMe";

// Log the data being sent
if (data instanceof FormData) {
  for (let [key, value] of data.entries()) {
    alert(`Sending ${key}: ${value}`);
  }
} else {
  alert("Sending data:", data);
}

    const res = await axios({
      method: "PATCH",
      url,
      data,
    });
 
    console.log("Response from server:", res);
    console.log("Response from server:", res.data);

    if (res.data.status === "success") {
      showAlert("success", `${type.toUpperCase()} updated successfully!`);
    } else {
      console.error("Error in response:", res.data);
      showAlert("error", res.data.message || "Failed to update.");
    }
  } catch (err) {
    console.error("Error in request:", err);
    showAlert("error", err.response ? err.response.data.message : err.message);
  }

};

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
