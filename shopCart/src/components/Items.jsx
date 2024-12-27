import React from "react";
import styles from "./Items.module.css"
import { Link, useOutletContext } from "react-router-dom";


function Items() {
    const [storeData, setStoreData] = useOutletContext();
    
    if(storeData.length === 0) {
        return (
            <div>
                loading data...
            </div>
        )
    }

    return (
        <div className={styles.itemsContainer}>
            {storeData.map(
                (item) => (
                    <Item item={item} key={item.id} />
                )
            )}
        </div>
    )
}


function Item({item}) {
    return (
    
        <Link to={"/item/"+item.id} className={styles.item}>
            
                <img src={item.image}></img>
                <div>
                    <p>{item.title}</p>
                    <p>Price:{item.price}$</p>
                </div>      
        </Link>
        
    )
}

export default Items;