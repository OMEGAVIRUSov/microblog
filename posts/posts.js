/* Posts Page JavaScript */

"use strict";

function init() {
  //get HTML
  const logOutButton = document.querySelector("#log-out-button");
  const postsDiv = document.querySelector("#posts-div");

  const sortBySelect = document.querySelector("#sort-by-select");
  const usernameSelect = document.querySelector("#username-select");

  //functions
  //functions defined in loadPosts.js

  //event listeners
  logOutButton.addEventListener("click", logout);
  sortByForm.addEventListener("change", loadPosts);
  usernameSelect.addEventListener("change", loadPosts);

  //call functions onload
  loadPosts();
  loadUsernameSelect();
}

window.onload = init;
