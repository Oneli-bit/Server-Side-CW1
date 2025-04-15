export default function CountryCard({ country }) {
  // Process languages: convert the object of languages into an array of values and join them.
  const languages = country.languages
    ? Object.values(country.languages).join(", ")
    : "N/A";
  
  // Process currencies: if you want to display the names of currencies
  const currencies = country.currencies
    ? Object.values(country.currencies)
        .map((curr) => curr.name)
        .join(", ")
    : "N/A";
  
  return (
    <div className="country-card">
      <h3><strong>Country Name:</strong> {country.name}</h3>
      <p><strong>Currencies:</strong> {currencies}</p>
      <p><strong>Capital city:</strong> {country.capital}</p>
      <p><strong>Languages:</strong> {languages}</p>
      {country.flag && (
        <div className="flag-container">
          <p><strong>National Flag:</strong></p>
          <img src={country.flag} alt={`${country.name} flag`} />
        </div>
      )}
    </div>
  );
}
