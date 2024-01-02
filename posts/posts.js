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
    likeButton.setAttribute("data-post-id", post._id);
    likeButton.addEventListener("click", function () {
      likePost(this);
    });

    removeLikeButton.textContent = `Remove Like`;
    removeLikeButton.setAttribute("data-post-id", post._id);
    removeLikeButton.addEventListener("click", function () {
      removeLikePost(this);
    });

    if (post.username == getUserName()) {
      const deletePostButton = document.createElement("button");

      deletePostButton.textContent = `Delete Post`;
      deletePostButton.setAttribute("data-post-id", post._id);
      deletePostButton.addEventListener("click", function () {
        deletePost(this);
      });

      postDiv.appendChild(deletePostButton);
    }

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

  // function updatePage() {
  //   // Get the current scroll position before reloading
  //   const scrollPosition = window.scrollY;

  //   // Reload the page
  //   location.reload();

  //   // Set the scroll position back to where it was after the reload
  //   window.scrollTo(0, scrollPosition);
  // }

  function likePost(likeBtn) {
    const postID = likeBtn.getAttribute("data-post-id");

    const postBody = {
      postId: postID,
    };

    const token = getToken();

    fetch(`${apiBaseURL}/api/likes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(postBody),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // updatePage();
      });
  }

  function removeLikePost(removeLikeBtn) {
    const postID = removeLikeBtn.getAttribute("data-post-id");

    const token = getToken();

    function deleteLike(likeID) {
      fetch(`${apiBaseURL}/api/likes/${likeID}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      // .then((response) => response.json())
      // .then((data) => {
      //   console.log(data);
      // });
    }

    fetch(`${apiBaseURL}/api/posts/${postID}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        for (let like of data.likes) {
          if (like.username == getUserName()) {
            deleteLike(like._id);
          }
        }
        // updatePage();
      });
  }

  function deletePost(deleteButton) {
    const postID = deleteButton.getAttribute("data-post-id");

    const token = getToken();


    fetch(`${apiBaseURL}/api/posts/${postID}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    // .then((response) => response.json())
    // .then((data) => {
    //   console.log(data);
    // });
  }

  //event listeners
  logOutButton.addEventListener("click", logout);
  // likeButton.addEventListener("click", likePost)
  // removeLikeButton.addEventListener("click", removeLikePost)

  //call functions onload
  loadPosts();
}

window.onload = init;
