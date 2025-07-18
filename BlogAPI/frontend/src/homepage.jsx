
import {useState, useEffect } from "react";
import { Link } from "react-router-dom";

function HomePage () {
    const [log, setLog] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        async function fetchUser() {
            fetch("http://localhost:3001/homepage", {
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${localStorage.getItem("token")}`
            }
    }).then(async(response) => {
            if(!response.ok) {
                throw new Error('Not authenticated');
            } else {
                const result = await response.json();
                setUser(result.user);
            }
    }).then(result => {
        setLog(true);
    })
        }
        fetchUser();
        }, []);

    const onClick = () => {
        localStorage.removeItem("token");
        setLog(false);
    }
    
    if(log) {
        return (
            <div>
                <h1>Welcome to the Home Page</h1>
                <p>You are logged in!</p>
                <Link to="/post">All Posts</Link>
                <br />
                <Link to="/write">Write a Post</Link>
                <br />
                <Link to={`/post/user/${user.id}`}>Manage My Posts</Link>
                <button onClick={onClick}>Log Out</button>
            </div>
        );
    } else {
        return (
            <div>
                <h1>Welcome to the Home Page</h1>
                <p>Please log in or sign up to access more features.</p>
                <Link to="/login">Login</Link>
                <br />
                <Link to="/signup">Sign Up</Link>
            </div>
        );
    }
}

export default HomePage;