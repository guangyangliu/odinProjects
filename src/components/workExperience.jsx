import { useState } from "react";
export function WorkExperience() {
    const [isSubmit, setisSubmit] = useState(false);
    const [formInfo, setFormInfo] = useState({company:'', position:'', resposibilities:'', from:'', until:''});

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
            <h2>Work Experience</h2>
            <ul>
            <li><b>Company Name</b> {formInfo['company']}</li>
            <li><b>Position Title</b> {formInfo['position']}</li>
            <li><b>Start From</b> {formInfo['from']}</li>
            <li><b>Until</b> {formInfo['until']}</li>
            <li><b>Main Resposibilities</b> {formInfo['resposibilities']}</li>
            <li><button onClick={handleClick}>Edit</button></li>
            </ul>
            </section>
        )
    }

    return (
        <section>
        <h2>Work Experience</h2>
    <form onSubmit={handleClick}>
        <label htmlFor="company">
            <b>Company Name</b>
            <input type="text" name="company" id="company" value={formInfo['company']} onChange = {handleInputChange} placeholder="Meta"/>
        </label>
        <label htmlFor="position">
            <b>Position Title</b>
            <input type="text" name="position" id="position" value={formInfo['position']} onChange = {handleInputChange} placeholder="Manager"/>
        </label>

        <label htmlFor="from">
            <b>Start From</b>
            <input type="date" name="from" id="from" value={formInfo['from']} onChange = {handleInputChange}/>
        </label>

        <label htmlFor="until">
            <b>Until</b>
            <input type="date" name="until" id="until" value={formInfo['until']} onChange = {handleInputChange}/>
        </label>
        

        <label htmlFor="resposibilities">
            <b>Main Resposibilities</b>
            <input type="text" name='resposibilities' id="resposibilities" value={formInfo['resposibilities']} onChange = {handleInputChange} placeholder="Responsible for user growth and team management"/>
        </label>

        <label htmlFor="submit">
            <input type="submit" value='Submit'/>
        </label>
    
    </form>
    </section>
    )
}