// src/components/CountryCard.jsx
export default function CountryCard({ country }) {
    return (
      <div className="country-card">
        <h3>{country.name}</h3>
        <p><strong>Capital:</strong> {country.capital}</p>
        <p><strong>Currency:</strong> {country.currency}</p>
        <p><strong>Languages:</strong> {country.languages.join(", ")}</p>
        {country.flag && <img src={country.flag} alt={`${country.name} flag`} />}
      </div>
    );
  }
  