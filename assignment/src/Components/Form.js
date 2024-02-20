"use client";
import { useState } from 'react';

const Form = () => {
  const [name, setName] = useState("");
  const [details, setDetails] = useState({age: "" , gender : "", country : []});
  const [showDetails,setShowDetails] = useState(false)
  const [detailsNotFound , setDetailsNotFound] = useState(false)
  const countryCodes = {
    "GH" : "Ghana",
    "NG" : "Nigeria",
    "PH" : "Philippines",
    "US" : "United States",
    "NE" : "Niger"
  }
  const handleSubmit = async (e , name) => {
    e.preventDefault();
    setShowDetails(true)
    await getDetails(name)
  };

  const getDetails = async (name) =>{
    const lowerName = name.toLowerCase()
    let data = null
    switch(lowerName) {
        case "meelad" : 
            const meeladRes = await fetch('https://api.agify.io/?name=meelad');
            data = await meeladRes.json();
            parseDetails(data)
            break;
    
        case "luc" :    
            const lucRes = await fetch('https://api.genderize.io/?name=luc');
            data = await lucRes.json();
            parseDetails(data)
            break;
      
        case "nathaniel" :
            const nathRes = await fetch('https://api.nationalize.io/?name=nathaniel');
            data = await nathRes.json();
            parseDetails(data)
            break;
    
        default : 
            parseDetails(null)
            break;
    }
  }

  const parseDetails = (data) =>{
        if(data){
            const temp = {age: "" , gender : "", country : []}
            if(data.age)
                temp.age = data.age
            if(data.gender && data.gender.length > 0)
                temp.gender = data.gender
            if(data.country && data.country.length > 1)
                temp.country = data.country
            setDetails(temp);
        }
        else {
            setShowDetails(false)
            setDetailsNotFound(true)
        }
  }

  const nameChanges = (e) =>{
    setName(e.target.value)
    setShowDetails(false)
    setDetailsNotFound(false)
  }

  const getCountriesProb = (data)=>{
    let countryList = []
    if(data && data.length > 0){
        countryList = data.map((ele,index)=>{
            if(ele.country_id.toUpperCase() in countryCodes){
                return <span style={{marginLeft:"20px",display:"block"}} key={index}>*The probability of the name in {countryCodes[ele.country_id.toUpperCase()]} is {ele.probability}</span>
            }
            else 
                return <span style={{marginLeft:"20px",display:"block"}} key={index}>*The probability of the name in {ele.country_id.toUpperCase()} is {ele.probability}</span>
        })
    }
    return countryList
  }

  return (
    <div>
      <form onSubmit={(e)=>handleSubmit(e,name)}>
        <input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => nameChanges(e)}
        />
        <button type="submit">Guess</button>
      </form>
      {detailsNotFound && <p>Details not found</p>}
      {showDetails ? details.age ? <p>Age: {details.age}</p>:<p>Age: NA</p> : null}
      {showDetails ? details.gender ? <p>Gender: {details.gender}</p>:<p>Gender: NA</p> : null}
      {showDetails ? details.country.length > 1 ? <p>Country: {getCountriesProb(details.country)}</p>:<p>Country: NA</p> : null}
    </div>
  );
};

export default Form;
