'use client';
import React, { useState } from '@theia/core/shared/react';
import { X } from 'lucide-react';

interface WelcomeCardProps {
  onClose?: () => void;
  className?: string;
}

export default function WelcomeCard({
  onClose,
  className = '',
}: WelcomeCardProps) {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
    if (onClose) onClose();
  };

  if (!isVisible) return null;

  return (
    <div
      className={`relative w-full max-w-sm rounded-lg min-w-[320px] bg-black p-6 shadow-lg ${className}`}
    >
      <button
        onClick={handleClose}
        className="absolute right-3 top-3 text-white hover:text-gray-300"
        aria-label="Close"
      >
        <X size={20} />
      </button>

      <div className="space-y-20">
        <h2 className="text-2xl font-semibold text-white">
          Welcome to Scribe!
        </h2>

        <div className="flex h-16 items-end">
          <div className="text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-feather"
            >
              <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"></path>
              <line x1="16" y1="8" x2="2" y2="22"></line>
              <line x1="17.5" y1="15" x2="9" y2="15"></line>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
