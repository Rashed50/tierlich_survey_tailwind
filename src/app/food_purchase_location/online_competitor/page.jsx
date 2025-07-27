"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import HeaderComponent from "@/components/layout/HeaderComponent";
import FooterComponent from "@/components/layout/FooterComponent";
import TextareaInput from "@/components/form/TextareaInput";
import { langContent } from "@/lib/langContent";

export default function SetNumberOfPet() {
   const [selected, setSelected] = useState();
   const [otherText, setOtherText] = useState("");
   const [error, setError] = useState(false);
   const inputRef = useRef(null);
   const router = useRouter();

   const lang = process.env.NEXT_PUBLIC_ACTIVE_LANGUAGE || "DE";
   const t = langContent[lang];

   useEffect(() => {
      if (selected === "andere" && inputRef.current) {
         inputRef.current.scrollIntoView({
            behavior: "smooth",
            block: "center",
         });
      }
   }, [selected]);

   const handleSubmit = (e) => {
      e.preventDefault();
      if (!selected) {
         setError(true);
         return;
      }

      setError(false);
      const selectedValue = selected === "andere" ? otherText : selected;
      console.log("Selected option:", selectedValue);

      // Optional: Save to sessionStorage
      // sessionStorage.setItem("selected_shop", selectedValue);

      router.push("/food_purchase_location/online_competitor/online_pros");
   };

   const handleBack = () => {
      router.push("/food_purchase_location");
   };

   const getButtonStyle = (option) =>
      option === selected
         ? "bg-white text-[#4A3A2D] border-2 border-[#4A3A2D]"
         : "bg-[#4A3A2D] text-white";

   return (
      <form
         onSubmit={handleSubmit}
         className="min-h-screen flex flex-col bg-[#f8f4ee] text-[#4A4A4A] pb-24 overflow-y-auto"
      >
         <HeaderComponent progress={40} />

         {/* Question */}
         <div className="text-center mt-10 px-4 text-xl font-semibold">
            {t.which_online_shop}
         </div>

         {error && (
            <p className="text-red-500 text-center mt-2">
               Bitte wählen Sie eine Option aus
            </p>
         )}

         {/* Options */}
         <div className="flex flex-col gap-4 items-center justify-center mt-10 px-4 mb-4">
            {[
               "Zooplus.de",
               "Fressnapf.de",
               "Zooroyal.de",
               "Bitiba.de",
               "andere",
            ].map((option) => (
               <button
                  key={option}
                  type="button"
                  onClick={() => setSelected(option)}
                  className={`w-full max-w-xs h-10 rounded-xl text-lg font-semibold hover:opacity-90 transition ${getButtonStyle(
                     option
                  )}`}
               >
                  {option}
               </button>
            ))}

            {/* Show textarea if "andere" selected */}
            {selected === "andere" && (
               <div className="mt-4 w-full max-w-xs mx-auto">
                  <TextareaInput
                     value={otherText}
                     onChange={(e) => setOtherText(e.target.value)}
                     placeholder="Bitte geben Sie den Namen ein"
                     required
                     inputRef={inputRef}
                  />
               </div>
            )}
         </div>

         <FooterComponent onBack={handleBack} isSubmit />
      </form>
   );
}
