"use client";
import { useState, useEffect } from "react";
import HeaderComponent from "@/components/layout/HeaderComponent";
import FooterComponent from "@/components/layout/FooterComponent";

export default function ChoseComponent({
   progress = 0,
   question = "Was fur ein Hautier hast du aktuell bei dir ?",
   back,
   next,
}) {
   const options = ["🐶", "🐱", "🐶🐱", "Text"];
   const [selected, setSelected] = useState(null);

   // ✅ Load previous selection from sessionStorage
   useEffect(() => {
      const stored = sessionStorage.getItem("question2_ans");
      if (stored) {
         setSelected(stored);
      }
   }, []);

   const handleSubmit = (e) => {
      e.preventDefault();
      if (selected) {
         sessionStorage.setItem("question2_ans", selected); // ✅ store in sessionStorage
         if (next) next();
      }
   };

   const getOptionStyle = (opt) =>
      opt === selected
         ? "bg-white text-[#4A3A2D] border-2 border-[#4A3A2D]"
         : "bg-[#4A3A2D] text-white";

   return (
      <form
         onSubmit={handleSubmit}
         className="min-h-screen flex flex-col bg-[#f8f4ee] text-[#4A4A4A]"
      >
         <HeaderComponent progress={progress} />

         {/* Question Text */}
         <div className="text-center mt-10 text-xl font-semibold px-4">
            {typeof question === "string" ? (
               <p>{question}</p>
            ) : (
               question.map((line, index) => <p key={index}>{line}</p>)
            )}
         </div>

         {/* Option Grid */}
         <div className="grid grid-cols-2 gap-4 px-6 mt-10 max-w-md mx-auto">
            {options.map((opt, index) => (
               <button
                  key={index}
                  type="button"
                  onClick={() => setSelected(opt)}
                  className={`w-40 h-24 flex items-center justify-center rounded-lg text-2xl font-semibold cursor-pointer hover:opacity-90 transition ${getOptionStyle(
                     opt
                  )}`}
               >
                  {opt}
               </button>
            ))}
         </div>

         {/* Footer with Submit */}
         <FooterComponent onBack={back} isSubmit />
      </form>
   );
}
