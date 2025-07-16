"use client";
import Link from "next/link";
import { FaArrowLeft, FaChevronDown } from "react-icons/fa";

export default function Page1() {
  return (
    <div className="min-h-screen flex flex-col bg-[#f8f4ee] text-[#4A4A4A]">
      {/* Header */}
      <div className="text-center text-2xl font-bold mt-6">animalistic.</div>

      {/* Progress Bar */}
      <div className="w-4/5 mx-auto mt-6 h-2 bg-white rounded-full">
        <div className="h-full w-[6.25%] bg-[#4A4A4A] rounded-full"></div>
      </div>

      {/* Frage Text */}
      <div className="text-center mt-10 text-xl font-semibold">
        <p>Ask</p>
        <p>question</p>
      </div>

      {/* Dropdown Box */}
      <div className="flex justify-center mt-10">
        <div className="w-64 h-12 bg-[#A6948F] rounded-lg px-4 flex items-center justify-between text-white text-sm">
          <span>select the answer</span>
          <FaChevronDown />
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-auto bg-[#4A4A4A] text-white p-4">
        <div className="max-w-md mx-auto flex justify-between items-center">
          <button className="flex items-center gap-2"></button>

          <Link
            href="/page2"
            className="bg-white text-[#4A4A4A] px-5 py-2 rounded-full font-medium hover:bg-gray-200 transition"
          >
            Further
          </Link>
        </div>
      </footer>
    </div>
  );
}
