// DOM ELEMENTS
const userDataForm = document.querySelector(".form-user-data");
const userPasswordForm = document.querySelector(".form-user-password");

// DELEGATION
if (userDataForm) {
  userDataForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    console.log("User data form submitted");

    const name = document.getElementById("name").value;
    const email = document.getElementById("useremail").value;
    const phoneNumber = document.getElementById("usermobile").value;
    const dateOfBirth = document.getElementById("userbirthdate").value;

    console.log("Form data:", { name, email, phoneNumber, dateOfBirth });

    await userdataupdate(name, email, phoneNumber, dateOfBirth);
  });
}

if (userPasswordForm) {
  userPasswordForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    console.log("User password form submitted");

    document.querySelector(".btn--save-password").textContent = "Updating...";

    const passwordCurrent = document.getElementById("password-current").value;
    const password = document.getElementById("password-new").value;
    const passwordConfirm = document.getElementById("password-confirm").value;

    console.log("Password form data:", { passwordCurrent, password, passwordConfirm });

    await userpassupdate(passwordCurrent, password, passwordConfirm);

    document.querySelector(".btn--save-password").textContent = "Update";
    document.getElementById("password-current").value = "";
    document.getElementById("password-new").value = "";
    document.getElementById("password-confirm").value = "";
  });
}

// Function to update user data
const userdataupdate = async (name, email, phoneNumber, dateOfBirth) => {
  try {
    console.log("Sending user data update request...");
    const res = await axios({
      method: "PATCH",
      url: "/api/v1/users/updateMe",
      data: {
        name,
        email,
        phoneNumber,
        dateOfBirth
      },
    });

    console.log("Response from server:", res.data);

    if (res.data.status === "success") {
      showAlert("success", "Data updated successfully!");
      window.setTimeout(() => {
        location.assign("/my-account  ");
      }, 1500);
    } else {
      console.error("Error in response:", res.data);
      showAlert("error", res.data.message || "Failed to update.");
    }
  } catch (err) {
    console.error("Error in request:", err);
    showAlert("error", err.response ? err.response.data.message : err.message);
  }
};

// Function to update user password
const userpassupdate = async (passwordCurrent, password, passwordConfirm) => {
  try {
    console.log("Sending user password update request...");
    const res = await axios({
      method: "PATCH",
      url: "/api/v1/users/updateMyPassword",
      data: {
        passwordCurrent,
        password,
        passwordConfirm,
      },
    });

    console.log("Response from server:", res.data);

    if (res.data.status === "success") {
      showAlert("success", "Password updated successfully!");
      window.setTimeout(() => {
        location.assign("/dashboard");
      }, 1500);
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
