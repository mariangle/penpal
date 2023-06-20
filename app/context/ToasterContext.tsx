"use client"

import { Toaster } from "react-hot-toast"

const ToasterContext = () => {
    return (
        <div className="z-50">
            <Toaster
                toastOptions={{
                    className: '',
                    style: {
                    border: '1px solid #713200',
                    padding: '16px',
                    color: '#713200',
                    zIndex: "99"
                    },
                }}
                />
        </div>    
    )
}

export default ToasterContext;