import React, { useState } from 'react';
import './App.css';
// require('dotenv').config();
import searchImage from './images/search.png';
import clear from './images/clear.png';
// import clouds from './images/clouds.png';
import drizzle from './images/drizzle.png';
import mist from './images/mist.png';
import rain from './images/rain.png';
import humidity from './images/humidity.png';
import wind from './images/wind.png';

// "353757cc05cd55f2f6c4c6d5bfd6c81f";
const apikey = "353757cc05cd55f2f6c4c6d5bfd6c81f";
const apiurl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

function App() {
  const [city, setCity] = useState('');
  const [error, setError] = useState(false);
  const [weather, setWeather] = useState(null);

  const handleSearch = async () => {
    if (city.trim() === '') {
      setError(true);
      setWeather(null);
    } else {
      setError(false);
      const response = await fetch(apiurl + city + `&appid=${apikey}`);
      if (response.status === 404) {
        setError(true);
        setWeather(null);
      } else {
        const data = await response.json();
        setWeather({
          city: data.name,
          temp: Math.round(data.main.temp) + '°C',
          humidity: data.main.humidity + ' %',
          wind: data.wind.speed + ' Km/h',
          icon: getWeatherIcon(data.weather[0].main)
        });
        setError(false);
      }
    }
  };

  const getWeatherIcon = (weather) => {
    switch (weather) {
      case 'Haze':
        return mist;
      case 'Rain':
        return rain;
      case 'Clear':
        return clear;
      case 'Drizzle':
        return drizzle;
      case 'Mist':
        return mist;
      default:
        return clear;
    }
  };

  const handleKeyDown = (event) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      handleSearch();
    }
  };

  return (
    <div className="card">
      <div className="search">
        <input
          type="text"
          placeholder="Enter city name"
          spellCheck="false"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button onClick={handleSearch}>
          <img src={searchImage} alt="Search" />
        </button>
      </div>
      {error && (
        <div className="error">
          <p>Invalid City Name</p>
        </div>
      )}
      {weather && (
        <div className="weather">
          <center>
            <img src={weather.icon} className="weathericon" alt="Weather icon" />
            <h1 className="temp">{weather.temp}</h1>
            <h2 className="city">{weather.city}</h2>
          </center>
          <div className="details">
            <div className="col">
              <img src={humidity} alt="Humidity" />
              <div>
                <p className="humidity">{weather.humidity}</p>
                <p>Humidity</p>
              </div>
            </div>
            <div className="col">
              <img src={wind} alt="Wind Speed" />
              <div>
                <p className="wind">{weather.wind}</p>
                <p>Wind Speed</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
