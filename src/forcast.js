// import React, { useState, useEffect, Component } from "react";
// import axios from "axios";
// import apiKeys from "./apiKeys";
// import { WiHumidity } from "react-icons/wi";
// import { WiCloudyWindy } from "react-icons/wi";
// import { GiFogLight } from "react-icons/gi";
// import { IoSunny } from "react-icons/io5";





// function Forcast(props) {
//   const [query, setQuery] = useState("");
//   const [error, setError] = useState("");
//   const [weather, setWeather] = useState({});

//   const search = (city) => {
//     axios
//       .get(
//         `${apiKeys.base}weather?q=${city != "[object Object]" ? city : query
//         }&units=metric&APPID=${apiKeys.key}`
//       )
//       .then((response) => {
//         setWeather(response.data);
//         setQuery("");
//       })
//       .catch(function (error) {
//         console.log(error);
//         setWeather("");
//         setQuery("");
//         setError({ message: "Not Found", query: query });
//       });
//   };
//   function checkTime(i) {
//     if (i < 10) {
//       i = "0" + i;
//     } // add zero in front of numbers < 10
//     return i;
//   }

//   const defaults = {
//     color: "white",
//     size: 112,
//     animate: true,
//   };

//   useEffect(() => {
//     search("Delhi");
//   }, []);

//   return (
//     <div className="forecast">
//       <div className="forecast-icon">
//         {/* <ReactAnimatedWeather
//           icon={props.icon}
//           color={defaults.color}
//           size={defaults.size}
//           animate={defaults.animate}
//         /> */}
//       </div>
//       <div className="today-weather">
//         <div className="search-box">
//           <input
//             type="text"
//             className="search-bar"
//             placeholder="Search any city"
//             onChange={(e) => setQuery(e.target.value)}
//             value={query}
//             />
//           <div className="img-box">
//             {" "}
//             <button onClick={search} className="search_btn" type="button"> Search</button>
//           </div>
//         </div>
//         <div className="cityHead">
//         {typeof weather.main != "undefined" ? (
//           <p>
//             {weather.name}, {weather.sys.country}
//             <h3>{props.weather}</h3>
//           </p>
//         ):(<h5>{error.query} {error.message}</h5> )}
//         </div>
//         <ul>
//           {typeof weather.main != "undefined" ? (
//             <div className="data_div">
//               {" "}
//               {/* <li className="cityHead">
                
//               </li> */}

//               <li className="data_tab" >
//                 <i className="weather_icon" id="temp"><IoSunny /></i>
//                 Temperature{" "}
//                 <span className="temp">
//                   {Math.round(weather.main.temp)}°c ({weather.weather[0].main})
//                 </span>
//               </li>
//               <li className="data_tab" >
//                 <i className="weather_icon" id="humidity"><WiHumidity /></i>
//                 Humidity{" "}
//                 <span className="temp">
//                   {Math.round(weather.main.humidity)}%
//                 </span>
//               </li>
//               <li className="data_tab">
//                 <i className="weather_icon" id="visible"><GiFogLight /></i>
//                 Visibility{" "}
//                 <span className="temp">
//                   {Math.round(weather.visibility)} mi
//                 </span>
//               </li>
//               <li className="data_tab" >
//                 <i className="weather_icon" id="speed"><WiCloudyWindy /></i>
//                 Wind Speed{" "}
//                 <span className="temp">
//                   {Math.round(weather.wind.speed)} Km/h
//                 </span>
//               </li>
//             </div>
//           ) : (
//             <li>
//               {error.query} {error.message}
//             </li>
//           )}
//         </ul>
//       </div>
//     </div>
//   );
// }
// export default Forcast;


// new code 🔥🔥🔥🔥🔥

import React, { useState, useEffect } from "react";
import axios from "axios";
import apiKeys from "./apiKeys";
import { WiHumidity } from "react-icons/wi";
import { WiCloudyWindy } from "react-icons/wi";
import { GiFogLight } from "react-icons/gi";
import { IoSunny } from "react-icons/io5";

function Forecast(props) {
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");
  const [weather, setWeather] = useState({});
  const [forecast, setForecast] = useState([]);

  const search = (city) => {
    axios
      .get(
        `${apiKeys.base}weather?q=${city != "[object Object]" ? city : query
        }&units=metric&APPID=${apiKeys.key}`
      )
      .then((response) => {
        setWeather(response.data);
        setQuery("");
      })
      .catch(function (error) {
        console.log(error);
        setWeather("");
        setQuery("");
        setError({ message: "Not Found", query: query });
      });
  };

  const fetchForecast = (city) => {
    axios
      .get(
        `${apiKeys.base}forecast?q=${city != "[object Object]" ? city : query
        }&units=metric&APPID=${apiKeys.key}`
      )
      .then((response) => {
        setForecast(response.data.list.filter((item, index) => index % 8 === 0)); // Filter data for every 24 hours
      })
      .catch(function (error) {
        console.log(error);
        setForecast([]);
      });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'short' });
    return `${day} ${month}`;
  };

  useEffect(() => {
    search("Delhi");
    fetchForecast("Delhi");
  }, []);

  return (
    <div className="forecast_container">
    <div className="forecast">
      <div className="forecast-icon">
        {/* <ReactAnimatedWeather
          icon={props.icon}
          color={defaults.color}
          size={defaults.size}
          animate={defaults.animate}
        /> */}
      </div>
      <div className="today-weather">
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search any city"
            onChange={(e) => setQuery(e.target.value)}
            value={query}
          />
          <div className="img-box">
            <button onClick={() => { search(query); fetchForecast(query); }} className="search_btn" type="button">Search</button>
          </div>
        </div>
        <div className="cityHead">
          {typeof weather.main != "undefined" ? (
            <p>
              {weather.name}, {weather.sys.country}
              <h3>{props.weather}</h3>
            </p>
          ) : (<h5>{error.query} {error.message}</h5>)}
        </div>
        <ul>
          {typeof weather.main != "undefined" ? (
            <div className="data_div">
              {/* <li className="cityHead">
                
              </li> */}

              <li className="data_tab">
                <i className="weather_icon" id="temp"><IoSunny /></i>
                Temperature{" "}
                <span className="temp">
                  {Math.round(weather.main.temp)}°c ({weather.weather[0].main})
                </span>
              </li>
              <li className="data_tab">
                <i className="weather_icon" id="humidity"><WiHumidity /></i>
                Humidity{" "}
                <span className="temp">
                  {Math.round(weather.main.humidity)}%
                </span>
              </li>
              <li className="data_tab">
                <i className="weather_icon" id="visible"><GiFogLight /></i>
                Visibility{" "}
                <span className="temp">
                  {Math.round(weather.visibility)} mi
                </span>
              </li>
              <li className="data_tab">
                <i className="weather_icon" id="speed"><WiCloudyWindy /></i>
                Wind Speed{" "}
                <span className="temp">
                  {Math.round(weather.wind.speed)} Km/h
                </span>
              </li>
            </div>
          ) : (
              <li>
                {error.query} {error.message}
              </li>
            )}
        </ul>
      </div>
    </div>
    <div className="forecast5">
      <div className="title2">5-Day Forecast</div>
      <ul className="forecast5_main">
        {forecast.map((item, index) => (
          <li key={index} className="fore5">
            <p style={{color:"white", fontWeight:"bold", fontSize:"13px"}}>{formatDate(item.dt_txt)}</p>
            <p style={{color:"orange", fontWeight:"bold", fontSize:"18px"}}>{Math.round(item.main.temp)}°C</p>
            <p style={{color:"white", fontWeight:"bold"}}>{item.weather[0].description}</p>
          </li>
        ))}
      </ul>
    </div>
    </div>
  );
}

export default Forecast;
