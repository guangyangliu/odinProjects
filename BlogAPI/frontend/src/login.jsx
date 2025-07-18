import { useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();
    // This component will render a simple login form.
    // It does not handle state or form submission for simplicity.
    // In a real application, you would handle form submission and validation here.
    const handleSubmit = async(e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        const response = await fetch('http://localhost:3001/login', {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({email, password})
            });
        const result = await response.json();
        if (!response.ok) {
            console.error('Login failed:', result.message);
            alert(result.message || 'Login failed');
        } else {
            console.log('Login successful:', result);
            alert('Login successful');
            localStorage.setItem('token', result.token); // Store the JWT token in local storage
            navigate(`/homepage`); // Redirect to the post page with user ID
            // Here you would typically redirect the user or update the UI
        }
    }
    return (
        <form onSubmit={handleSubmit}>
            <h1>Login</h1>
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" required />
            <br />
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" required />
            <br />
            <button type="submit">Login</button>
        </form>
    )
}


export default Login;