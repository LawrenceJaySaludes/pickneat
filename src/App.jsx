import { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { supabase } from "./supabaseClient";

import Sidebar from "./components/Sidebar";
import AdminSidebar from "./components/AdminSidebar";

import OrderPage from "./pages/OrderPage";
import FeedbackPage from "./pages/FeedbackPage";
import AboutPage from "./pages/AboutPage";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import OrderHistory from "./pages/OrderHistory";
import DailySalesSummary from "./pages/DailySalesSummary";
import FaqPage from "./pages/FaqPage";


export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  const location = useLocation();

  // 🔐 WATCH AUTH STATE
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setIsAdmin(!!data.session);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setIsAdmin(!!session);
      }
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  const isAdminLoginPage = location.pathname === "/admin-login";
  const isAdminPage = location.pathname.startsWith("/admin");

  return (
    <>
      {/* 🧠 SIDEBAR LOGIC */}
      {!isAdminLoginPage && (
        isAdmin && isAdminPage ? (
          <AdminSidebar
            isOpen={sidebarOpen}
            toggle={() => setSidebarOpen(!sidebarOpen)}
          />
        ) : !isAdminPage ? (
          <Sidebar
            isOpen={sidebarOpen}
            toggle={() => setSidebarOpen(!sidebarOpen)}
          />
        ) : null
      )}

      <main
        className="app-content"
        style={{
          marginLeft:
            !isAdminLoginPage && sidebarOpen ? "260px" : "0px",
          transition: "margin-left 0.3s ease",
        }}
      >
        <Routes>
          <Route path="/" element={<OrderPage />} />
          <Route path="/feedback" element={<FeedbackPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/history" element={<OrderHistory />} />
          <Route path="/admin/summary" element={<DailySalesSummary />} />
          <Route path="/faq" element={<FaqPage />} />


        </Routes>
      </main>
    </>
  );
}
