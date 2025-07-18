import { useState,useEffect} from "react";
import { useParams } from "react-router-dom";
const apiUrl = import.meta.env.VITE_BACKEND_API_URL;

function  MyPost (){
    const {id} = useParams();
    const [posts, setPosts] = useState([]);
    const token = localStorage.getItem("token");
    useEffect(() => {
        fetch(`${apiUrl}/post/user/${id}`, {headers: {authorization: `Bearer ${token}`}})
          .then((response) => response.json())
          .then((response) => setPosts(response))
          .catch((error) => console.error(error));
      }, []);

     const handleEdit = (e) => {
        e.preventDefault();
        const postId = e.target.id; // Assuming the button has a key attribute with post id
        window.location.href = `/edit/${postId}`; // Redirect to edit page
     }
    return (
        <div>
        <h2> Posts </h2>
        {posts.length > 0 ? (
            <ul>
            {posts.map(post => (
            <li key={post.id}>
                <strong>{post.title}</strong>
                <p>{post.createdAt}</p>
                <p>{post.content}</p>
                <button id={post.id} onClick={handleEdit}>Edit</button>
            </li>
            ))}
        </ul>):
            <p>No posts found.</p>
        }
        </div>
    );
}

export default MyPost;