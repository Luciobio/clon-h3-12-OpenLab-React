import React, { useState } from "react";
import "./CreateInitiative.css";

export const CreateInitiative = ({ isOpen, onClose }) => {
  if (!isOpen) return null; // Render nothing if the modal is not open

  const handleOutsideClick = (e) => {
    if (e.target.className === "modal-overlay") {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOutsideClick}>
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <h2>New Initiative</h2>
        <form>
          <div className="form-group">
            <label>Image</label>
            <div className="image-upload">+</div>
          </div>
          <div className="form-group">
            <label>Name</label>
            <input type="text" placeholder="Name" />
          </div>
          <div className="form-group">
            <label>Idea</label>
            <textarea placeholder="Idea"></textarea>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Problem</label>
              <input type="text" placeholder="Problem" />
            </div>
            <div className="form-group">
              <label>Opportunity</label>
              <input type="text" placeholder="Opportunity" />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Solution</label>
              <input type="text" placeholder="Solution" />
            </div>
          </div>
          <button type="submit" className="create-dao-button">
            Create DAO
          </button>
        </form>
      </div>
    </div>
  );
};
