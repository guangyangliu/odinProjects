import { useState,useEffect} from "react";
const apiUrl = import.meta.env.VITE_BACKEND_API_URL;
function  Post (){
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        fetch(`${apiUrl}/post`)
          .then((response) => response.json())
          .then((response) => setPosts(response))
          .catch((error) => console.error(error));
      }, []);

     const [showForm, setShowForm] = useState(false);

     const onClick = (e) => {
        e.preventDefault();
        setShowForm(!showForm);
     }
     const onSubmit = async(e) => {
        e.preventDefault();
        const commentContent = e.target.comment.value;
        const postId = e.target.id; // Get the post ID from the form's id attribute
        
        
       await fetch(`${apiUrl}/comment/${postId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify({ commentContent })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to add comment');
            } else {
                response.json();
            }
        }).then(data => {
            
            alert('Comment added successfully');
            e.target.reset(); // Reset the form
            setShowForm(false); // Hide the form after submission
            window.location.reload(); // Reload the page to see the new comment
        })
        .catch(error => console.error('Error adding comment:', error));
     };
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
                {post.comments && post.comments.length > 0 ?(
                <ul>comments:
                    {post.comments.map(comment => (
                        <li key={comment.id}>
                            <strong>{comment.user.email}</strong>: {comment.content}
                        </li>
                    ))}
                </ul>):<></>
                
            }
                {showForm? (<form onSubmit={onSubmit} id = {post.id} >
                    <label htmlFor="comment">Comment:</label>
                    <input type="text" id="comment" name="comment" required />
                    <button type="submit">Submit</button>
                </form>): <></>}
                <button id={post.id} onClick={onClick} >Comment</button>
            </li>
            ))}
        </ul>
        ) :
            <p>No posts found.</p>
        }
        </div>
    );
}

export default Post;