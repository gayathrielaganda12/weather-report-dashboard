// src/components/Dashboard.js
import axios from "axios";
import { fetchWeatherRequest, fetchWeatherSuccess, fetchWeatherFailure } from "../actions/weatherActions";
import searchIcon from '../assests/images/search.png'
import {removeAuthentication} from '../actions/authActions'

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const SearchCity = () => {
  const appState = useSelector((state) => state);

  const weatherState = useSelector((state) => state.weather);

  const dispatch = useDispatch();
  const [city, setCity] = useState("");



  const getData = async (e) => {
    e.preventDefault(); // prevent the form from submitting and causing a page reload

    dispatch(fetchWeatherRequest());

    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=dc05c0bc0ca2bbd9f0c413cae8c22828`);


      if (response.status === 200) {
        // Assuming the response can be directly used as JSON
        dispatch(fetchWeatherSuccess(response.data));
        console.log(response.data);
      } else {
        throw new Error(`API error: ${response.status} - ${response.statusText}`);
      }
    } catch (error) {
      dispatch(fetchWeatherFailure(error.message));
    }
  };

  const logout = ()=>{
    dispatch(removeAuthentication());

  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      getData(e);
    }
  };

  return (
    <div className="container-fluid ">
      <div className="row"  style={{backgroundColor:'#3a9fbf'}}>
        <div className="col-11" >
        <form onSubmit={getData} className="d-flex justify-content-center align-items-center flex-row">
        <input
          placeholder="search by city"
          value={city}
          type="text"
          onChange={(e) => setCity(e.target.value)}
          required
          onKeyPress={handleKeyPress} 
          style={{borderRadius:'0.4em',margin:'0.5em',padding:'0.5em',width:'50%'}}
        />
        <button type="submit"><img  src={searchIcon}  style={{height:'2em',borderRadius:'50%'}}/></button>
      </form> 
          

        </div>
        <div className="1 pt-3 " >
          <button className="text-blue bg-white pt-1 pb-1 text-gray-500   " style={{borderRadius:'5px',fontSize:'15px'}} onClick={logout}>Logout</button>
        </div>


      </div>


         {console.log(weatherState)}
      {/* <pre>{JSON.stringify(weatherState.main.temp, null, 2)}</pre>  */}
     
   {/* {weatherState.data!=null ?<h1> {weatherState.main.temp} </h1>:"data is not  loaded"} */}

















    </div>
     );


 
 
};

export default SearchCity;
