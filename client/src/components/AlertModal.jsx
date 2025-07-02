// components/AlertModal.jsx
import React from "react";

const AlertModal = ({ title, message, onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white dark:bg-[#1f1f1f] p-6 rounded-xl shadow-lg w-[90%] max-w-md text-center">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-3">
          {title || "Are you sure?"}
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-5">{message}</p>

        <div className="flex justify-center gap-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlertModal;
