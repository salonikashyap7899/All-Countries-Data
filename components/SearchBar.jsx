import React from 'react'

export default function SearchBar({setQuery}) {
  return (
    <div>
        <div className="search-filter-container">
        <div className="search-container">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input onChange={(e) => setQuery(e.target.value)} type="text" placeholder="Search for a country..."/>
        </div>
    </div>
   </div>
  )
}
