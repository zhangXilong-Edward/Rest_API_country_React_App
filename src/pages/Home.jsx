import React, { useState } from 'react'
import { useLoaderData, useOutletContext, Link } from 'react-router-dom'
import { getCountries } from '../api'
import '../main.scss'

function shuffle(array) {
  let currentIndex = array.length, randomIndex;
  while (currentIndex > 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
  return array;
}

export async function loader() {
  return await getCountries()
}

export default function Home() {

  const [selectedRegion, setSelectedRegion] = useState('Filter by Region');
  const [searchInput, setSearchInput] = useState('');
  const [darkMode, setDarkMode] = useOutletContext(); 

  const countriesArray = useLoaderData();

  const renderedCountries = (selectedRegion == 'Filter by Region' || selectedRegion == 'Clear Filters') ? shuffle(countriesArray).filter(e => e.name.toLowerCase().includes(searchInput.toLowerCase())) : shuffle(countriesArray.filter(e => e.region == selectedRegion)).filter(e => e.name.toLowerCase().includes(searchInput.toLowerCase()))
  const countriesEls = renderedCountries.map((country) => {
    return (
        <div key={country.alpha3Code} className={darkMode? 'home-country-grid dark': 'home-country-grid'}>
            <div className='home-flag'>
                <img src={country.flags.png} width='270px' height='auto'></img>
            </div>
            <Link to={`${country.alpha3Code}`} className='home-info'>
                <b>{country.name}</b>
                <div className='smaller'>
                    <p><b>Population:</b> {country.population}</p>
                    <p><b>Region:</b> {country.region}</p>
                    <p><b>Capital: </b>{country.capital}</p>
                </div>
            </Link>
        </div>
    )
})
  return (
    <div className={darkMode?'dark home-body': 'home-body'}>
      <div className={darkMode? 'search-bar dark': 'search-bar'}>
            <input type="search" placeholder="Search for a country.." value={searchInput} onChange={e => setSearchInput(e.target.value)} />
            <select name="selectedRegion"
                value={selectedRegion}
                onChange={e => setSelectedRegion(e.target.value)}>
                <option value="Filter by Region" disabled>Filter by Region</option>
                <option value="Africa">Africa</option>
                <option value="Americas">Americas</option>
                <option value="Asia">Asia</option>
                <option value="Europe">Europe</option>
                <option value="Oceania">Oceania</option>
                <option value="Clear Filters">Remove filters</option>
            </select>
        </div>
        <div className='home_countries-container'>
            {countriesEls}
        </div>
    </div>
  )
}
