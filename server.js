const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;
const USERS_FILE = path.join(__dirname, "users.txt");

app.use(express.json());
app.use(express.static(__dirname));

// Handle user registration
app.post("/register", (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: "Both fields are required." });
    }

    const userData = `${username}:${password}\n`;

    // Append user data to users.txt
    fs.appendFile(USERS_FILE, userData, (err) => {
        if (err) {
            return res.status(500).json({ message: "Error saving user data." });
        }
        res.status(201).json({ message: "Registration successful!" });
    });
});

// Handle user login
app.post("/login", (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: "Both fields are required." });
    }

    fs.readFile(USERS_FILE, "utf8", (err, data) => {
        if (err) {
            return res.status(500).json({ message: "Error reading user data." });
        }

        const users = data.split("\n");
        const userExists = users.some((line) => {
            const [storedUsername, storedPassword] = line.split(":");
            return storedUsername === username && storedPassword === password;
        });

        if (userExists) {
            res.json({ message: "Login successful!" });
        } else {
            res.status(401).json({ message: "Invalid username or password." });
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
