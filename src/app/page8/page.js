"use client";
import Link from "next/link";
import Image from "next/image";

import { FaArrowLeft } from "react-icons/fa";

export default function Page4() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="max-w-sm w-full bg-white rounded-xl shadow-lg p-6 text-center space-y-4">
        <h1 className="text-xl font-bold text-gray-800">
          What? You DO <span className="text-red-500">N'T</span> want to be
          informed?!
        </h1>

        <Image
          src="/house.jpg"
          alt="House Image"
          width={500} // required
          height={300} // required
          className="w-full rounded-lg object-cover"
        />

        <p className="text-sm text-gray-700">
          Our <strong>intuitive system</strong>, automatically shows you
          suitable animal shelters – without constant questions or bargains.
        </p>

        <p className="text-sm text-gray-600">
          Sounds cool? Then tell us how we can reach you.
        </p>

        <input
          type="email"
          placeholder="Your email"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <button className="w-full bg-brown-700 hover:bg-brown-800 text-white py-2 px-4 rounded-md">
          Für den Start anmelden
        </button>

        <Link href="#" className="text-xs text-gray-500 hover:underline">
          No, I don't want to be informed
        </Link>
      </div>
    </div>
  );
}
