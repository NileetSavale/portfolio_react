// Popup.js

import React, { useRef } from 'react';
import './Popup.css';

const Popup = ({ onClose }) => {
  const popupRef = useRef(null);

  const handleClose = (e) => {
    if (popupRef.current && !popupRef.current.contains(e.target)) {
      closeWithAnimation();
    }
  };

  const closeWithAnimation = () => {
    if (popupRef.current) {
      popupRef.current.classList.add('fade-out');
      setTimeout(onClose, 300); // Match the duration of the fade-out animation
    }
  };

  return (
    <div className="popup-overlay" onClick={handleClose}>
      <div className="popup" ref={popupRef}>
        <div className="popup-header">
        <h2 className="popup-title">Message Me</h2>
          <button className="close-button" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="popup-content">
          <input type="email" placeholder="Email*" required />
          <input type="tel" placeholder="Contact Number" />
          <textarea placeholder="Message*" required />
          <button>Send</button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
