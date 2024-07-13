import { useEffect, useState } from "react";
import NavBar from "./NavBar";
import { useOutletContext } from "react-router-dom";
import styles from "./CartItem.module.css"

function Cart() {
    const[storeData, setStoreData] = useOutletContext();

    const changeNumber = (e) => {
        const {value, id} = e.target;

        const updateData = storeData.map((item) => {
            if(item.id == id) {
                item.numberInCart = parseInt(value);
            }
            return item;
        })
        
        setStoreData(updateData);

    }

    if (storeData.length === 0) {
        return <div>loading data...</div>
    }

    return (
            <div className={styles.CartContainer}>
                <h1>Your cart</h1>
                <div className={styles.items}>
                {storeData.map(
                    (item) => {
                        if(item.numberInCart > 0) {
                            return (
                                <div key={item.id} className={styles.item}>
                                    <div className={styles.img}><img src={item.image}></img></div>
                                    <div className={styles.info}>
                                        <p>{item.title}</p>
                                        <p>Price: {item.price} Number: {item.numberInCart}</p>
                                        <input type="number" id={item.id} placeholder="number" min={0} value={item.numberInCart} onChange={changeNumber}/>
                                    </div>
                                </div>
                            )
                        }
                        
                    }
            )}
            </div>

                
            </div>
        
    )

}

export default Cart;