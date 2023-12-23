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

  function getUserInfo() {
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
    createPostButton.style.display = "block"
  }

  function hideTextarea () {
    clearTextarea();
    showNewPostButton.style.display = "block";
    cancelPostButton.style.display = "none";
    newPostTextarea.style.display = "none";
    createPostButton.style.display = "none"
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

  //function calls for window onload
  getUserInfo();
  loadUserPosts();

  //add event listeners
  logOutButton.addEventListener("click", logout);
  createPostButton.addEventListener("click", createPost);
  showNewPostButton.addEventListener("click", showTextarea);
  cancelPostButton.addEventListener("click", hideTextarea)
}

window.onload = init;
