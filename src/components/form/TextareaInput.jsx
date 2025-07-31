// src/components/form/TextareaInput.jsx
"use client";
import React from "react";

export default function TextareaInput({
   value,
   onChange,
   placeholder = "",
   required = false,
   inputRef = null,
   className = "",
   rows = 4,
}) {
   return (
      <textarea
         ref={inputRef}
         value={value}
         onChange={onChange}
         placeholder={placeholder}
         required={required}
         rows={rows}
         className={`w-full px-4 py-2 h-15 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#4A3A2D] resize-none ${className}`}
      />
   );
}
