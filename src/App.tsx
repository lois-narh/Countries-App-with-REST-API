import React, {useState} from 'react';
import Navbar from './components/Navbar.tsx';
import './index.css';

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [region, setRegion] = useState('');

  return(
    <div>
      <Navbar />

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
        <option value="America">America</option>
        <option value="Asia">Asia</option>
        <option value="Europe">Europe</option>
        <option value="Oceania">Oceania</option>
      </select>
    </div>
  );
}
export default App;