import React, { useState, useEffect } from "react";

const api = {
  key: "5c16a0b5dabc0b620f294723b36fb629",
  base: "http://api.openweathermap.org/data/2.5/",
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
      <form onSubmit={handleSubmit}>
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
    </>
  );
}

export default App;
