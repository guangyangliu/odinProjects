const apiUrl = import.meta.env.VITE_BACKEND_API_URL;

function WritePost () {

    const handleSubmit = (e) => {
        e.preventDefault();
        const title = e.target.title.value;
        const content = e.target.content.value;

        fetch(`${apiUrl}/post`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}` // Include JWT token
            },
            body: JSON.stringify({ title, content })
        }).then(response => {
            if (!response.ok) {
                throw new Error('Failed to create post');
            }
            return response.json();
        }).then(data => {
            alert('Post created successfully');
            //todo: Redirect to the user's posts page
            window.location.href = `/post/user/${data.authorId}`; // Redirect to the user's posts page
            
        }).catch(error => {
            console.error('Error creating post:', error);
            alert(error.message || 'Error creating post');
        });
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h2>Write a Post</h2>
                <div>
                    <label htmlFor="title">Title:</label>
                    <input type="text" id="title" name="title" required />
                </div>
                <div>
                    <label htmlFor="content">Content:</label>
                    <textarea id="content" name="content" rows="5" required></textarea>
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}


export default WritePost;