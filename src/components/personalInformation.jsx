import { useState } from "react"

export function PersonalInfo () {
    const [isSubmit, setisSubmit] = useState(false);
    const [formInfo, setFormInfo] = useState({name:'', email:'', tel:''});

    function handleClick(event) {
        event.preventDefault();
        setisSubmit(!isSubmit);
    }

    function handleInputChange(event) {
        const {name, value} = event.target;
        setFormInfo({...formInfo, [name]:value})
    }

    if(isSubmit) {
        return (
            <section>
            <h2>Personal Infromation</h2>
            <ul>
            <li><b>Name</b> {formInfo.name}</li>
            <li><b>Email</b> {formInfo.email}</li>
            <li><b>Tel</b> {formInfo.tel}</li>
            <li><button onClick={handleClick}>Edit</button></li>
            
            </ul>
            </section>
        )
    }

    return (<section>
        <h2>Personal Infromation</h2>
        <form onSubmit={handleClick}>
            <label htmlFor="name"><b>Name</b>
            <input type="text" id="name" name="name" value={formInfo.name} required placeholder="Liu Guangyang" onChange={handleInputChange}/>
            </label>
           
           <label htmlFor="email"><b>Email</b>
           <input type="email" id="email" name="email" value={formInfo.email} required placeholder="953554041@qq.com" onChange={handleInputChange}/>
           </label>
            <label htmlFor="tel"><b>Tel</b>
            <input type="tel" id="tel" name="tel" value={formInfo.tel} required placeholder="17688888888" onChange={handleInputChange}/>
            </label>
            <label htmlFor="submit">
            <input type="submit" id="submit" name="submit" value= 'Submit'/> 
            </label>
        </form>
        </section>)
}