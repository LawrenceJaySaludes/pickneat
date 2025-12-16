import React, { useState } from "react";
import "../styles/theme.css";

export default function FaqPage() {
  const [open, setOpen] = useState(null);

  const toggle = (id) => {
    setOpen(open === id ? null : id);
  };

  const Section = ({ title, children }) => (
    <div style={{ marginBottom: 36 }}>
      <h2
        style={{
          fontSize: "1.2rem",
          fontWeight: 800,
          marginBottom: 14,
        }}
      >
        {title}
      </h2>
      <div
        style={{
          background: "#fff",
          borderRadius: 20,
          boxShadow: "0 8px 24px rgba(0,0,0,.06)",
          overflow: "hidden",
        }}
      >
        {children}
      </div>
    </div>
  );

  const Item = ({ id, q, a }) => (
    <div style={{ borderBottom: "1px solid #eee" }}>
      <button
        onClick={() => toggle(id)}
        style={{
          width: "100%",
          textAlign: "left",
          padding: "18px 20px",
          background: "transparent",
          border: "none",
          fontWeight: 700,
          fontSize: ".95rem",
          cursor: "pointer",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {q}
        <span style={{ fontSize: "1.2rem" }}>
          {open === id ? "−" : "+"}
        </span>
      </button>

      {open === id && (
        <div
          style={{
            padding: "0 20px 18px",
            color: "#555",
            fontSize: ".9rem",
            lineHeight: 1.6,
          }}
        >
          {a}
        </div>
      )}
    </div>
  );

  return (
    <div className="container" style={{ maxWidth: 760 }}>
      <h1 className="brand" style={{ marginBottom: 6 }}>
        FAQs
      </h1>

      <p className="tagline" style={{ marginBottom: 40 }}>
        Everything you need to know before ordering from Pick N Eat
      </p>

      {/* GENERAL */}
      <Section title="📌 General">
        <Item
          id="g1"
          q="How early should I place my order?"
          a="Please place your order at least 1–3 days before your scheduled date to ensure availability."
        />
        <Item
          id="g2"
          q="Do you accept same-day or rush orders?"
          a="No. We do not accept same-day or rush orders to maintain food quality."
        />
        <Item
          id="g3"
          q="Is there a minimum order quantity?"
          a="No minimum order is required."
        />
        <Item
          id="g4"
          q="Are prices fixed or can they change?"
          a="Prices are subject to change without prior notice. Reserving early is recommended."
        />
      </Section>

      {/* ORDERS & DELIVERY */}
      <Section title="🚚 Orders & Delivery">
        <Item
          id="o1"
          q="Do you offer delivery?"
          a="Yes, we offer both delivery and pick-up options."
        />
        <Item
          id="o2"
          q="What areas do you deliver to?"
          a="We deliver to all areas within Davao City."
        />
        <Item
          id="o3"
          q="Is there a delivery fee?"
          a="Yes, delivery fees apply depending on the location."
        />
        <Item
          id="o4"
          q="What time is pick-up available?"
          a="Pick-up is available from 8:00 AM to 5:00 PM."
        />
      </Section>

      {/* PAYMENT & SUPPORT */}
      <Section title="💳 Payment & Support">
        <Item
          id="p1"
          q="What payment methods do you accept?"
          a="We accept Cash on Delivery (COD), GCash, and Bank Transfer."
        />
        <Item
          id="p2"
          q="Do you require a down payment?"
          a="No down payment is required."
        />
        <Item
          id="p3"
          q="How will I know if my order is confirmed?"
          a="Order confirmation will be sent via Facebook message or your provided contact number."
        />
        <Item
          id="p4"
          q="Who can I contact for order updates?"
          a="You may message us directly on our official Facebook page."
        />
        <Item
          id="p5"
          q="Can I cancel or change my order?"
          a="Yes. Please message us on Facebook as soon as possible for any changes or cancellation."
        />
      </Section>

      {/* FACEBOOK CTA — CLEAN */}
      <div
        style={{
          marginTop: 60,
          padding: 28,
          borderRadius: 20,
          background: "#fff",
          boxShadow: "0 8px 24px rgba(0,0,0,.06)",
          textAlign: "center",
        }}
      >
        <h3 style={{ fontWeight: 800, marginBottom: 8 }}>
          Still have questions?
        </h3>

        <p style={{ marginBottom: 16, color: "#555" }}>
          Send us a message and we’ll reply as soon as possible.
        </p>

        <a
          href="https://www.facebook.com/pickneatfood"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-block",
            padding: "12px 24px",
            borderRadius: 18,
            background: "#1877F2",
            color: "#fff",
            fontWeight: 700,
            textDecoration: "none",
          }}
        >
          💬 Message us on Facebook
        </a>
      </div>
    </div>
  );
}
