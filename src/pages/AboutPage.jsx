import logo from "../assets/pne-logo-clean.png";
import "../styles/theme.css";

export default function AboutPage() {
  return (
    <div className="container">
      <div className="menu-card" style={{ maxWidth: 700, margin: "auto", textAlign: "center" }}>
        <img
          src={logo}
          alt="Pick N Eat"
          style={{ width: 100, margin: "20px auto" }}
        />

        <h1 className="brand">PICK N EAT</h1>

        <p style={{ marginTop: 18 }}>
          We are a food delivery service dedicated to providing affordable,
          delicious food packages for every occasion — birthdays, gatherings,
          and celebrations.
        </p>

        <p style={{ marginTop: 14 }}>
          📍 Purok 1, Communal Buhangin<br />
          Davao City, Philippines
        </p>

        <p style={{ marginTop: 10 }}>
          📞 0956 088 3296
        </p>

        <div style={{ marginTop: 24 }}>
          <p>📘 <strong>Facebook:</strong> Pick N Eat</p>
          <p>📸 <strong>Instagram:</strong> PickNEat_Dvo</p>
        </div>
      </div>
    </div>
  );
}
