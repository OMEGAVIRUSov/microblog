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
    const infoDiv = document.createElement("div");
    const likesDiv = document.createElement("div");
    const likesInnerContainerA = document.createElement("div");
    const likesInnerContainerB = document.createElement("div");
    const usernameH4 = document.createElement("h4");
    const textP = document.createElement("p");
    const timeP = document.createElement("p");

    const likeButton = document.createElement("button");
    const removeLikeButton = document.createElement("button");

    const likeButtonImg = document.createElement("img");
    const unlikeButtonImg = document.createElement("img");

    const profileIcon = document.createElement("img");

    infoDiv.className = "info-div";
    likesDiv.className = "likes-container";

    profileIcon.src = "/assets/profileIcon.svg";
    profileIcon.className = "post-profile-icon";

    postDiv.appendChild(profileIcon);

    usernameH4.innerText = `${post.username}:`;
    textP.innerText = post.text;
    textP.className = "post-text";
    timeP.innerText = post.createdAt;

    likeButtonImg.src = "/assets/LikeButton.svg";
    likeButton.className = "likes-button";

    likeButton.setAttribute("data-post-id", post._id);
    likeButton.addEventListener("click", function () {
      likePost(this);
    });

    likeButton.appendChild(likeButtonImg);

    unlikeButtonImg.src = "/assets/UnLikeButton.svg";
    removeLikeButton.className = "likes-button";

    removeLikeButton.setAttribute("data-post-id", post._id);
    removeLikeButton.addEventListener("click", function () {
      removeLikePost(this);
    });

    removeLikeButton.appendChild(unlikeButtonImg);

    if (post.username == getUserName()) {
      const deletePostButton = document.createElement("button");

      deletePostButton.textContent = `Delete Post`;
      deletePostButton.setAttribute("data-post-id", post._id);
      deletePostButton.addEventListener("click", function () {
        deletePost(this);
      });

      infoDiv.appendChild(deletePostButton);
    }

    
    infoDiv.appendChild(usernameH4);
    infoDiv.appendChild(textP);
    infoDiv.appendChild(timeP);

    likesInnerContainerA.className = "likes-inner-container";
    likesInnerContainerB.className = "likes-inner-container";

    likesInnerContainerA.appendChild(likeButton);
    likesInnerContainerA.appendChild(removeLikeButton);
    

    if (post.likes.length > 0) {
      const likesP = document.createElement("p");
      const likesSelect = document.createElement("select");

      likesSelect.className = "likes-select";

      likesP.className = "likes-amount"
      likesP.innerText = `${post.likes.length}`;

      let firstOption = new Option("Liked By");
      likesSelect.appendChild(firstOption);

      for(let like of post.likes) {
        let option = new Option(like.username, like.username);
        likesSelect.appendChild(option);
      }


      likesInnerContainerA.appendChild(likesP);
      
      likesInnerContainerB.appendChild(likesSelect)
    }


    likesDiv.appendChild(likesInnerContainerA);

    if (likesInnerContainerB.innerHTML == "") {
      likesInnerContainerB.style.display = "none";
      likesInnerContainerA.style.width = "100%";
    } else {
      likesDiv.appendChild(likesInnerContainerB);
    };
    

    postDiv.appendChild(infoDiv);
    postDiv.appendChild(likesDiv);
    postDiv.classList.add("post");

    //apend everything to the main post list
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

  //call functions onload
  loadPosts();
}

window.onload = init;
