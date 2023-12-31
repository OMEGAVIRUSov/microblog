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

    usernameH4.innerText = `${post.username}:`;
    textP.innerText = post.text;
    timeP.innerText = post.createdAt;

    postDiv.appendChild(usernameH4);
    postDiv.appendChild(textP);
    postDiv.appendChild(timeP);

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
        for(let post of data) {
            displayPost(post);
        }
      });
  }

  //event listeners
  logOutButton.addEventListener("click", logout);

  //call functions onload
  loadPosts();
}

window.onload = init;
