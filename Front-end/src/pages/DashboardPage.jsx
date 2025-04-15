import { useState, useContext } from "react";
import { AuthContext } from '../AuthContext';
import CountryCard from "../components/CountryCard";
import "../styles/dashboardPage.css";

export default function Dashboard() {
  const { apiKey } = useContext(AuthContext);
  const [country, setCountry] = useState("");
  const [countryInfo, setCountryInfo] = useState(null);
  const API_BASE = "http://localhost:5001";

  const fetchCountry = async () => {
    // Proceed only if API key exists.
    if (!apiKey) {
      alert("You need an API key! Please log in.");
      return;
    }

    const res = await fetch(`${API_BASE}/api/country/${country}`, {
      headers: { "X-API-Key": apiKey }
    });
    const data = await res.json();
    if (data.error) alert(data.error);
    else setCountryInfo(data);
  };

  return (
    <div className="dashboard-container">
      <h2>Dashboard</h2>

      {apiKey && (
        <div className="dashboard-api-key">
          <p><strong>Your API Key:</strong> {apiKey}</p>
        </div>
      )}

      <div className="dashboard-inputs">
        <input
          type="text"
          placeholder="Enter country name (e.g. Japan)"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />
        <button className="btn" onClick={fetchCountry}>Fetch Country Info</button>
      </div>
      <div className="dashboard-results">
        {countryInfo ? (
          <CountryCard country={countryInfo} />
        ) : (
          <p>No data to display yet.</p>
        )}
      </div>
    </div>
  );
}
