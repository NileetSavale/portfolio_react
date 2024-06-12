import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import './Popup.css';

const Popup = ({ onClose }) => {
  const formRef = useRef();
  const [successMessage, setSuccessMessage] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm(
      'service_swfyb7b',
      'template_zdxx5mj',
      formRef.current,
      'CyHFx_UmvRyvAgSHU'
    )
    .then(
      (result) => {
        console.log('SUCCESS!', result.text);
        setSuccessMessage(true);
        setTimeout(() => {
          setSuccessMessage(false);
          closeWithAnimation();
        }, 2000); // Show the success message for 2 seconds before closing the popup
      },
      (error) => {
        console.log('FAILED...', error.text);
        // Optionally, add an error message here
      }
    );
  };

  const handleClose = (e) => {
    if (formRef.current && !formRef.current.contains(e.target)) {
      closeWithAnimation();
    }
  };

  const closeWithAnimation = () => {
    if (formRef.current) {
      formRef.current.classList.add('fade-out');
      setTimeout(onClose, 300); // Match the duration of the fade-out animation
    }
  };

  return (
    <div className="popup-overlay" onClick={handleClose}>
      <div className="popup" ref={formRef}>
        <div className="popup-header">
          <h2 className="popup-title">Message Me</h2>
          <button className="close-button" onClick={closeWithAnimation}>
            &times;
          </button>
        </div>
        <div className="popup-content">
          {successMessage ? (
            <div className="success-message">Message sent successfully!</div>
          ) : (
            <form ref={formRef} onSubmit={sendEmail}>
              <input type="text" name="user_name" placeholder="Name*" required />
              <input type="email" name="user_email" placeholder="Email*" required />
              <textarea name="message" placeholder="Message*" required />
              <button type="submit">Send</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Popup;
