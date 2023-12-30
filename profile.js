"use strict";

function init() {
  //html elements
  const usernameP = document.querySelector("#username");
  const fullNameP = document.querySelector("#fullName");
  const bioP = document.querySelector("#bio");
  const logOutButton = document.querySelector("#log-out-button");

  const postsDiv = document.querySelector("#posts-div");

  const showNewPostButton = document.querySelector("#show-new-post-button");
  const cancelPostButton = document.querySelector("#cancel-post-button");
  const newPostTextarea = document.querySelector("#new-post-textarea");
  const createPostButton = document.querySelector("#create-post-button");

  const editButton = document.querySelector("#edit-button");
  const cancelEditButton = document.querySelector("#cancel-edit-button");
  const userInfoDiv = document.querySelector("#user-info-div");
  const editUserInfoDiv = document.querySelector("#edit-user-info-div");
  const saveUserInfoButton = document.querySelector("#save-user-info-button");

  const usernameDisplayP = document.querySelector("#username-display-p");
  const fullNameInput = document.querySelector("#name-input");
  const bioTextarea = document.querySelector("#bio-textarea");
  const passwordInput = document.querySelector("#password-input");

  //functions
  function getUserName() {
    let userData = getLoginData();

    return userData.username;
  }

  function getToken() {
    let userData = getLoginData();

    console.log(userData);
    return userData.token;
  }

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
    usernameP.innerText = user.username;
    fullNameP.innerText = user.fullName;
    bioP.innerText = user.bio;
  }

  //show posts functions
  function buildPost(post) {
    const postDiv = document.createElement("div");
    const usernameH4 = document.createElement("h4");
    const textP = document.createElement("p");

    usernameH4.innerText = `${post.username}:`;
    textP.innerText = post.text;

    postDiv.appendChild(usernameH4);
    postDiv.appendChild(textP);

    postDiv.classList.add("post");

    return postDiv;
  }

  function displayPost(post) {
    const postDiv = buildPost(post);

    postsDiv.appendChild(postDiv);
  }

  function displayPostFirst(post) {
    const postDiv = buildPost(post);

    postsDiv.prepend(postDiv);
  }

  function loadUserPosts() {
    const userName = getUserName();
    const token = getToken();

    fetch(`${apiBaseURL}/api/posts`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        for (let post of data) {
          if (userName == post.username) {
            displayPost(post);
          }
        }
      });
  }

  //toggle Create Post functions
  function clearTextarea() {
    newPostTextarea.value = "";
  }

  function showTextarea() {
    showNewPostButton.style.display = "none";
    cancelPostButton.style.display = "block";
    newPostTextarea.style.display = "block";
    createPostButton.style.display = "block";
  }

  function hideTextarea() {
    clearTextarea();
    showNewPostButton.style.display = "block";
    cancelPostButton.style.display = "none";
    newPostTextarea.style.display = "none";
    createPostButton.style.display = "none";
  }

  //create post functions
  function createPost() {
    const post = {
      text: newPostTextarea.value,
    };

    clearTextarea();

    savePost(post);
  }

  function savePost(post) {
    const token = getToken();

    fetch(`${apiBaseURL}/api/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(post),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        displayPostFirst(data);
      });
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

    userInfoDiv.style.display = "none";
    editButton.style.display = "none";

    cancelEditButton.style.display = "block";
    editUserInfoDiv.style.display = "block";
  }

  function hideEditUserInfo() {
    cancelEditButton.style.display = "none";
    editUserInfoDiv.style.display = "none";

    userInfoDiv.style.display = "block";
    editButton.style.display = "block";
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
  loadUserPosts();

  //add event listeners
  logOutButton.addEventListener("click", logout);
  createPostButton.addEventListener("click", createPost);
  showNewPostButton.addEventListener("click", showTextarea);
  cancelPostButton.addEventListener("click", hideTextarea);
  saveUserInfoButton.addEventListener("click", updateUser);
  editButton.addEventListener("click", showEditUserInfo);
  cancelEditButton.addEventListener("click", hideEditUserInfo);
}

window.onload = init;
