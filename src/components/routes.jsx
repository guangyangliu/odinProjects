import App from "../App";
import LandingPage from "./LandingPage";
import HomePage from "./Items";
import ErrorPage from "./ErrorPage";
import Cart from "./Cart";
import NavBar from "./NavBar";
import Items from "./Items";


const routes = [
    {
        path:"/",
        element: <NavBar />,
        children: [
            {index: true, element: <Items />},
            {
                path:"item/:id",
                element: <LandingPage />,
            },
            {
                path:"cart",
                element: <Cart />,
            }
        ],
        errorElement: <ErrorPage />,
    }, 
]

export default routes;