"use client";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import { langContent } from "@/lib/langContent";

const lang = process.env.NEXT_PUBLIC_ACTIVE_LANGUAGE || "EN";
const t = langContent[lang];

export default function FooterComponent({
  backHref,
  nextHref,
  onBack,
  isSubmit = false,
}) {
  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-[#4A3A2D] text-white h-16 z-50">
      <div className="w-full h-full flex justify-between items-center px-4">
        {/* Back */}
        {backHref ? (
          <Link href={backHref} className="flex items-center gap-2 text-sm">
            <FaArrowLeft />
            <span>{t.buttonBack}</span>
          </Link>
        ) : onBack ? (
          <button
            onClick={onBack}
            type="button"
            className="flex items-center gap-2 text-sm"
          >
            <FaArrowLeft />
            <span>{t.buttonBack}</span>
          </button>
        ) : (
          <div />
        )}

        {/* Further */}
        {isSubmit ? (
          <button
            type="submit"
            className="bg-white text-[#4A3A2D] px-4 py-2 text-sm rounded-full font-medium hover:bg-gray-100 transition"
          >
            {t.buttonFurther}
          </button>
        ) : nextHref ? (
          <Link
            href={nextHref}
            className="bg-white text-[#4A3A2D] px-4 py-2 text-sm rounded-full font-medium hover:bg-gray-100 transition"
          >
            {t.buttonFurther}
          </Link>
        ) : (
          <div />
        )}
      </div>
    </footer>
  );
}
