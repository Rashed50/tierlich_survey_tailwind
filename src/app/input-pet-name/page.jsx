"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import HeaderComponent from "@/components/layout/HeaderComponent";
import FooterComponent from "@/components/layout/FooterComponent";
import { langContent } from "@/lib/langContent";

export default function SetNumberOfPet() {
   const lang = process.env.NEXT_PUBLIC_ACTIVE_LANGUAGE || "EN";
   const t = langContent[lang];
   const router = useRouter();

   const [petData, setPetData] = useState(null);
   const [petNames, setPetNames] = useState({});
   const [currentPetIndex, setCurrentPetIndex] = useState(0);
   const [currentPetName, setCurrentPetName] = useState("");

   useEffect(() => {
      // Load pet data from sessionStorage
      const storedData = sessionStorage.getItem("pet_number");
      if (storedData) {
         try {
            const parsedData = JSON.parse(storedData);
            setPetData(parsedData);

            // Initialize pet names object
            const namesObj = {};
            if (parsedData.type === "Hund und Katze") {
               for (let i = 0; i < parseInt(parsedData.dog); i++) {
                  namesObj[`dog_${i}`] = "";
               }
               for (let i = 0; i < parseInt(parsedData.cat); i++) {
                  namesObj[`cat_${i}`] = "";
               }
            } else {
               const petType = parsedData.type.toLowerCase();
               for (let i = 0; i < parseInt(parsedData.count); i++) {
                  namesObj[`${petType}_${i}`] = "";
               }
            }
            setPetNames(namesObj);
         } catch (error) {
            console.error("Error parsing pet data:", error);
            router.push("/has_pet/how_many");
         }
      } else {
         router.push("/has_pet/how_many");
      }
   }, [router]);

   const handleBack = () => {
      router.push("/has_pet/how_many");
   };

   const handleSubmit = (e) => {
      e.preventDefault();

      if (!currentPetName.trim()) {
         return;
      }

      const petKeys = Object.keys(petNames);
      const currentKey = petKeys[currentPetIndex];

      // Update the current pet name
      const updatedNames = {
         ...petNames,
         [currentKey]: currentPetName.trim(),
      };
      setPetNames(updatedNames);

      // Move to next pet or finish
      if (currentPetIndex < petKeys.length - 1) {
         setCurrentPetIndex(currentPetIndex + 1);
         setCurrentPetName(updatedNames[petKeys[currentPetIndex + 1]] || "");
      } else {
         // All names collected, save to sessionStorage
         const allPetData = {
            ...petData,
            names: updatedNames,
         };
         sessionStorage.setItem("pet_names", JSON.stringify(allPetData));
         router.push("/food_purchase_location");
      }
   };

   const getCurrentPetType = () => {
      const petKeys = Object.keys(petNames);
      if (currentPetIndex < petKeys.length) {
         const key = petKeys[currentPetIndex];
         if (key.startsWith("dog_")) return "Hund";
         if (key.startsWith("cat_")) return "Katze";
         return petData?.type || "Pet";
      }
      return "Pet";
   };

   const getProgressText = () => {
      const petKeys = Object.keys(petNames);
      if (currentPetIndex < petKeys.length) {
         // return `Enter name for ${getCurrentPetType()} ${currentPetIndex + 1} of ${petKeys.length}`;
         return `Enter name for ${currentPetIndex + 1} of ${petKeys.length}`;
      }
      return "All pet names collected";
   };

   return (
      <form
         onSubmit={handleSubmit}
         className="min-h-screen flex flex-col bg-[#f8f4ee] text-[#4A4A4A]"
      >
         <HeaderComponent
            progress={Math.floor(
               ((currentPetIndex + 1) / Object.keys(petNames).length) * 100
            )}
         />

         {/* Progress Text */}
         <div className="text-center mt-4 text-sm text-gray-600">
            {getProgressText()}
         </div>

         {/* Question Text */}
         <div className="text-center mt-6 text-xl font-semibold px-4">
            {`Enter name for your ${getCurrentPetType()}`}
         </div>

         {/* Input Field */}
         <div className="max-w-md mx-auto w-full px-4 mt-6">
            <div className="flex gap-2">
               <input
                  type="text"
                  value={currentPetName}
                  onChange={(e) => setCurrentPetName(e.target.value)}
                  placeholder={`${getCurrentPetType()} name`}
                  className="flex-1 h-12 px-4 rounded-lg border border-[#4A3A2D] focus:outline-none focus:ring-2 focus:ring-[#4A3A2D]"
                  required
               />
            </div>
         </div>

         {/* Footer */}
         <FooterComponent
            onBack={handleBack}
            isSubmit={currentPetName.trim().length > 0}
            nextText={
               currentPetIndex < Object.keys(petNames).length - 1
                  ? "Next"
                  : "Finish"
            }
         />
      </form>
   );
}
