"use client";
import { useState, useEffect } from "react";
import HeaderComponent from "@/components/layout/HeaderComponent";
import FooterComponent from "@/components/layout/FooterComponent";

import { langContent } from "@/lib/langContent";

export default function YesNoQuestionComponent({
   progress = 0,
   question = "Ask question",
   back,
   next,
   onAnswer,
   selectedValue = null,
}) {
   const [selected, setSelected] = useState(selectedValue);

   // ✅ প্রপ চেঞ্জ হলে selected আপডেট করার জন্য
   useEffect(() => {
      setSelected(selectedValue);
   }, [selectedValue]);

   // 🌐 Load language strings
   const lang = process.env.NEXT_PUBLIC_ACTIVE_LANGUAGE || "EN";
   const t = langContent[lang];

   const handleSubmit = (e) => {
      e.preventDefault();
      if (selected !== null && onAnswer) {
         onAnswer(selected); // send selected answer to parent
         if (next) next();   // move to next step
      }
   };

   const getButtonStyle = (option) =>
      option === selected
         ? "bg-white text-[#4A3A2D] border-2 border-[#4A3A2D]"
         : "bg-[#4A3A2D] text-white";

   return (
      <form
         onSubmit={handleSubmit}
         className="min-h-screen flex flex-col bg-[#f8f4ee] text-[#4A4A4A]"
      >
         <HeaderComponent progress={progress} />

         {/* Question Text */}
         <div className="text-center mt-10 px-4 text-xl font-semibold">
            {typeof question === "string" ? (
               <p>{question}</p>
            ) : (
               question.map((line, index) => <p key={index}>{line}</p>)
            )}
         </div>

         {/* Answer Buttons */}
         <div className="flex flex-col gap-4 items-center justify-center mt-10 px-4">
            <button
               type="button"
               onClick={() => setSelected("1")} // ✅ Yes
               className={`w-full max-w-xs h-14 rounded-xl text-lg font-semibold hover:opacity-90 transition ${getButtonStyle(
                  "1"
               )}`}
            >
               {t.yes}
            </button>
            <button
               type="button"
               onClick={() => setSelected("0")} // ✅ No
               className={`w-full max-w-xs h-14 rounded-xl text-lg font-semibold hover:opacity-90 transition ${getButtonStyle(
                  "0"
               )}`}
            >
               {t.no}
            </button>
         </div>

         {/* Footer */}
         <FooterComponent onBack={back} isSubmit />
      </form>
   );
}
