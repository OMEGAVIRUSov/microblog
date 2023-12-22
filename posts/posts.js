/* Posts Page JavaScript */

"use strict";

function init() {
  //get HTML
  const logOutButton = document.querySelector("#log-out-button");
  const postsDiv = document.querySelector("#postsDiv");

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
