function validateLogin(event) {
    event.preventDefault(); // Prevent form submission

    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    console.log('Username:', username);
    console.log('Password:', password);

    // Check if the credentials are "admin" and "admin"
    if (username === 'admin' && password === 'admin') {
        // Redirect to index.html if credentials are correct
        window.location.href = 'index.html';
    } else {
        // Show error message if credentials are incorrect
        document.getElementById('error-message').style.display = 'block';
    }
}
