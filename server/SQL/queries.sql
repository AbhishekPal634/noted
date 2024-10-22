CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL
);

CREATE TABLE tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    task_description VARCHAR(255),
    status VARCHAR(50),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

INSERT INTO users (username, email, password, role) 
VALUES 
('rahul_verma', 'rahul.verma@example.com', 'password123', 'admin'),
('priya_sharma', 'priya.sharma@example.com', 'password456', 'user'),
('amit_kumar', 'amit.kumar@example.com', 'password789', 'user'),
('sneha_patel', 'sneha.patel@example.com', 'password101', 'admin'),
('arjun_mehta', 'arjun.mehta@example.com', 'password202', 'user');
