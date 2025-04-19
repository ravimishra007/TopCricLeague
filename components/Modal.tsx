import React from 'react';
import { FaCheckCircle, FaTimesCircle, FaInfoCircle, FaTimes } from 'react-icons/fa';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'success' | 'error' | 'info';
  title: string;
  message: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, type, title, message }) => {
  if (!isOpen) return null;

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <FaCheckCircle className="h-10 w-10 text-primary" />;
      case 'error':
        return <FaTimesCircle className="h-10 w-10 text-primary" />;
      case 'info':
        return <FaInfoCircle className="h-10 w-10 text-primary" />;
    }
  };

  const getButtonStyle = () => {
    switch (type) {
      case 'success':
        return 'bg-primary hover:bg-primary-dark';
      case 'error':
        return 'bg-primary hover:bg-primary-dark';
      case 'info':
        return 'bg-primary hover:bg-primary-dark';
    }
  };

  const getButtonText = () => {
    switch (type) {
      case 'success':
        return 'Continue';
      case 'error':
        return 'Try Again';
      case 'info':
        return 'OK';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-70 transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-secondary-light rounded-2xl max-w-md w-full mx-auto p-6 shadow-xl transform transition-all animate-fade-in border border-primary/30">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-primary transition-colors"
        >
          <FaTimes className="text-xl" />
        </button>

        {/* Content */}
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full mb-4">
            {getIcon()}
          </div>
          <h3 className="text-xl font-medium text-white mb-2">
            {title}
          </h3>
          <p className="text-gray-300">
            {message}
          </p>
          <div className="mt-6">
            <button
              onClick={onClose}
              className={`w-full py-3 px-4 rounded-full font-medium text-white ${getButtonStyle()} transition-colors shadow-glow`}
            >
              {getButtonText()}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal; 