import type { Country } from "../types";

const Card = ({ country }: { country: Country }) => {
  return (
    <div className="card">
      <div className="card__image">
        <img src={country.flag.url_png} alt={country.flag.description} />
      </div>
      <div className="card__info">
        <h2>{country.names.common}</h2>
        <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
        <p><strong>Region:</strong> {country.region}</p>
        <p><strong>Capital:</strong> {country.capitals?.[0]?.name}</p>
      </div>
    </div>
  );
};

export default Card;