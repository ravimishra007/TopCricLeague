import React, { useEffect } from 'react';
import { FaCheckCircle, FaExclamationCircle, FaInfoCircle, FaTimes } from 'react-icons/fa';

interface SnackbarProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'success' | 'error' | 'info';
  title: string;
  message: string;
  duration?: number;
}

const Snackbar: React.FC<SnackbarProps> = ({
  isOpen,
  onClose,
  type,
  title,
  message,
  duration = 3000
}) => {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isOpen, duration, onClose]);

  if (!isOpen) return null;

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <FaCheckCircle className="text-green-500 text-xl" />;
      case 'error':
        return <FaExclamationCircle className="text-red-500 text-xl" />;
      case 'info':
        return <FaInfoCircle className="text-blue-500 text-xl" />;
      default:
        return <FaInfoCircle className="text-blue-500 text-xl" />;
    }
  };

  const getBgColor = () => {
    switch (type) {
      case 'success':
        return 'bg-green-900/90';
      case 'error':
        return 'bg-red-900/90';
      case 'info':
        return 'bg-blue-900/90';
      default:
        return 'bg-blue-900/90';
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 animate-slide-up">
      <div className={`${getBgColor()} backdrop-blur-sm text-white p-4 rounded-lg shadow-lg border border-white/10 max-w-md flex items-start gap-3`}>
        <div className="flex-shrink-0 mt-0.5">
          {getIcon()}
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-sm">{title}</h3>
          <p className="text-sm text-gray-200">{message}</p>
        </div>
        <button 
          onClick={onClose}
          className="flex-shrink-0 text-gray-300 hover:text-white transition-colors"
        >
          <FaTimes />
        </button>
      </div>
    </div>
  );
};

export default Snackbar; 