import { useState } from "react";
import { useNavigate } from "react-router-dom";
const apiUrl = import.meta.env.VITE_BACKEND_API_URL;

function SignUp () {
    const [data, setData] = useState({
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const {name, value} = e.target;
        setData(prevData => ({
            ...prevData,
            [name]: value
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(false);
        const {email, password, confirmPassword} = data;
        
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        };
        try {
            const response = await fetch(`${apiUrl}/signup`, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({email, password})
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || 'Something went wrong!');
            }
            
            console.log('Sign up successful:', result);
            setSuccess(true);
            navigate('/login'); // Redirect to login page after successful sign up
        } catch (error) {
            console.error('Form submission error:', error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <h1>Sign Up</h1>
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" value={data.email}  onChange={handleChange} required />

            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" value={data.password} placeholder="Password"  onChange={handleChange} required />

            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input type="password" id="confirmPassword" name="confirmPassword" value={data.confirmPassword} placeholder="Confirm Password"  onChange={handleChange} required />

            <button type="submit" >Submit</button>;
        </form>
    )
}


export default SignUp;