import { useState, useEffect} from "react";
import {useParams, useOutletContext} from "react-router-dom";
import styles from "./LandingPage.module.css";

function LandingPage() {
    const {id} = useParams();
    const [storeData, setStoreData] = useOutletContext();
    const[addNumber, setAddNumber] = useState('0');
    
    if(storeData.length == 0) {
        return (
            <div>loading data...</div>
        )
    }
    
    const filteredData = storeData.filter((item)=> item.id == id);
    const item = filteredData[0];
    const inputChange = (e) => {
        setAddNumber(e.target.value);
    }
    const submit = (e) => {
        e.preventDefault();
        const updateData = storeData.map((item) => {
            if(item.id == id) {
                item.numberInCart += parseInt(addNumber);
            }
            return item;
        })
        
        setStoreData(updateData);
        setAddNumber('0');
    }

    return(
            <form className={styles.detail}>
            <img src={item.image}></img>
            <div>
                <p>{item.title}</p>
                <p>Price:{item.price}$</p>
                <p>Description:{item.description}</p>
            </div>
            <div>
                <input type="number" id="number" placeholder="number" min={0} value={addNumber} onChange={inputChange} />
                <input type="submit" value="Add to Cart" onClick={submit}/>
            </div>
            </form>
    )
}





export default LandingPage;