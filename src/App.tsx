import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Details from "./Details.tsx";
import Navbar from "./components/Navbar.tsx";
import Card from "./components/Card.tsx";
import type { Country } from "./types.ts";
import countriesData from "./data/countries.json";
import "./index.css";

const countries = countriesData as unknown as Country[];

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [region, setRegion] = useState("");

  const filteredCountries = countries
    .filter((c) => c.flag?.url_png)
    .filter((c) =>
      c.names.common.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((c) => region === "" || c.region === region);

  return (
    <div>
      <Navbar />
      <main>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <div className="controls">
                  <input
                    aria-label="Search for a country"
                    type="text"
                    placeholder="Search for a country..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <select
                    aria-label="Filter by region"
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
                  {filteredCountries.map((country) => (
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
      </main>
    </div>
  );
};

export default App;