/* eslint-disable */
// import { axios, showAlert } from "./login";

// export
const forgotPassword = async (email) => {
  try {
    
    document.getElementById('loader').style.display = 'block';
    
    const res = await axios({
      method: "POST",
      url: "/api/v1/users/forgotPassword",
      data: {
        email,
      },
    });

    document.getElementById('loader').style.display = 'none';

    if (res.data.status === "success") {
      showAlert("success", "Check your mail!");
      window.setTimeout(() => {
        location.assign("/login");
      }, 1500);
    }
  } catch (err) {
    showAlert("error", err.response.data.message);
  }
};

document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value;
  forgotPassword(email);
});

// export
// const logout = async () => {
//   try {
//     const res = await axios({
//       method: "GET",
//       url: "/api/v1/users/logout",
//     });
//     if ((res.data.status = "success")) location.reload(true);
//   } catch (err) {
//     console.log(err.response);
//     showAlert("error", "Error logging out! Try again.");
//   }
// };

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
