import { useParams, Link } from "react-router-dom";
import { LuArrowLeft } from "react-icons/lu";
import type { Country } from "./types";

const Details = ({ countries }: { countries: Country[] }) => {
  const { code } = useParams();
  const country = countries.find((c) => c.codes.alpha_3 === code);

  if (!country) return <p>Loading...</p>;

  const nativeName = Object.values(country.names.native ?? {})[0]?.common;
  const currencies = country.currencies?.map((c) => c.name).join(", ");
  const languages = country.languages?.map((l) => l.name).join(", ");

  const borderCountries = (country.borders ?? []).map((borderCode) => {
    const neighbour = countries.find((c) => c.codes.alpha_3 === borderCode);
    return { code: borderCode, name: neighbour?.names.common };
  });

  return (
    <div className="details__content">
      <Link to="/" className="details__back-button">
        <LuArrowLeft /> Back
      </Link>

      <div className="details__info">
        <img src={country.flag.url_png} alt={country.flag.description} />

        <div className="details__text">
          <h2>{country.names.common}</h2>

          <div className="details__columns">
            <div>
              <p><strong>Native Name:</strong> {nativeName}</p>
              <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
              <p><strong>Region:</strong> {country.region}</p>
              <p><strong>Sub Region:</strong> {country.subregion}</p>
              <p><strong>Capital:</strong> {country.capitals?.[0]?.name}</p>
            </div>
            <div>
              <p><strong>Top Level Domain:</strong> {country.tlds?.join(", ")}</p>
              <p><strong>Currencies:</strong> {currencies}</p>
              <p><strong>Languages:</strong> {languages}</p>
            </div>
          </div>

          <div className="details__borders">
            <strong>Border Countries:</strong>
            <div className="details__border-list">
              {borderCountries.map((b) =>
                b.name ? (
                  <Link
                    key={b.code}
                    to={`/country/${b.code}`}
                    className="details__border"
                  >
                    {b.name}
                  </Link>
                ) : (
                  <span key={b.code} className="details__border">
                    {b.code}
                  </span>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;