"use client"
import { useState } from "react";

export default function Home() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchWeather = async () => {
    if (!city) return;

    setLoading(true);
    setError("");
    setWeather(null);

    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}`
      );
      const data = await res.json();

      if (data.cod === 200) {
        setWeather(data);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
       <div className="w-full max-w-md p-6 rounded-xl shadow-md border border-blue-100">
        <h1 className="text-2xl font-semibold text-blue-600 text-center mb-4">
          Real-Time Weather App
        </h1>

        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Enter city name..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="flex-1 px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={fetchWeather}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Search
          </button>
        </div>

        {loading && <p className="mt-4 text-center text-blue-500">Loading...</p>}

        {error && <p className="mt-4 text-center text-red-500">{error}</p>}

        {weather && (
          <div className="mt-6 text-center">
            <h2 className="text-xl font-bold text-blue-700">{weather.name}</h2>
            <p className="text-4xl font-bold text-blue-900">
              {Math.round(weather.main.temp)}°C
            </p>
            <p className="text-blue-600 capitalize">
              {weather.weather[0].description}
            </p>
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt="weather icon"
              className="mx-auto"
            />
          </div>
        )}
      </div>
    </div>
  );
}
