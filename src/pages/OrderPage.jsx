import React, { useState, useRef } from "react";
import "../styles/theme.css";
import { supabase } from "../supabaseClient";
import logo from "../assets/pne-logo.jpg";

const DISHES = [
  "Buttered Garlic Shrimp",
  "Fish Fillet",
  "Tuna Kinilaw",
  "Chicken Adobo",
  "Chicken Teriyaki",
  "Shrimp & Tahong",
  "Buffalo Wings",
  "Chicken Fillet",
  "Pork/Fish Sweet & Sour",
  "Pork/Chicken Caldereta",
  "Pork/Chicken Afritada",
  "Humba",
  "Bicol Express",
  "Fried Chicken",
  "Chicken Curry",
];

const STAR_DISHES = [
  "Chicken Teriyaki",
  "Shrimp & Tahong",
  "Chicken Fillet",
  "Pork/Chicken Caldereta",
  "Fried Chicken",
];

const MENU = [
  { id: 1, title: "Package ₱1,999", image: "/img/1Menu.jpg", type: "set", sets: ["Set A", "Set B"] },
  { id: 2, title: "Package ₱2,599", image: "/img/2Menu.jpg", choose: 2 },
  { id: 3, title: "Package ₱3,299", image: "/img/3Menu.jpg", choose: 3 },
  { id: 4, title: "Package ₱3,899", image: "/img/4Menu.jpg", choose: 3 },
  { id: 5, title: "Package ₱4,199", image: "/img/5Menu.jpg", choose: 3 },
  { id: 6, title: "Package ₱4,699", image: "/img/6Menu.jpg", choose: 3 },
  { id: 7, title: "Package ₱4,899", image: "/img/7Menu.jpg", choose: 3 },
  { id: 8, title: "Package ₱7,999", image: "/img/8Menu.jpg", type: "set", sets: ["Set A", "Set B"] },
  { id: 9, title: "Package ₱9,999", image: "/img/9Menu.jpg", choose: 2 },
];

export default function OrderPage() {
  const [selected, setSelected] = useState(null);
  const [setChoice, setSetChoice] = useState("");
  const [dishes, setDishes] = useState([]);
  const [zoomImg, setZoomImg] = useState(null);
  const [success, setSuccess] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const [name, setName] = useState("");
  const [fb, setFb] = useState("");
  const [phone, setPhone] = useState("");
  const [method, setMethod] = useState("");
  const [address, setAddress] = useState("");

  const sectionRef = useRef(null);

  const toggleDish = (dish, limit) => {
    if (dishes.includes(dish)) {
      setDishes(dishes.filter(d => d !== dish));
    } else if (dishes.length < limit) {
      setDishes([...dishes, dish]);
    }
  };

  const submitOrder = async () => {
    const { error } = await supabase.from("orders").insert([
      {
        customer_name: name,
        fb_account: fb,
        phone,
        package: selected.title,
        set_choice: setChoice || null,
        dishes,
        order_type: method,
        status: "pending",
        delivery_address: method === "Delivery" ? address : null,
      }
    ]);

    if (!error) {
      setConfirmOpen(false);
      setSuccess(true);

      // ✅ CLEAR FORM
      setName("");
      setFb("");
      setPhone("");
      setMethod("");
      setAddress("");
      setSetChoice("");
      setDishes([]);
      setSelected(null);

      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="container">
      <div className="header">
        <img src={logo} className="logo" />
        <h1 className="brand">PICK N EAT</h1>
      </div>

      <p className="tagline">Affordable food packages for every occasion</p>

      {success && (
        <div className="success-box">
          <p>✅ Order placed successfully!</p>
          <p style={{ fontSize: ".85rem", opacity: 0.7, marginTop: 6 }}>
            Please screenshot this for confirmation.
          </p>
          <button className="success-btn" onClick={() => setSuccess(false)}>
            OK
          </button>
        </div>
      )}

      <div className="menu-grid">
        {MENU.map(pkg => (
          <div key={pkg.id} className="menu-card">
            <img src={pkg.image} onClick={() => setZoomImg(pkg.image)} />
            <h3>{pkg.title}</h3>
            <button
              className="select-btn"
              onClick={() => {
                setSelected(pkg);
                setSetChoice("");
                setDishes([]);
                setMethod("");
                setTimeout(() => {
                  sectionRef.current?.scrollIntoView({ behavior: "smooth" });
                }, 120);
              }}
            >
              Select Package
            </button>
          </div>
        ))}
      </div>

      {selected && (
        <div ref={sectionRef} className="order-section">
          <h2 className="package-title">{selected.title}</h2>

          {selected.type === "set" && (
            <div className="choice-row">
              {selected.sets.map(s => (
                <button
                  key={s}
                  className={setChoice === s ? "choice active" : "choice"}
                  onClick={() => setSetChoice(s)}
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          {selected.choose && (
            <>
              <h3 className="choose-title">Choose {selected.choose} dishes</h3>

              <div style={{ textAlign: "center", fontSize: ".85rem", marginBottom: 6 }}>
                ⭐ Most ordered dish
              </div>

              <p className="dish-progress">
                Selected {dishes.length} / {selected.choose}
              </p>

              <div className="dish-grid clean">
                {DISHES.map(d => (
                  <button
                    key={d}
                    className={dishes.includes(d) ? "dish selected" : "dish"}
                    disabled={!dishes.includes(d) && dishes.length === selected.choose}
                    onClick={() => toggleDish(d, selected.choose)}
                  >
                    {d}
                    {STAR_DISHES.includes(d) && " ⭐"}
                  </button>
                ))}
              </div>
            </>
          )}

          <div className="form">
            <input placeholder="Full Name" value={name} onChange={e => setName(e.target.value)} />
            <input placeholder="Facebook Account" value={fb} onChange={e => setFb(e.target.value)} />
            <input
              placeholder="Phone Number"
              value={phone}
              onChange={e => setPhone(e.target.value.replace(/\D/g, ""))}
            />

            <div className="choice-row">
              {["Delivery", "Pick-up"].map(m => (
                <button
                  key={m}
                  className={method === m ? "choice active" : "choice"}
                  onClick={() => setMethod(m)}
                >
                  {m}
                </button>
              ))}
            </div>

            {method === "Delivery" && (
              <input
                placeholder="Delivery Address"
                value={address}
                onChange={e => setAddress(e.target.value)}
              />
            )}

            <button
              className="primary"
              onClick={() => setConfirmOpen(true)}
              disabled={!name || !fb || !phone || !method}
            >
              Review Order
            </button>
          </div>
        </div>
      )}

      {/* CONFIRMATION MODAL */}
      {confirmOpen && (
        <div className="modal">
          <div className="success-box">
            <h3>Confirm Your Order</h3>
            <p><b>Name:</b> {name}</p>
            <p><b>Package:</b> {selected.title}</p>
            {setChoice && <p><b>Set:</b> {setChoice}</p>}
            {dishes.length > 0 && <p><b>Dishes:</b> {dishes.join(", ")}</p>}
            <p><b>Order Type:</b> {method}</p>
            {method === "Delivery" && <p><b>Address:</b> {address}</p>}

            <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
              <button className="primary" onClick={submitOrder}>
                Confirm Order
              </button>
              <button className="choice" onClick={() => setConfirmOpen(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {zoomImg && (
        <div className="modal" onClick={() => setZoomImg(null)}>
          <img src={zoomImg} />
        </div>
      )}
    </div>
  );
}
