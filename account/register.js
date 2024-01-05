// Author: Bryce Smith
"use strict";

const apiBaseURL = "http://microbloglite.us-east-2.elasticbeanstalk.com";
// Backup server:   https://microbloglite.onrender.com

function init() {
    const nameInput = document.querySelector("#name-input");
    const userNameInput = document.querySelector("#user-name-input");
    const passwordInput = document.querySelector("#password-input");
    const submitButton = document.querySelector("#submit-button");

    function buildUser() {
      let user = {
        username: userNameInput.value,
        fullName: nameInput.value,
        password: passwordInput.value,
      };

      return user;
    }

    async function saveUser(user) {
      fetch(apiBaseURL + "/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          //can set multiple headers here
        },
        body: JSON.stringify(user),
      }).then((response) => {
        window.location.href = "sign-in.html";
      });
    }

    async function createUser() {
      let user = buildUser();

      saveUser(user);

      return false;
    }

    submitButton.addEventListener("click", createUser);
  }

  window.onload = init;