/* Posts Page JavaScript */

"use strict";

function init() {
  //get HTML
  const logOutButton = document.querySelector("#log-out-button");
  const postsDiv = document.querySelector("#posts-div");

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

  function displayPost(post) {
    const postDiv = document.createElement("div");
    const usernameH4 = document.createElement("h4");
    const textP = document.createElement("p");
    const timeP = document.createElement("p");
    const likesP = document.createElement("p");
    const likeButton = document.createElement("button");
    const removeLikeButton = document.createElement("button");


    usernameH4.innerText = `${post.username}:`;
    textP.innerText = post.text;
    timeP.innerText = post.createdAt;
    likesP.innerText = `Likes: ${post.likes.length}`;

    likeButton.textContent = `Like`;
    likeButton.setAttribute('data-post-id', post._id);
    likeButton.addEventListener('click', function () {
      likePost(this);
    });

    removeLikeButton.textContent = `Remove Like`;
    removeLikeButton.setAttribute('data-post-id', post._id);
    removeLikeButton.addEventListener('click', function () {
      removeLikePost(this);
    });


    postDiv.appendChild(usernameH4);
    postDiv.appendChild(textP);
    postDiv.appendChild(timeP);
    postDiv.appendChild(likesP);
    postDiv.appendChild(likeButton);
    postDiv.appendChild(removeLikeButton);


    postDiv.classList.add("post");

    postsDiv.appendChild(postDiv);
  }

  function loadPosts() {
    // const userName = getUserName();
    const token = getToken();

    fetch(`${apiBaseURL}/api/posts`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        for (let post of data) {
          displayPost(post);
        }
      });
  }

  function likePost(likeBtn) {
    const postId = likeBtn.getAttribute("data-post-id");
    
  }

  function removeLikePost(removeLikeBtn) {
    const postId = removeLikeBtn.getAttribute("data-post-id");
  }

  //event listeners
  logOutButton.addEventListener("click", logout);
  // likeButton.addEventListener("click", likePost)
  // removeLikeButton.addEventListener("click", removeLikePost)

  //call functions onload
  loadPosts();
}

window.onload = init;
