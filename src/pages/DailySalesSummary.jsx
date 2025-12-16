import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import "../styles/theme.css";

export default function DailySalesSummary() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchToday();
  }, []);

  const fetchToday = async () => {
    const start = new Date();
    start.setHours(0, 0, 0, 0);

    const end = new Date();
    end.setHours(23, 59, 59, 999);

    const { data } = await supabase
      .from("orders")
      .select("*")
      .eq("status", "completed")
      .gte("created_at", start.toISOString())
      .lte("created_at", end.toISOString());

    setOrders(data || []);
  };

  /* CALCULATIONS */
  const totalOrders = orders.length;

  const packageCount = {};
  const dishCount = {};
  const orderTypeCount = { Pickup: 0, Delivery: 0 };

  orders.forEach((o) => {
    packageCount[o.package] =
      (packageCount[o.package] || 0) + 1;

    o.dishes?.forEach((d) => {
      dishCount[d] = (dishCount[d] || 0) + 1;
    });

    if (o.order_type === "Delivery") orderTypeCount.Delivery++;
    else orderTypeCount.Pickup++;
  });

  return (
    <div className="container">
      <h1 className="brand" style={{ textAlign: "center", marginBottom: 28 }}>
        📊 Daily Sales Summary
      </h1>

      {/* TOTAL */}
      <div className="menu-card" style={{ maxWidth: 520, margin: "0 auto 24px" }}>
        <h3>📦 Total Orders Today</h3>
        <p style={{ fontSize: "2rem", fontWeight: 800 }}>
          {totalOrders}
        </p>
      </div>

      {/* PACKAGE BREAKDOWN */}
      <div className="menu-card" style={{ maxWidth: 520, margin: "0 auto 24px" }}>
        <h3>📦 Packages</h3>
        {Object.keys(packageCount).length === 0 && <p>No data</p>}
        {Object.entries(packageCount).map(([pkg, count]) => (
          <p key={pkg}>
            {pkg}: <b>{count}</b>
          </p>
        ))}
      </div>

      {/* DISH BREAKDOWN */}
      <div className="menu-card" style={{ maxWidth: 520, margin: "0 auto 24px" }}>
        <h3>🍽 Dishes</h3>
        {Object.keys(dishCount).length === 0 && <p>No data</p>}
        {Object.entries(dishCount).map(([dish, count]) => (
          <p key={dish}>
            {dish}: <b>{count}</b>
          </p>
        ))}
      </div>

      {/* ORDER TYPE */}
      <div className="menu-card" style={{ maxWidth: 520, margin: "0 auto" }}>
        <h3>🚚 Order Type</h3>
        <p>Pickup: <b>{orderTypeCount.Pickup}</b></p>
        <p>Delivery: <b>{orderTypeCount.Delivery}</b></p>
      </div>
    </div>
  );
}
