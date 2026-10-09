import {useState, useEffect} from 'react';
import Navbar from './components/Navbar.tsx';
import Card from './components/Card.tsx';
import type {Country} from './types.ts';
import './index.css';

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [region, setRegion] = useState('');
  const [countries, setCountries] = useState<Country[]>([]);

  useEffect(() => {
    fetch(
      "https://api.restcountries.com/countries/v5?limit=100&response_fields=names.common,flag.url_png,flag.description,population,region,capitals",
      { headers: { Authorization: `Bearer ${import.meta.env.VITE_API_KEY}` } }
    )
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setCountries(result.data.objects);
      });
  }, []);
  const filteredCountries = countries
  .filter((c) => c.flag?.url_png)
  .filter((c) =>
    c.names.common.toLowerCase().includes(searchTerm.toLowerCase())
  )
  .filter((c) => region === "" || c.region === region);

const isFiltering = searchTerm !== "" || region !== "";

const visibleCountries = isFiltering
  ? filteredCountries
  : filteredCountries.slice(0, 8);

  return(
    <div>
      <Navbar />

      <div className="controls">
      <input
        type="text"
        placeholder="Search for a country..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <select
        value={region}
        onChange={(e) => setRegion(e.target.value)}
      >
        <option value="">Filter by Region</option>
        <option value="Africa">Africa</option>
        <option value="Americas">America</option>
        <option value="Asia">Asia</option>
        <option value="Europe">Europe</option>
        <option value="Oceania">Oceania</option>
      </select>
    </div>
    <div className="cards">
      {visibleCountries.map((country) => (
  <Card key={country.names.common} country={country} />
))}
      
      </div>
    </div>
  );
}
export default App;