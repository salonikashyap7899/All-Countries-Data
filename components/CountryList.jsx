import React, { useState, useEffect } from "react"; 
import CountryCard from "./CountryCard";
import CountiresListShimmar from './CountiresListShimmar'

export default function CountriesList({ query = "" }) {
  const [countriesData, setCountriesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    
    // FIX: Updated URL to include required 'fields' query parameter
    // The required fields are: name, region, population, flags, capital, and cca3 for the key
    const API_URL = "https://restcountries.com/v3.1/all?fields=name,region,population,flags,capital,cca3";

    fetch(API_URL)
      .then((res) => {
        if (!res.ok) {
          // Explicitly handle HTTP errors like 400 or 500
          throw new Error(`HTTP error! status: ${res.status}`); 
        }
        return res.json();
      })
      .then((data) => {
        // Ensure data is a valid array of countries
        if (Array.isArray(data) && data.length > 0 && data[0].name) {
          setCountriesData(data);
        } else {
          // If the data is empty or invalid structure, treat it as an error
          throw new Error("Received empty or unexpected data format from API");
        }
      })
      .catch((err) => {
        console.error("Error fetching countries:", err);
        setError(err.message); 
        setCountriesData([]); 
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // --- RENDERING LOGIC ---

  if (loading) {
    return <CountiresListShimmar />;
  }

  // Display specific error message if the fetch failed
  if (error) {
    return <div className="error-message">Error: Failed to load countries. ({error})</div>;
  }
  
  // If loading is done, no error, but data is empty, display a message
  if (countriesData.length === 0) {
    return <div className="empty-message">No countries found matching your query.</div>;
  }

  const normalizedQuery = query.toLowerCase();

  return (
    <div className="countries-container">
      {countriesData
        .filter((country) => {
          // Defensive check against bad data structure
          if (!country || !country.name || typeof country.name.common !== 'string') {
            return false;
          }
          
          return (
            country.name.common.toLowerCase().includes(normalizedQuery) ||
            country.region?.toLowerCase().includes(normalizedQuery)
          );
        })
        .map((country) => (
          <CountryCard
            key={country.cca3}
            name={country.name.common}
            flag={country.flags.svg}
            population={country.population}
            region={country.region}
            capital={country.capital?.[0]}
            data={country}
          />
        ))}
    </div>
  );
}