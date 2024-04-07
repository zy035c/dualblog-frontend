import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Popup = ({ isOpen, onClose, msg }) => {
  useEffect(() => {
    if (isOpen) {
      const timeoutId = setTimeout(() => {
        onClose();
      }, 1500); // 2秒后关闭弹出窗口

      return () => clearTimeout(timeoutId);
    }
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="popup-overlay bg-white fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 p-4 rounded-md shadow-md"
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -10, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="popup-content">
            <button className="close-button" onClick={onClose}>
              Close
            </button>
            <p>{msg}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

Popup.defaultProps = {
  isOpen: false,
  onClose: () => {},
  msg: '',
};

export { Popup };