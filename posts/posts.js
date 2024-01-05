/* Posts Page JavaScript */

"use strict";

function init() {
  //get HTML
  const logOutButton = document.querySelector("#log-out-button");
  const postsDiv = document.querySelector("#posts-div");

  //const sortBySelect = document.querySelector("#sort-by-select");
  const usernameSelect = document.querySelector("#username-select");
  const usernameTableBody = document.querySelector("#username-table-body");

  //functions
  //functions defined in loadPosts.js
  function loadUsernameTable() {
    const token = getToken();

    fetch(`${apiBaseURL}/api/posts`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        let usernames = new Set(sortByAlpha(data).map((post) => post.username));

        usernames.forEach((user) => {
          const tr = document.createElement("tr");
          const td = document.createElement("td");

          td.textContent = `${user}`;

          td.addEventListener("click", () => {
            window.location.href = `/profile.html?username=${td.textContent}`;
          });


          tr.appendChild(td);
          usernameTableBody.appendChild(tr);
        });
      });

    //code loads users into usernameSelect
    // fetch(`${apiBaseURL}/api/users`, {
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //     },
    //   })
    //     .then((response) => response.json())
    //     .then((data) => {
    //         console.log(data);

    //       let usernames = new Set(sortByAlpha(data).map((user) => user.username));

    //       usernames.forEach((user) => {
    //         let option = new Option(user, user);
    //         usernameSelect.appendChild(option);
    //       });
    //     });
  }

  //event listeners
  logOutButton.addEventListener("click", logout);
  sortByForm.addEventListener("change", loadPosts);
  //usernameSelect.addEventListener("change", loadPosts);

  //call functions onload
  loadPosts();
  loadUsernameTable();
}

window.onload = init;
