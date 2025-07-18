import { useState, useEffect } from 'react';
import {useParams} from 'react-router-dom';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
const apiUrl = import.meta.env.VITE_BACKEND_API_URL;

function Edit () {
    const { postId } = useParams(); // Get postId from URL parameters
    const navigate = useNavigate(); // Initialize useNavigate for navigation

    const [post, setPost] = useState(null);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const token = localStorage.getItem("token");
    
    useEffect(() => {
        fetch(`${apiUrl}/post/${postId}`, {
        headers: { authorization: `Bearer ${token}` }
        })
        .then(response => response.json())
        .then(data => {
            setPost(data);
            setTitle(data.title);
            setContent(data.content);
        })
        .catch(error => console.error(error));
    }, [postId, token]);
    
    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`${apiUrl}/post/${postId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ title, content })
        })
        .then(response => response.json())
        .then(data => {
            navigate(`/post/user/${data.post.authorId}`); // Redirect to the user's posts page
            // Optionally redirect or show a success message
        })
        .catch(error => console.error('Error updating post:', error));
    };
    
    if (!post) return <div>Loading...</div>;
    
    return (
        <form onSubmit={handleSubmit}>
        <h2>Edit Post</h2>
        <label>
            Title:
            <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            />
        </label>
        <label>
            Content:
            <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            />
        </label>
        <button type="submit">Update Post</button>
        </form>
    );
}


export default Edit;