const userInfoDiv = document.querySelector("#user-info-div");
const editUserInfoDiv = document.querySelector("#edit-user-info-div");
const createPostModal = document.querySelector("#create-post-modal");
const newPostTextarea = document.querySelector("#new-post-textarea");
const showNewPostButton = document.querySelector("#show-new-post-button");
const cancelPostButton = document.querySelector("#cancel-post-button");
const createPostButton = document.querySelector("#create-post-button");

//toggle Create Post functions
function clearTextarea() {
    newPostTextarea.value = "";
  }

  function showTextarea() {
    /* showNewPostButton.style.display = "none";
    cancelPostButton.style.display = "block";
    newPostTextarea.style.display = "block";
    createPostButton.style.display = "block"; */

    createPostModal.style.display = "flex";
  }

  function hideTextarea() {
    clearTextarea();
    /* showNewPostButton.style.display = "block";
    cancelPostButton.style.display = "none";
    newPostTextarea.style.display = "none";
    createPostButton.style.display = "none"; */

    createPostModal.style.display = "none";
  }

  //create post functions
  function createPost() {
    const post = {
      text: newPostTextarea.value,
    };

    hideTextarea();

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

  function displayPostFirst(post) {
    const postDiv = buildPost(post);

    postsDiv.prepend(postDiv);
  }

  createPostButton.addEventListener("click", createPost);
  showNewPostButton.addEventListener("click", showTextarea);
  cancelPostButton.addEventListener("click", hideTextarea);