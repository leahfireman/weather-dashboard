import React, { useState, useEffect } from "react";

export function Forecast({ location }) {
  const [options, setOptions] = useState();
  const [isLoading, setIsLoading] = React.useState(false);


  useEffect(() => {
    const handleSearch = async () => {
        setIsLoading(true);
        const response = await fetch(`http://localhost:5001/api/weather/forecast/${encodeURIComponent(location)}`);
        const results = await response.json();
        console.log('result', results);
        //console.log("results.data", results.data.forecast);
    
        setOptions(results);
        setIsLoading(true);
      };

      handleSearch();
  }, []);


  //console.log('option:',options.data);
  const removeLocation = () => {
    setOptions(null); // Reset options to remove the entire forecast display
  };
  
  return (
      <div>
  {options && (
        <div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <h1>{options.data.location.name}</h1>
            <button onClick={removeLocation} style={{ marginLeft: '10px' }}>X</button>
          </div>
          <h3>{options.data.forecast.forecastday[0].day.avgtemp_f}°F</h3>
          <p>{options.data.forecast.forecastday[0].day.condition.text}</p>
          <p>Wind gusts up to {options.data.forecast.forecastday[0].day.maxwind_mph}mph</p>
          <p>Humidity {options.data.forecast.forecastday[0].day.avghumidity}%</p>
          <p>Chance of rain {options.data.forecast.forecastday[0].day.daily_chance_of_rain}%</p>
        </div>
      )}

<h3> 3 Day Forecast:</h3>
        <div>
        {options && (
        <div>
          {options.data.forecast.forecastday.slice(1).map((forecast, index) => (
            <div key={index} style={{ marginBottom: '20px' }}>
              <h5>{forecast.date}</h5>
              <p>Average Temperature: {forecast.day.avgtemp_f}°F</p>
              <p>Condition: {forecast.day.condition.text}</p>
              <p>Wind gusts up to : {forecast.day.maxwind_mph} mph</p>
              <p>Humidity: {forecast.day.avghumidity} %</p>
              <p>Chance of rain: {forecast.day.daily_chance_of_rain} %</p>
            </div>
          ))}
        </div>
      )}
        </div>

    </div>
  );
}
