"use client"

import { Toaster } from "react-hot-toast";

const ToasterContext = () => {
  return (
    <div className="z-50">
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: "#333",
            color: "#fff",
            borderRadius: "8px",
          },
          duration: 3000,
        }}
      />
    </div>
  );
};

export default ToasterContext;
