import { useState } from "react";

export function EducationalExperience() {
    const [isSubmit, setisSubmit] = useState(false);
    const [formInfo, setFormInfo] = useState({school:'', title:'', from:'', end:''});

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
            <h2>Educational Experience</h2>
            <ul>
                <li><b>School</b> {formInfo['school']}</li>
                <li><b>Study Title</b> {formInfo['title']}</li>
                <li><b>Start From</b> {formInfo['from']}</li>
                <li><b>End</b> {formInfo['end']}</li>
                <li><button onClick={handleClick}>Edit</button></li>
            </ul>
            </section>
        )
    }

    return (<section>
        <h2>Educational Experience</h2>
        <form onSubmit={handleClick}>
            <label htmlFor="school"><b>School</b>
            <input type="text" id="school" name="school" value={formInfo['school']} required placeholder="UC Berkely" onChange={handleInputChange}/>
            </label>
           
           <label htmlFor="title"><b>Study Title</b>
           <input type="text" id="title" name="title" value={formInfo['title']} required placeholder="Marketing" onChange={handleInputChange}/>
           </label>
            <label htmlFor="from"><b>Study From</b>
            <input type="date" id="from" name="from" value={formInfo['from']} required  onChange={handleInputChange}/>
            </label>
            <label htmlFor="end"><b>Study End</b>
            <input type="date" id="end" name="end" value={formInfo['end']} required  onChange={handleInputChange}/>
            </label>
            <label htmlFor="submit">
            <input type="submit" id="submit" name="submit" value= 'Submit'/> 
            </label>
        </form>
        </section>)
}