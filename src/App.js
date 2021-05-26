import React, { useState } from 'react';
const api = {
  key: 'f9b5b46af25c4c49853d2c2583d427d6',
  http: 'https://api.openweathermap.org/data/2.5/'
}
function App() {
  const [query, setQuery] = useState('')
  const [weather, setWeather] = useState({})

  const search = evt => {
    if (evt.key === 'Enter') {
      fetch(`${api.http}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setQuery('')
          setWeather(result)
          console.log(result);
        })
    }
  }

  const DateBuilder = (d) => {
    var options = {
      weekday: 'long',
      year: "numeric",
      month: "long",
      day: "numeric",
    }
    let date = d.toLocaleDateString("en-US", options)
    return `${date}`
  }
  return (
    <div className={
      (typeof weather.main != 'undefined')
        ? ((weather.main.temp > 15)
          ? 'App warm' : 'App')
        : 'App'
    }>
      {/* use class 'App when location is not definied or the weather is under 16, else use class 'App + warm' */}
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search..."
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {/* The result shows only when the weather is defined*/}
        {(typeof weather.main != 'undefined') ? (
          <div>
            <div className="location-box">
              <div className="location">{weather.name}, {weather.sys.country}</div>
              <div className="date">{DateBuilder(new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="temp">
                {Math.round(weather.main.temp)}°C
            </div>
              <div className="weather">{weather.weather[0].main}</div>
            </div>
          </div>
        ) : ('')}
      </main>
    </div >
  );
}

export default App;
