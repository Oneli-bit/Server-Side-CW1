import { Link } from "react-router-dom";
import "../styles/landing.css";

export default function Landing() {
  return (
    <div className="landing-container">
      <div className="landing-content">
        <h1>Welcome to the API Middleware</h1>
        <p>
          Secure and streamlined access to country data from RestCountries.com. 
          Register or Login to manage your API keys and fetch essential country information.
        </p>
        <div className="landing-buttons">
          <Link to="/register" className="btn">Register</Link>
          <Link to="/login" className="btn">Login</Link>
        </div>
      </div>
    </div>
  );
}
