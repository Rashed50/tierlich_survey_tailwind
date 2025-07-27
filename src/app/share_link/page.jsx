"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import HeaderComponent from "@/components/layout/HeaderComponent";
import FooterComponent from "@/components/layout/FooterComponent";
import { langContent } from "@/lib/langContent";

export default function HasNotPet() {
   const [selected, setSelected] = useState();
   const router = useRouter();

   const lang = process.env.NEXT_PUBLIC_ACTIVE_LANGUAGE || "DE";
   const t = langContent[lang];

   const handleSubmit = (e) => {
      e.preventDefault();
      if (!selected) {
         setError(true);
         return;
      }

      //  sessionStorage.setItem("number_of_pets", selected);

      router.push("/share_link");
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
         <HeaderComponent progress={95} />

         {/* Question Text */}
         <div className="text-center mt-10 px-4 text-xl font-semibold">
            {"Vielen Dank für deine Teilnahme."}
         </div>

         <div className="flex flex-col-2 gap-0 items-center justify-center mt-10 px-4">
            <input
               type="text"
               // value={""}
               // onChange={(e) => setText(e.target.value)}
               placeholder="Shared link will be here"
               className="w-full max-w-xs h-10 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
            />

            <button
               type="button"
               onClick={() => setSelected("1")} // ✅ No
               className={`w-30 max-w-xs h-10 text-lg font-semibold hover:opacity-90 transition ${getButtonStyle(
                  "1"
               )}`}
            >
               {"kopieren"}
            </button>
         </div>

         {/* Footer */}
         <FooterComponent
            backHref="/food_purchase_location/monthly_spent/owner_info"
            nextHref="/share_link"
            isSubmit
         />
      </form>
   );
}
