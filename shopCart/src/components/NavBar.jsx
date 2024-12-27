import { Link, Outlet } from "react-router-dom"
import styles from "./NavBar.module.css"
import { useState, useEffect} from "react";
function NavBar() {
    const [storeData, setStoreData] = useState([]);
    useEffect(()=> {
        const loadStoreData = async () => {
            const data = await fetch("https://fakestoreapi.com/products").then((res) => res.json());
            const dataHasCartNumber = data.map((item) => {
                const newItem = item;
                newItem.numberInCart = 0;
                return newItem;
            })
            setStoreData(dataHasCartNumber);
        };
        loadStoreData();
    },
    []
    );

    const totalCartNumber = storeData.reduce((acc, item) => {
        return acc + item.numberInCart;
    },0);
    console.log(totalCartNumber);
    
    return (
        <div>
        <div className={styles.Nav}>
             <div ><Link to="/" className={styles.link}>Home</Link></div>
             <div><Link to="/cart" className={styles.link}>Cart({totalCartNumber})</Link></div>
        </div>
        
        <Outlet context={[storeData, setStoreData]}/>
        
        </div>
    )
}

export default NavBar;