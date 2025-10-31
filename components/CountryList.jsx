import React, { useState, useEffect } from "react"; 
import CountryCard from "./CountryCard";
import CountiresListShimmar from './CountiresListShimmar'



export default function CountriesList({ query = "" }) {
  const [countriesData, setCountriesData] = useState([]);

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((res) => res.json())
      .then((data) => setCountriesData(data))
      .catch((err) => console.error("Error fetching countries:", err));
  }, []);

  if (countriesData.length === 0) {
    return <CountiresListShimmar />;
  }

  const normalizedQuery = query.toLowerCase();

  return (
    <div className="countries-container">
      {countriesData
        .filter(
          (country) =>
            country.name?.common?.toLowerCase().includes(normalizedQuery) ||
            country.region?.toLowerCase().includes(normalizedQuery)
        )
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