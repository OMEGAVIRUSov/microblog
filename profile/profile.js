document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in
    checkLoginStatus();

    // Fetch and display posts
    fetchPosts();
});

function checkLoginStatus() {
    // Implement your login status check logic here
    // For example, check for the presence and validity of a token
    const isLoggedIn = checkTokenValidity(); // Replace with your actual logic

    // If not logged in, redirect to the login page
    if (!isLoggedIn) {
        window.location.href = 'login.html';
    }
}

function fetchPosts() {
    fetch('http://microbloglite.us-east-2.elasticbeanstalk.com/Posts')
        .then(response => {
            // Check if the response is successful (status code 2xx)
            if (!response.ok) {
                throw new Error(`Error: ${response.status} - ${response.statusText}`);
            }

            return response.json();
        })
        .then(posts => {
            const postsContainer = document.querySelector('.container');
            posts.forEach(post => {
                const postElement = document.createElement('div');
                postElement.innerHTML = `
                    <p><strong>${post.author}</strong></p>
                    <p>${post.content}</p>
                    <p>${post.timestamp}</p>
                    <hr>
                `;
                postsContainer.appendChild(postElement);
            });
        })
        .catch(error => console.error('Error fetching posts:', error));
}

// Replace this with your actual token validation logic
function checkTokenValidity() {
    // Assume the token is stored in localStorage for this example
    const token = localStorage.getItem('user_token');

    // Check if the token is present and valid (you need to replace this with your actual logic)
    return token !== null && tokenIsValid(token);
}

// Placeholder function to simulate token validation
function tokenIsValid(token) {
    // Assume the token is valid if it's not empty (you need to replace this with your actual logic)
    return token.trim() !== '';
}
