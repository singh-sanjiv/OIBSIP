// import axios from "axios";

// Function to register user
const register = async (
  name,
  email,
  phoneNumber,
  dateOfBirth,
  password,
  passwordConfirm,
) => {
  try {
    const res = await axios({
      method: "POST",
      url: "/api/v1/users/signup", // Adjust the URL to your registration endpoint
      data: {
        name,
        email,
        phoneNumber,
        dateOfBirth,
        password,
        passwordConfirm,
      },
    });

    if (res.data.status === "success") {
      showAlert("success", "Registered successfully!");
      window.setTimeout(() => {
        location.assign("/dashboard"); // Redirect to dashboard or any other page
      }, 1500);
    }
  } catch (err) {
    showAlert("error", err.response.data.message || "Something went wrong!");
  }
};

// Event listener for form submission
document.getElementById("userForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("inputName").value;
  const email = document.getElementById("inputEmail").value;
  const phoneNumber = document.getElementById("inputPhoneNumber").value;
  const dateOfBirth = document.getElementById("inputDateOfBirth").value;
  const password = document.getElementById("inputPassword").value;
  const passwordConfirm = document.getElementById("inputPasswordConfirm").value;

  if (password !== passwordConfirm) {
    return showAlert("error", "Passwords do not match!");
  }

  register(name, email, phoneNumber, dateOfBirth, password, passwordConfirm);
});

// Function to show alerts
const hideAlert = () => {
  const el = document.querySelector(".alert");
  if (el) el.parentElement.removeChild(el);
};

// type is 'success' or 'error'
const showAlert = (type, msg, time = 7) => {
  hideAlert();
  const markup = `<div class="alert alert--${type}">${msg}</div>`;
  document.querySelector("body").insertAdjacentHTML("afterbegin", markup);
  window.setTimeout(hideAlert, time * 1000);
};

const logout = async () => {
  try {
    const res = await axios({
      method: "GET",
      url: "/api/v1/users/logout",
    });
    if ((res.data.status = "success")) window.location.href = "/login";
  } catch (err) {
    console.log(err.response);
    showAlert("error", "Error logging out! Try again.");
  }
};
