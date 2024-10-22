const db = require("../db");
const path = require("path");

exports.getLogin = (req, res) => {
    res.sendFile(path.join(__dirname, "../../client/pages/login.html")); 
};

exports.postLogin = (req, res) => {
    const { email, password } = req.body; 

    const query = "SELECT * FROM users WHERE email = ? AND password = ?";
    db.query(query, [email, password], (err, results) => {
        if (err) {
            return res.status(500).json({ message: "Database error" });
        }

        if (results.length > 0) {
            const user = results[0];
            res.status(200).json({ id: user.id, username: user.username });
        } else {
            res.status(401).json({ message: "Invalid email or password" });
        }
    });
};
