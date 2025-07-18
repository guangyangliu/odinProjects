import Post from './post';
import SignUp from './signup';
import Login from './login';
import MyPost from './myPost';
import WritePost from './write';
import HomePage from './homepage';
import Edit from './edit';

const routes = [
    {
        path: '/',
        element: <HomePage />,
    },
    {
        path: 'post',
        element: <Post />
    },
    {
        path: 'homepage',
        element: <HomePage />
    },
   
    {
        path: 'post/user/:id',
        element: <MyPost />
    },
    {
        path: 'signup',
        element: <SignUp />
    },
    {
        path: 'login',
        element: <Login />
    },
    {
        path: 'write',
        element: <WritePost />
    },
    {
        path: 'edit/:postId',
        element: <Edit />
    }
]

export default routes;