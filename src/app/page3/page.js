"use client";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

export default function Page3() {
  const options = ["🐶", "🐱", "🐶🐱", "text"];

  return (
    <div className="min-h-screen flex flex-col bg-[#f8f4ee] text-[#4A4A4A]">
      {/* Header */}
      <div className="text-center text-2xl font-bold mt-6">animalistic.</div>

      {/* Progress Bar */}
      <div className="w-4/5 mx-auto mt-6 h-2 bg-white rounded-full">
        <div className="h-full w-[18.75%] bg-[#4A4A4A] rounded-full"></div>
      </div>

      {/* Frage Text */}
      <div className="text-center mt-10 text-xl font-semibold">
        <p>Ask</p>
        <p>question</p>
      </div>

      {/* Option Grid */}
      <div className="grid grid-cols-2 gap-4 justify-items-center mt-10 px-4">
        {options.map((opt, index) => (
          <div
            key={index}
            className="w-24 h-24 bg-[#4A3A2D] text-white flex items-center justify-center rounded-lg text-2xl font-semibold cursor-pointer hover:opacity-90 transition"
          >
            {opt}
          </div>
        ))}
      </div>

      {/* Footer */}
      <footer className="mt-auto bg-[#4A3A2D] text-white p-4">
        <div className="max-w-md mx-auto flex justify-between items-center">
          <button className="flex items-center gap-2">
            <FaArrowLeft />
            <Link href="/page2">Back</Link>
          </button>

          <Link
            href="/page4"
            className="bg-white text-[#4A3A2D] px-5 py-2 rounded-full font-medium hover:bg-gray-100 transition"
          >
            Further
          </Link>
        </div>
      </footer>
    </div>
  );
}
