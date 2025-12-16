import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "../supabaseClient";
import logo from "../assets/pne-logo-clean.png";
import "../styles/theme.css";

export default function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault(); // 🔑 allows Enter key
    setErrorMsg("");

    if (!email || !password) {
      setErrorMsg("Please enter email and password.");
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setErrorMsg("Invalid admin credentials.");
      return;
    }

    setSuccess(true);
  };

  return (
    <div className="container">
      <div
        className="menu-card"
        style={{ maxWidth: 420, margin: "auto", position: "relative" }}
      >
        {/* Back to Home */}
        <Link
          to="/"
          style={{
            position: "absolute",
            top: 18,
            right: 20,
            fontSize: ".85rem",
            opacity: 0.75,
            textDecoration: "none",
          }}
        >
          ← Back to Home
        </Link>

        <img
          src={logo}
          alt="Pick N Eat"
          style={{ width: 120, margin: "26px auto", display: "block" }}
        />

        <h1 className="brand" style={{ textAlign: "center" }}>
          Admin Login
        </h1>

        {/* 🔽 FORM START */}
        <form onSubmit={handleLogin}>
          <input
            placeholder="Admin Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <div style={{ position: "relative" }}>
            <input
              type={showPass ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <span
              onClick={() => setShowPass(!showPass)}
              style={{
                position: "absolute",
                right: 16,
                top: "50%",
                transform: "translateY(-50%)",
                cursor: "pointer",
                fontSize: 18,
                opacity: 0.6,
              }}
            >
              {showPass ? "👁‍🗨" : "👁"}
            </span>
          </div>

          {errorMsg && (
            <div className="success-box" style={{ borderColor: "#e08c8c" }}>
              {errorMsg}
            </div>
          )}

          {/* type="submit" is important */}
          <button className="primary" type="submit">
            Login
          </button>
        </form>
        {/* 🔼 FORM END */}
      </div>

      {success && (
        <div className="modal">
          <div className="success-box">
            <p>✅ Login successful</p>
            <button
              className="primary"
              style={{ marginTop: 12 }}
              onClick={() => navigate("/admin")}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
