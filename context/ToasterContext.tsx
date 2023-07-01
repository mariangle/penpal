"use client"

import { Toaster } from "react-hot-toast";

const ToasterContext = () => {
  return (
    <div className="z-50">
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            backgroundColor: '#fff',
            color: '#333',
            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
            borderRadius: '8px',
            padding: '16px',
          },
        }}
      />
    </div>
  );
};

export default ToasterContext;
