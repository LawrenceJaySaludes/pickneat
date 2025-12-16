import { NavLink, useNavigate } from "react-router-dom";
import { useRef } from "react";
import logo from "../assets/pne-logo.jpg";
import "../styles/Sidebar.css";

export default function Sidebar({ isOpen, toggle }) {
  const navigate = useNavigate();
  const clickCount = useRef(0);
  const lastClickTime = useRef(0);

  // 🔐 Secret admin access — 5 FAST consecutive clicks
  const handleTitleClick = () => {
    const now = Date.now();

    // reset if clicks are too slow
    if (now - lastClickTime.current > 700) {
      clickCount.current = 0;
    }

    clickCount.current += 1;
    lastClickTime.current = now;

    if (clickCount.current === 5) {
      clickCount.current = 0;
      navigate("/admin-login");
    }
  };

  return (
    <>
      <aside className={`sidebar ${isOpen ? "open" : "closed"}`}>
        <div className="sidebar-header">
          <img src={logo} alt="Pick N Eat Logo" />

          {/* SECRET TRIGGER — NO CURSOR, NO HOVER */}
          <h2 id="pickneat-title" onClick={handleTitleClick}>
            PICK N EAT
          </h2>

          {isOpen && (
            <button
              className="menu-toggle inside close"
              onClick={toggle}
              aria-label="Close sidebar"
            >
              ←
            </button>
          )}
        </div>

        <nav className="sidebar-nav">
          <NavLink to="/" end>
            Order
          </NavLink>

          <NavLink to="/feedback">
            Feedback
          </NavLink>

          <NavLink to="/about">
            About Us
          </NavLink>

          <NavLink to="/faq">
            FAQs
          </NavLink>
        </nav>
      </aside>

      {!isOpen && (
        <button
          className="menu-toggle floating"
          onClick={toggle}
          aria-label="Open sidebar"
        >
          ☰
        </button>
      )}
    </>
  );
}
