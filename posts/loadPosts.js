const postsDiv = document.querySelector("#posts-div");

const sortBySelect = document.querySelector("#sort-by-select");
const sortByForm = document.querySelector("#sort-by-form");

function buildPost(post) {
  const postDiv = document.createElement("div");
  const infoDiv = document.createElement("div");
  const likesDiv = document.createElement("div");
  const likesInnerContainerA = document.createElement("div");
  const likesInnerContainerB = document.createElement("div");
  const likesInnerContainerC = document.createElement("div");
  const likesInnerContainerD = document.createElement("div");
  const usernameH4 = document.createElement("h4");
  const textP = document.createElement("p");
  const timeP = document.createElement("p");
  const likeButton = document.createElement("button");
  const removeLikeButton = document.createElement("button");

  const likeButtonImg = document.createElement("img");
  const unlikeButtonImg = document.createElement("img");

  const profileIcon = document.createElement("img");
  profileIcon.addEventListener("click", function () {
    if (getUserName() == post.username) {
      window.location.href = `/profile.html`;
    } else {
      window.location.href = `/profile.html?username=${post.username}`;
    }
  });

  infoDiv.className = "info-div";
  likesDiv.className = "likes-container";

  profileIcon.src = "/assets/navProfileIconTest (1).svg";
  profileIcon.className = "post-profile-icon";

  postDiv.appendChild(profileIcon);

  usernameH4.innerText = `@${post.username}:`;
  usernameH4.className = "clickable-text";
  usernameH4.addEventListener("click", function () {
    if (getUserName() == post.username) {
      window.location.href = `/profile.html`;
    } else {
      window.location.href = `/profile.html?username=${post.username}`;
    }
  });

  textP.innerText = post.text;
  textP.className = "post-text";
  timeP.innerText = new Date(post.createdAt).toLocaleString();

  likeButtonImg.src = "/assets/LikeButton.svg";
  likeButton.className = "likes-button";

  likeButton.setAttribute("data-post-id", post._id);
  likeButton.addEventListener("click", function () {
    likePost(this);
    likeButton.style.display = "none";
    removeLikeButton.style.display = "block";
  });

  likeButton.appendChild(likeButtonImg);

  unlikeButtonImg.src = "/assets/UnLikeButton.svg";
  removeLikeButton.className = "likes-button";

  removeLikeButton.setAttribute("data-post-id", post._id);
  removeLikeButton.addEventListener("click", function () {
    removeLikePost(this);
    likeButton.style.display = "block";
    removeLikeButton.style.display = "none";
  });

  removeLikeButton.appendChild(unlikeButtonImg);

  infoDiv.appendChild(usernameH4);

  // Media code
  //
  const mediaDiv = document.createElement("div");
  mediaDiv.setAttribute("data-post-id", post._id);

  //   const mediaNavDiv = document.createElement("div");

  // Regular expression to extract the media URL
  const imageUrlRegex = /(https?:\/\/[^\s]+)/g;
  const mediaUrls = post.text.match(imageUrlRegex);

  const mediaElemObj = {
    postId: post._id,
    array: [],
  };

  currentIndex = 0;

  let urlList = [];

  if (mediaUrls) {
    mediaUrls.forEach((url) => {
      const elem = getMediaElem(url);
      if (elem) {
        mediaElemObj.array.push(getMediaElem(url));
        urlList.push(url);
      }
    });
  }

  //appends the text that is not a url
  if (urlList.length) {
    urlList.forEach((url) => {
      textP.innerText = textP.innerText.replace(url, "");
    });
  }

  infoDiv.appendChild(textP);

  if (mediaElemObj.array.length) {
    mediaDiv.appendChild(mediaElemObj.array[currentIndex]);
  }

  function showMedia(index) {
    mediaDiv.firstChild.replaceWith(mediaElemObj.array[index]);
  }

  const nextButton = document.createElement("button");
  nextButton.textContent = ">";
  nextButton.className = "scroll-images-button";
  nextButton.setAttribute("data-post-id", post._id);
  nextButton.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % mediaElemObj.array.length;
    showMedia(currentIndex);
  });

  const previousButton = document.createElement("button");
  previousButton.textContent = "<";
  previousButton.className = "scroll-images-button";
  previousButton.setAttribute("data-post-id", post._id);
  previousButton.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + mediaElemObj.array.length) % mediaElemObj.array.length;
    showMedia(currentIndex);
  });

  const multiMediaDiv = document.createElement("div");
  multiMediaDiv.className = "multi-media-div";

  if (mediaElemObj.array.length > 1) {
    multiMediaDiv.appendChild(previousButton);
    multiMediaDiv.appendChild(mediaDiv);
    multiMediaDiv.appendChild(nextButton);

    infoDiv.appendChild(multiMediaDiv);
  } else {
    infoDiv.appendChild(mediaDiv);
  }
  //
  // End of media code

  infoDiv.appendChild(timeP);

  likesInnerContainerA.className = "likes-inner-container";
  likesInnerContainerB.className = "likes-inner-container";
  likesInnerContainerC.className = "likes-inner-container-header";
  likesInnerContainerD.className = "likes-inner-container-footer";

  if (post.likes && post.likes.length > 0) {
    let wasIn = false;
    const likesP = document.createElement("p");
    const likesSelect = document.createElement("select");

    likesSelect.className = "likes-select";

    likesP.className = "likes-amount";
    likesP.innerText = `${post.likes.length}`;

    let firstOption = new Option("Liked By");
    likesSelect.appendChild(firstOption);

    for (let like of post.likes) {
      let option = new Option(like.username, like.username);
      likesSelect.appendChild(option);

      if (getLoginData().username == like.username) {
        wasIn = true;
      }

      if (wasIn == true) {
        likesInnerContainerA.appendChild(removeLikeButton);
      } else {
        likesInnerContainerA.appendChild(likeButton);
      }
    }

    likesInnerContainerB.appendChild(likesP);
    likesInnerContainerD.appendChild(likesSelect);
  }

  if (likesInnerContainerA.innerHTML == "") {
    likesInnerContainerA.appendChild(likeButton);
  }
  likesInnerContainerC.appendChild(likesInnerContainerA);

  if (likesInnerContainerB.innerHTML == "") {
    likesInnerContainerB.style.display = "none";
    likesInnerContainerB.style.display = "none";
    likesInnerContainerA.style.width = "100%";
    likesInnerContainerC.style.height = "100%";
  } else {
    likesInnerContainerC.appendChild(likesInnerContainerB);
  }

  if (post.username == getLoginData().username || getUsernameUrlParam() == getLoginData().username) {
    const deletePostButton = document.createElement("button");
    const deletePostIcon = document.createElement("img");

    deletePostIcon.src = "/assets/trashIcon (1).svg";
    deletePostButton.className = `delete-button`;

    deletePostButton.setAttribute("data-post-id", post._id);
    deletePostButton.addEventListener("click", function () {
      deletePost(this);
    });

    deletePostButton.appendChild(deletePostIcon);
    likesInnerContainerA.appendChild(deletePostButton);
    likesDiv.style.height = "11rem";
  }

  likesDiv.appendChild(likesInnerContainerC);
  likesDiv.appendChild(likesInnerContainerD);

  //add to likes container
  postDiv.appendChild(infoDiv);
  postDiv.appendChild(likesDiv);
  postDiv.classList.add("post");

  postDiv.setAttribute("data-post-id", post._id);

  //return post Div so it can be appended to the main post list
  return postDiv;
}

function displayPost(post) {
  const postDiv = buildPost(post);

  postsDiv.appendChild(postDiv);
}

function loadPosts() {
  clearPostsDiv();
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
      sortPosts(refinePosts(data));
    });
}

function updatePage(postID) {
  for (let postD of postsDiv.children) {
    if (postD.getAttribute("data-post-id") == postID) {
      const token = getToken();

      fetch(`${apiBaseURL}/api/posts/${postID}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          console.log("update");
          postD.replaceWith(buildPost(data));
        });
    }
  }
}

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
      updatePage(postID);
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
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        updatePage(postID);
      });
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
        if (like.username == getLoginData().username) {
          deleteLike(like._id);
        }
      }
    });
}

function deletePost(deleteButton) {
  if (confirm("Are you sure you want to delete this post?")) {
    const postID = deleteButton.getAttribute("data-post-id");

    const token = getToken();

    fetch(`${apiBaseURL}/api/posts/${postID}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        for (let postD of postsDiv.children) {
          if (postD.getAttribute("data-post-id") == postID) {
            postsDiv.removeChild(postD);
          }
        }
      });
  } else {
    //do nothing
  }
}

function clearPostsDiv() {
  while (postsDiv.firstChild) {
    postsDiv.removeChild(postsDiv.firstChild);
  }
}

function displayPostsOldest(posts) {
  for (let post of posts) {
    postsDiv.prepend(buildPost(post));
  }
}

function sortByLikes(posts) {
  return posts.sort((a, b) => {
    return b.likes.length - a.likes.length;
  });
}

function sortByAlpha(obj) {
  return obj.sort((a, b) => {
    return a.username.toUpperCase().localeCompare(b.username.toUpperCase());
  });
}

function sortPosts(posts) {
  let value = "";

  if (sortByForm) {
    value = sortByForm.querySelector('input[name="sort-by-radio"]:checked').value;
  } else if (sortBySelect) {
    value = sortBySelect.value;
  }
  switch (value) {
    case "":
      for (let post of posts) {
        displayPost(post);
      }
      break;
    case "newest":
      for (let post of posts) {
        displayPost(post);
      }
      break;
    case "oldest":
      displayPostsOldest(posts);
      break;
    case "most-likes":
      sortByLikes(posts).forEach((post) => {
        displayPost(post);
      });
      break;
    case "username":
      sortByAlpha(posts).forEach((post) => {
        displayPost(post);
      });
      break;
  }
}

function refinePosts(posts) {
  if (getUsernameUrlParam()) {
    return posts.filter((post) => post.username == getUserName());
  } else if(getLoginData().username == getUserName() && sortBySelect) {
    return posts.filter((post) => post.username == getUserName());
  } else {
    return posts;
  }
  
}

function getMediaElem(url) {
  if (isYouTubeLink(url)) {
    // Handle YouTube link as a video
    const videoId = getYouTubeVideoId(url);

    if (videoId) {
      const iframe = document.createElement("iframe");
      iframe.src = `https://www.youtube.com/embed/${getYouTubeVideoId(url)}`;

      iframe.className = "post-image";

      return iframe;
    } else {
      return null;
    }
  } else if (isVideo(url)) {
    // Handle other video formats
    const video = document.createElement("video");

    video.src = url;
    video.className = "post-image";

    return video;
  } else if (isImage(url)) {
    // Handle image
    //   } else {
    const img = document.createElement("img");

    img.src = url;
    img.className = "post-image";

    return img;
  } else {
    return null;
  }
}

function isYouTubeLink(url) {
  return url.includes("youtube.com");
}

function getYouTubeVideoId(url) {
  const match = url.match(/[?&]v=([^&]+)/);
  return match ? match[1] : null;
}

function isVideo(url) {
  const videoExtensions = [".mp4", ".webm", ".avi"];
  return videoExtensions.some((ext) => url.includes(ext));
}

function isImage(url) {
  const imageExtensions = [".jpg", ".png", ".gif"];
  return imageExtensions.some((ext) => url.includes(ext));
}
