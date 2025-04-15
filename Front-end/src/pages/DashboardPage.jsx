// src/pages/Dashboard.jsx
import { useState } from "react";
import CountryCard from "../components/CountryCard";
import "../styles/dashboardPage.css";

export default function Dashboard() {
  const [country, setCountry] = useState("");
  const [countryInfo, setCountryInfo] = useState(null);
  const [apiKey, setApiKey] = useState(""); // Optional: you could also pass this from Login via state/context
  const API_BASE = "http://localhost:5001";

  const fetchCountry = async () => {
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
          // If your backend returns a full object with properties matching CountryCard,
          // you can pass the data directly.
          <CountryCard country={countryInfo} />
        ) : (
          <p>No data to display yet.</p>
        )}
      </div>
    </div>
  );
}

// // to authcontext
// import { useState, useContext } from "react";
// import { AuthContext } from "/Users/onelividusika/Desktop/Server Side/CW1/AuthContext.jsx";
// import CountryCard from "../components/CountryCard";
// import "../styles/dashboardPage.css";

// export default function Dashboard() {
//   const { apiKey } = useContext(AuthContext);
//   const [country, setCountry] = useState("");
//   const [countryInfo, setCountryInfo] = useState(null);
//   const API_BASE = "http://localhost:5001";

//   const fetchCountry = async () => {
//     const res = await fetch(`${API_BASE}/api/country/${country}`, {
//       headers: { "X-API-Key": apiKey }
//     });
//     const data = await res.json();
//     if (data.error) alert(data.error);
//     else setCountryInfo(data);
//   };

//   return (
//     <div className="dashboard-container">
//       <h2>Dashboard</h2>
//       <div className="dashboard-inputs">
//         <input
//           type="text"
//           placeholder="Enter country name (e.g. Japan)"
//           value={country}
//           onChange={(e) => setCountry(e.target.value)}
//         />
//         <button className="btn" onClick={fetchCountry}>Fetch Country Info</button>
//       </div>
//       <div className="dashboard-results">
//         {countryInfo ? (
//           <CountryCard country={countryInfo} />
//         ) : (
//           <p>No data to display yet.</p>
//         )}
//       </div>
//     </div>
//   );
// }
