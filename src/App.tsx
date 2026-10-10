import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Details from "./Details.tsx";
import Navbar from "./components/Navbar.tsx";
import Card from "./components/Card.tsx";
import type { Country } from "./types.ts";
import countriesData from "./data/countries.json";
import "./index.css";

const getInitialCountries = (): Country[] => {
  const cached = localStorage.getItem("countries-v2");
  return cached
    ? JSON.parse(cached)
    : (countriesData as unknown as Country[]);
};

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [region, setRegion] = useState("");
  const [countries, setCountries] = useState<Country[]>(getInitialCountries);

  useEffect(() => {
    if (localStorage.getItem("countries-v2")) return;

    const baseUrl =
      "https://api.restcountries.com/countries/v5?limit=100&response_fields=names.common,names.native,codes.alpha_3,flag.url_png,flag.description,population,region,subregion,capitals,tlds,currencies,languages,borders";

    const getPage = async (offset: number) => {
      const res = await fetch(`${baseUrl}&offset=${offset}`, {
        headers: { Authorization: `Bearer ${import.meta.env.VITE_API_KEY}` },
      });
      const result = await res.json();
      if (result.errors) throw new Error(result.errors[0].message);
      return result.data.objects as Country[];
    };

    Promise.all([getPage(0), getPage(100), getPage(200)])
      .then((pages) => {
        const all = pages.flat();
        setCountries(all);
        localStorage.setItem("countries-v2", JSON.stringify(all));
      })
      .catch((err) => console.error(err.message));
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

  return (
    <div>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <>
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
                  <Card key={country.codes.alpha_3} country={country} />
                ))}
              </div>
            </>
          }
        />
        <Route
          path="/country/:code"
          element={<Details countries={countries} />}
        />
      </Routes>
    </div>
  );
};

export default App;