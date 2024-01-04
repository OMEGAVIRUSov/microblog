"use strict";

function init() {
  //html elements
  const usernameP = document.querySelector("#username");
  const fullNameP = document.querySelector("#fullName");
  const bioP = document.querySelector("#bio");
  const logOutButton = document.querySelector("#log-out-button");

  const postsDiv = document.querySelector("#posts-div");



  const editButton = document.querySelector("#edit-button");
  const cancelEditButton = document.querySelector("#cancel-edit-button");

  const saveUserInfoButton = document.querySelector("#save-user-info-button");

  const usernameDisplayP = document.querySelector("#username-display-p");
  const fullNameInput = document.querySelector("#name-input");
  const bioTextarea = document.querySelector("#bio-textarea");
  const passwordInput = document.querySelector("#password-input");

  const sortBySelect = document.querySelector("#sort-by-select");


  const editAccountDetailsModal = document.querySelector("#edit-account-details");

  // functions
  function getUserInfoToDisplay() {
    const userName = getUserName();
    const token = getToken();

    fetch(`${apiBaseURL}/api/users/${userName}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        displayUserInfo(data);
      });
  }

  function displayUserInfo(user) {
    usernameP.innerText = `@${user.username}`;
    fullNameP.innerText = user.fullName;
    bioP.innerText = user.bio;
  }



  
  //edit user information functions
  function populateEditForm(user) {
    usernameDisplayP.innerText = user.username;
    fullNameInput.value = user.fullName;
    bioTextarea.value = user.bio;
    passwordInput.value = "";
  }

  function getUserInfoToEdit() {
    const userName = getUserName();
    const token = getToken();

    fetch(`${apiBaseURL}/api/users/${userName}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        populateEditForm(data);
      });
  }

  //toggle
  function showEditUserInfo() {
    getUserInfoToEdit();

    editAccountDetailsModal.style.display = "flex";
    /* userInfoDiv.style.display = "none";
    editButton.style.display = "none";

    cancelEditButton.style.display = "block";
    editUserInfoDiv.style.display = "block"; */
  }

  function hideEditUserInfo() {
    editAccountDetailsModal.style.display = "none";

    /* cancelEditButton.style.display = "none";
    editUserInfoDiv.style.display = "none";

    userInfoDiv.style.display = "block";
    editButton.style.display = "block"; */
  }

  function buildUser() {
    let user = {
      password: passwordInput.value,
      bio: bioTextarea.value,
      fullName: fullNameInput.value,
    };

    return user;
  }

  async function updateUser() {
    const user = buildUser();
    const token = getToken();

    fetch(apiBaseURL + "/api/users/" + getUserName(), {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        hideEditUserInfo();
        displayUserInfo(data);
      });
  }

  //function calls for window onload
  getUserInfoToDisplay();
  loadPosts();

  //add event listeners
  logOutButton.addEventListener("click", logout);
  
  
  
  saveUserInfoButton.addEventListener("click", updateUser);
  editButton.addEventListener("click", showEditUserInfo);
  cancelEditButton.addEventListener("click", hideEditUserInfo);
  sortBySelect.addEventListener("change", loadPosts);
}

window.onload = init;
