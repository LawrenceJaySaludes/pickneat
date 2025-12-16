import { useState } from "react";
import "../styles/theme.css";

export default function FeedbackPage() {
  const images = [
    "fb1.png",
    "fb2.png",
    "fb3.png",
    "fb4.png",
    "fb5.png",
    "fb6.png",
    "fb7.png",
  ];

  const [activeImage, setActiveImage] = useState(null);

  return (
    <div className="container">
      <div className="menu-card" style={{ maxWidth: 900, margin: "auto" }}>
        <h1 className="brand" style={{ textAlign: "center" }}>
          💬 Customer Feedback
        </h1>

        <div className="feedback-grid">
          {images.map((img, index) => (
            <div
              key={index}
              className={`feedback-item ${
                index === 6 ? "center-last" : ""
              }`}
              onClick={() => setActiveImage(img)}
            >
              <img
                src={`/feedback/${img}`}
                alt={`Feedback ${index + 1}`}
              />
            </div>
          ))}
        </div>
      </div>

      {/* IMAGE MODAL */}
      {activeImage && (
        <div className="modal" onClick={() => setActiveImage(null)}>
          <img
            src={`/feedback/${activeImage}`}
            alt="Feedback full"
          />
        </div>
      )}
    </div>
  );
}
