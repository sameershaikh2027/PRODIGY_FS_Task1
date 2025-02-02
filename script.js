// Registration Logic
document.getElementById("register-form")?.addEventListener("submit", (event) => {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (localStorage.getItem(username)) {
        document.getElementById("message").textContent = "Username already exists!";
        return;
    }

    // Save username and password to localStorage
    localStorage.setItem(username, password);
    document.getElementById("message").textContent = "Registration successful!";
});

// Login Logic
document.getElementById("login-form")?.addEventListener("submit", (event) => {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Check credentials
    const storedPassword = localStorage.getItem(username);
    if (storedPassword === password) {
        document.getElementById("message").style.color = "green";
        document.getElementById("message").textContent = "Login successful!";
        setTimeout(() => {
            window.location.href = 'home.html';
        }, 2000);  // 2-second delay
    } else {
        document.getElementById("message").style.color = "red";
        document.getElementById("message").textContent = "Invalid username or password.";
    }
});
