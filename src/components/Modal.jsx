import React from 'react';

const Modal = ({ children, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
      <div className="modal">
        <div className="modal-content">
          <button onClick={onClose}>Close</button>
          {children}
        </div>
      </div>
  );
};

export default Modal;