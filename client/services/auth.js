document.querySelector('form').addEventListener('submit', async function (event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem('userId', data.id);
            localStorage.setItem('username', data.username);

            window.location.href = `/userDashboard/${data.id}`;
        } else {
            alert(data.message);
        }
    } catch (error) {
        console.error("Error during login:", error);
        alert("Error during login. Please try again.");
    }
});
