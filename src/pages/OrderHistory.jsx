import { useEffect, useRef, useState } from "react";
import { supabase } from "../supabaseClient";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "../styles/theme.css";

export default function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [deleteId, setDeleteId] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const receiptRef = useRef();

  const fetchHistory = async () => {
    const { data } = await supabase
      .from("orders")
      .select("*")
      .eq("status", "completed")
      .order("completed_at", { ascending: false });

    setOrders(data || []);
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const deleteOrder = async (id) => {
    const { error } = await supabase.from("orders").delete().eq("id", id);
    if (error) {
      alert("Delete failed.");
      return;
    }
    setOrders((prev) => prev.filter((o) => o.id !== id));
    setDeleteId(null);
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

  // 🧾 THERMAL PDF (58mm)
  const downloadPDF = async () => {
    const canvas = await html2canvas(receiptRef.current, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", [58, canvas.height * 0.22]);
    pdf.addImage(imgData, "PNG", 0, 0, 58, canvas.height * 0.22);
    pdf.save(`receipt-${selectedOrder.customer_name}.pdf`);
  };

  const filteredOrders = orders.filter((order) =>
    order.customer_name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container">
      <h1 className="brand" style={{ textAlign: "center", marginBottom: 18 }}>
        📜 Order History
      </h1>

      {/* SEARCH */}
      <div style={{ display: "flex", justifyContent: "center", marginBottom: 24 }}>
        <input
          placeholder="🔍 Search name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: 280,
            padding: "10px 14px",
            borderRadius: 14,
            border: "1px solid #ddd",
          }}
        />
      </div>

      {filteredOrders.length === 0 && (
        <p style={{ textAlign: "center", marginTop: 40 }}>
          No matching orders
        </p>
      )}

      {filteredOrders.map((order) => (
        <div
          key={order.id}
          className="menu-card"
          style={{
            maxWidth: 820,
            margin: "12px auto",
            padding: "14px 18px",
            display: "grid",
            gridTemplateColumns: "1fr auto auto",
            alignItems: "center",
            gap: 16,
          }}
        >
          {/* NAME — FORCE LEFT */}
          <div
            onClick={() => setSelectedOrder(order)}
            style={{
              cursor: "pointer",
              textAlign: "left",
              justifySelf: "start",
            }}
          >
            <div style={{ fontWeight: 700 }}>
              👤 {order.customer_name}
            </div>
            <div style={{ fontSize: ".75rem", opacity: 0.6 }}>
              Created: {formatPHTime(order.created_at)}
            </div>
          </div>

          {/* STATUS */}
          <span
            style={{
              fontSize: ".75rem",
              padding: "4px 12px",
              borderRadius: 12,
              background: "#E8F6EE",
              color: "#2E7D32",
              fontWeight: 600,
              whiteSpace: "nowrap",
            }}
          >
            ✅ Completed
          </span>

          {/* DELETE */}
          <button
            className="choice"
            style={{ fontSize: ".75rem" }}
            onClick={() => setDeleteId(order.id)}
          >
            🗑
          </button>
        </div>
      ))}

      {/* RECEIPT MODAL */}
      {selectedOrder && (
        <div className="modal">
          <div className="thermal-receipt" ref={receiptRef}>
            <div style={{ textAlign: "center", fontWeight: 700 }}>
              PICK N EAT
            </div>
            <div style={{ textAlign: "center", fontSize: 10 }}>
              ------------------------
            </div>

            <p>Name: {selectedOrder.customer_name}</p>
            <p>Date: {formatPHTime(selectedOrder.created_at)}</p>
            <p>Package: {selectedOrder.package}</p>

            {selectedOrder.set_choice && <p>Set: {selectedOrder.set_choice}</p>}

            {selectedOrder.dishes && (
              <>
                <p>Dishes:</p>
                {selectedOrder.dishes.map((d, i) => (
                  <p key={i}>- {d}</p>
                ))}
              </>
            )}

            <p>Type: {selectedOrder.order_type}</p>

            {selectedOrder.delivery_address && (
              <p>Addr: {selectedOrder.delivery_address}</p>
            )}

            <div style={{ textAlign: "center", marginTop: 10 }}>
              ------------------------
              <br />
              Thank you!
            </div>

            <div style={{ marginTop: 12 }}>
              <button className="primary" onClick={downloadPDF}>
                ⬇ Print Receipt
              </button>
              <button
                className="choice"
                style={{ marginTop: 8 }}
                onClick={() => setSelectedOrder(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DELETE CONFIRM */}
      {deleteId && (
        <div className="modal">
          <div className="success-box">
            <p>Delete this order permanently?</p>
            <div style={{ display: "flex", gap: 12 }}>
              <button className="primary" onClick={() => deleteOrder(deleteId)}>
                Yes
              </button>
              <button className="choice" onClick={() => setDeleteId(null)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
