import React, { useEffect, useState } from "react";
import axios from "axios";

const OPENWEATHER_API_KEY = "YOUR_OPENWEATHER_API_KEY";
const CITY = "London,UK";

function App() {
  const [weather, setWeather] = useState(null);
  const [tflStatus, setTflStatus] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch weather
    const fetchWeather = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&units=metric&appid=${OPENWEATHER_API_KEY}`
        );
        setWeather(response.data);
      } catch (err) {
        setError("Failed to fetch weather data");
      }
    };

    // Fetch TFL tube line status
    const fetchTflStatus = async () => {
      try {
        const response = await axios.get(
          "https://api.tfl.gov.uk/line/mode/tube/status"
        );
        setTflStatus(response.data);
      } catch (err) {
        setError("Failed to fetch TFL status");
      }
    };

    fetchWeather();
    fetchTflStatus();
  }, []);

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "1rem", maxWidth: 600, margin: "auto" }}>
      <h1>UK Weather & London Tube Status</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {weather ? (
        <div style={{ marginBottom: "2rem" }}>
          <h2>Weather in {weather.name}</h2>
          <p>{weather.weather[0].description}</p>
          <p>Temperature: {weather.main.temp}°C</p>
          <p>Humidity: {weather.main.humidity}%</p>
        </div>
      ) : (
        <p>Loading weather...</p>
      )}

      <h2>London Tube Status</h2>
      {tflStatus.length > 0 ? (
        <ul>
          {tflStatus.map((line) => (
            <li key={line.id}>
              <strong>{line.name}</strong>: {line.lineStatuses[0].statusSeverityDescription}
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading tube status...</p>
      )}
    </div>
  );
}

export default App;
