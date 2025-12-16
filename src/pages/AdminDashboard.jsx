import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import "../styles/theme.css";

export default function AdminDashboard() {
  const [orders, setOrders] = useState([]);
  const [confirmId, setConfirmId] = useState(null);

  const fetchOrders = async () => {
    const { data } = await supabase
      .from("orders")
      .select("*")
      .eq("status", "pending")
      .order("created_at", { ascending: false });

    setOrders(data || []);
  };

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 5000);
    return () => clearInterval(interval);
  }, []);

 const markCompleted = async (id) => {
  const { error } = await supabase
    .from("orders")
    .update({
      status: "completed",
      completed_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) {
    console.error("UPDATE FAILED:", error.message);
    alert("Failed to complete order. Check permissions.");
    return;
  }

  // Remove instantly from UI
  setOrders((prev) => prev.filter((o) => o.id !== id));
  setConfirmId(null);
};

  const formatPHTime = (date) => {
    if (!date) return "";
    const utcDate = date.endsWith("Z") ? date : `${date}Z`;

    return new Date(utcDate).toLocaleString("en-PH", {
      timeZone: "Asia/Manila",
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <div className="container">
      <h1 className="brand" style={{ textAlign: "center", marginBottom: 32 }}>
        📋 Current Orders
      </h1>

      {orders.length === 0 && (
        <p style={{ textAlign: "center", marginTop: 40 }}>
          No pending orders 🎉
        </p>
      )}

      {orders.map((order) => (
        <div
          key={order.id}
          className="menu-card"
          style={{
            maxWidth: 820,
            margin: "22px auto",
            padding: "22px 26px",
          }}
        >
          {/* HEADER */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 14,
            }}
          >
            {/* CUSTOMER NAME – HIGHLIGHTED */}
            <div
              style={{
                background: "rgba(238, 224, 190, 1)",
                padding: "6px 14px",
                borderRadius: 14,
                fontWeight: 700,
                fontSize: "1rem",
              }}
            >
              👤 {order.customer_name}
            </div>

            <span style={{ fontSize: ".8rem", opacity: 0.6 }}>
              🕒 {formatPHTime(order.created_at)}
            </span>
          </div>

          {/* DETAILS */}
          <div style={{ lineHeight: 1.6, fontSize: ".95rem" }}>
            <p><b>📦 Package:</b> {order.package}</p>
            {order.set_choice && <p><b>🧾 Set:</b> {order.set_choice}</p>}
            {order.dishes && <p><b>🍽 Dishes:</b> {order.dishes.join(", ")}</p>}
            <p><b>📘 FB:</b> {order.fb_account}</p>
            <p><b>📞 Phone:</b> {order.phone}</p>
            <p><b>🚚 Order Type:</b> {order.order_type}</p>
            {order.delivery_address && (
              <p><b>📍 Address:</b> {order.delivery_address}</p>
            )}
          </div>

          {/* ACTION */}
          <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 16 }}>
            <button
              className="primary"
              style={{
                width: "auto",
                padding: "8px 16px",
                fontSize: ".85rem",
                borderRadius: 12,
              }}
              onClick={() => setConfirmId(order.id)}
            >
              ✓ Mark as Completed
            </button>
          </div>
        </div>
      ))}

      {/* CONFIRM MODAL */}
      {confirmId && (
        <div className="modal">
          <div className="success-box">
            <p>Mark this order as completed?</p>

            <div style={{ display: "flex", gap: 12, marginTop: 14 }}>
              <button className="primary" onClick={() => markCompleted(confirmId)}>
                Yes
              </button>
              <button className="choice" onClick={() => setConfirmId(null)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
