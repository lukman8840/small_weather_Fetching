import React, { useEffect, useState } from 'react';
import './Weather.css';  // Import CSS for styling
import { CiSearch } from "react-icons/ci";  // Import search icon from react-icons
import { IoIosSunny } from "react-icons/io";  // Import sunny icon from react-icons
import { WiHumidity } from "react-icons/wi";  // Import humidity icon from react-icons
import { MdOutlineWindPower } from "react-icons/md";  // Import wind power icon from react-icons

const Weather = () => {
  // State to hold weather data
  const [weatherData, setWeatherData] = useState(null);
  // State to hold the city name input
  const [city, setCity] = useState('');

  // Function to fetch weather data based on the city name
  const search = async (city) => {
    // Check if the city name is provided
    if (!city) {
      alert('Enter city name');
      return;
    }

    try {
      // Build the API URL with the city name and API key
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
      const response = await fetch(url);
      const data = await response.json();
      
      // Check if the response is not ok
      if (!response.ok) {
        alert(data.message);
        return;
      }

      console.log(data);

      // Set the fetched weather data to the state
      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
      });

      // Clear the input field after search
      setCity('');
    } catch (error) {
      // Handle errors
      setWeatherData(null);
      console.error("Error fetching weather data:", error);
    }
  };

  // Effect hook to fetch weather data for a default city on component mount
  useEffect(() => {
    search('Abuja'); // Initial search with a default city
  }, []);

  // Handler function for the Enter key press event
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      search(city);
    }
  };

  return (
    <div className='weather'>
      <h2>Search A City </h2>
      <div className='search-bar'>
        <CiSearch />  
        <input 
          type='text' 
          placeholder='Search'
          value={city}  // Bind the input field to the state
          onChange={(e) => setCity(e.target.value)}  // Update state on input change
          onKeyDown={handleKeyDown}  // Search on Enter key press
        />
      </div>
      <IoIosSunny className='sunny' onClick={() => search(city)}/>  

      {/* Conditional rendering based on weather data availability */}
      {weatherData ? (
        <>
          <p className='temperature'>{weatherData.temperature}°C</p>
          <p className='location'>{weatherData.location}</p>

          <div className="weather-data">
            <div className="col">
              <WiHumidity />  
              <div>
                <p>{weatherData.humidity}%</p>
                <span>Humidity</span>
              </div>
            </div>
            <div className="col">
              <MdOutlineWindPower />  
              <div>
                <p>{weatherData.windSpeed} km/h</p>
                <span>Wind Speed</span>
              </div>
            </div>
          </div>
        </>
      ) : (
        <p>No weather data available</p>
      )}
    </div>
  );
};

export default Weather;
