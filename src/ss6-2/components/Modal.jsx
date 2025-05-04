import React from 'react';

function Modal({ title, onClose, onConfirm, children }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded w-[300px]">
        <div className="flex justify-between items-center mb-4">
          <h3>{title}</h3>
          <button onClick={onClose}>✖</button>
        </div>
        <div className="mb-4">{children}</div>
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="btn btn-light">Hủy</button>
          <button onClick={onConfirm} className="btn btn-danger">Xác nhận</button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
