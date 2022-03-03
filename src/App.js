import React, { useState, useEffect } from "react";
import "./App.css";

!process.env.REACT_APP_API_KEY && console.log("can not get api key");

const api = {
  key: process.env.REACT_APP_API_KEY,
  base: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  const [searchInput, setSearchInput] = useState("");
  const [searchCity, setSearchCity] = useState("");
  const [weatherInfo, setWeatherInfo] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const featchWeatherdata = async () => {
      if (!searchCity) return;
      // console.log("Searching");
      setLoading(true);
      // Process
      try {
        const url = `${api.base}weather?q=${searchCity}&units=metric&APPID=${api.key}`;
        const response = await fetch(url);
        const data = await response.json();

        if (response.ok) {
          setWeatherInfo(
            `${data.name},${data.sys.country} ${data.weather[0].description},${data.main.temp}`
          );
          setErrorMessage("");
        } else {
          setErrorMessage(data.message);
        }
      } catch (error) {
        setErrorMessage(error.message);
      }
      setLoading(false);
    };
    featchWeatherdata();
  }, [searchCity]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchCity(searchInput);
  };

  return (
    <>
      <div className="container">
        <form onSubmit={handleSubmit} className="form-input">
          <input
            type="text"
            placeholder="City"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <button>Search</button>
        </form>

        {loading ? (
          <div>Loading...</div>
        ) : (
          <>
            {errorMessage ? (
              <div style={{ color: "red" }}>{errorMessage}</div>
            ) : (
              <div>{weatherInfo}</div>
            )}
          </>
        )}
      </div>
    </>
  );
}

export default App;
