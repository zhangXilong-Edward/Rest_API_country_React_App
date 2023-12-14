import React from 'react'
import { useLoaderData, Link, useOutletContext } from 'react-router-dom'
import { getCountryByCode, getBorderCountries } from '../api'
import '../main.scss'


export async function loader({ params }) {
  const country = await getCountryByCode(params.code);
  const borderCountries = await getBorderCountries(country);
  return { country, borderCountries };
}

export default function Details() {
  const { country, borderCountries } = useLoaderData();
  const [darkMode, setDarkMode] = useOutletContext();

  const languagesEl = (country.languages) ? country.languages.map((e, index) => index === country.languages.length - 1 ? (<span key={index + 1}>{e.name}</span>) : (<span key={index + 1}>{e.name}, </span>)) : (<span>No data</span>);
  const currenciesEl = country.currencies ? country.currencies.map((e, index) => <span key={index + 2}>{e.name}</span>) : <span>No data</span>;
  const borderCountriesEl = borderCountries ? borderCountries.map((e, index) => <Link to={`/${e.alpha3Code}`} key={index + 3}> <button> {e.name} </button></Link>) : (<p>No Border Countries</p>);

  return (
    <div className={darkMode ? 'details-main-container dark' : 'details-main-container'}>
      <div className='details-back-button'>
        <Link to='/'> <button>&#8592; Back</button> </Link>
      </div>
      <div className={darkMode ? 'details-country-container dark' : 'details-country-container'}>
        <div className='flag'>
          <img src={country.flags.png}></img>
        </div>
        <div className='details'>
          <h2>{country.name}</h2>
          <div className='info'>
            <div>
              <p><b>Native name: </b>{country.nativeName} </p>
              <p><b>Population: </b>{country.population} </p>
              <p><b>Region:</b> {country.region} </p>
              <p><b>Sub region: </b>{country.subRegion} </p>
              <p><b>Capital: </b>{country.capital} </p>
            </div>
            <div>
              <p><b>Top Level Domain:</b> {country.topLevelDomain} </p>
              <p><b>Currency: </b>{currenciesEl}</p>
              <p><b>Languages: </b>{languagesEl}</p>
            </div>
          </div>
          <div className='border-countries'>
            <p>Border Countries:</p>
            <div className='buttons'>{borderCountriesEl}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
