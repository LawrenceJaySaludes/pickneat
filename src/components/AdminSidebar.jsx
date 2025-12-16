import { NavLink, useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import logo from "../assets/pne-logo.jpg";
import "../styles/Sidebar.css";

export default function AdminSidebar({ isOpen, toggle }) {
  const navigate = useNavigate();

  const logout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  return (
    <>
      <aside
        className={`sidebar ${isOpen ? "open" : "closed"}`}
        style={{ display: "flex", flexDirection: "column" }}
      >
        {/* HEADER */}
        <div className="sidebar-header">
          <img src={logo} alt="Pick N Eat Logo" />
          <h2>ADMIN</h2>

          {isOpen && (
            <button className="menu-toggle inside close" onClick={toggle}>
              ←
            </button>
          )}
        </div>

        {/* NAV */}
        <nav className="sidebar-nav">
          <NavLink
            to="/admin"
            end
            className={({ isActive }) => (isActive ? "active" : "")}
          >
             Current Orders
          </NavLink>

          <NavLink
            to="/admin/history"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
             Order History
          </NavLink>

          <NavLink
  to="/admin/summary"
  className={({ isActive }) => (isActive ? "active" : "")}
>
   Daily Summary
</NavLink>

        </nav>

        {/* LOGOUT */}
        <div style={{ marginTop: "auto", padding: 16 }}>
          <button
            onClick={logout}
            style={{
              width: "100%",
              padding: 14,
              borderRadius: 16,
              background: "#E25A5A",
              color: "#fff",
              fontWeight: 700,
              cursor: "pointer",
              border: "none",
            }}
          >
            Logout
          </button>
        </div>
      </aside>

      {!isOpen && (
        <button className="menu-toggle floating" onClick={toggle}>
          ☰
        </button>
      )}
    </>
  );
}
