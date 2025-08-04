// "use client";
// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import HeaderComponent from "@/components/layout/HeaderComponent";
// import FooterComponent from "@/components/layout/FooterComponent";
// import { langContent } from "@/lib/langContent";

// export default function SetNumberOfPet() {
//    const [selected, setSelected] = useState();
//    const [error, setError] = useState(false);
//    const router = useRouter();

//    const lang = process.env.NEXT_PUBLIC_ACTIVE_LANGUAGE || "DE";
//    const t = langContent[lang];

//    // Begining of Home page set all session value
//    useEffect(() => {
//       // This runs only in the browser
//      // const storedValue = sessionStorage.getItem("number_of_pets");
      
//    }, []);

//    const handleSubmit = (e) => {
//       e.preventDefault();
//       if (!selected) {
//          setError(true);
//          return;
//       }
// //router.push("/has_pet/other");
//       router.push("/food_purchase_location");
//       return;
//    };

//    const handleBack = () => {
//       router.push("/has_pet/other");
//    };

//    const getButtonStyle = (option) =>
//       option === selected
//          ? "bg-white text-[#4A3A2D] border-2 border-[#4A3A2D]"
//          : "bg-[#4A3A2D] text-white";

//    return (
//       <form
//          onSubmit={handleSubmit}
//          className="min-h-screen flex flex-col bg-[#f8f4ee] text-[#4A4A4A]"
//       >
//          <HeaderComponent progress={10} />

//          {/* Answer Buttons */}
//          <div className="flex flex-col gap-2 items-center justify-center mt-10 px-4">
//             {error && (
//                <p className="text-red-500 mb-2">
//                   Bitte wählen Sie eine Option aus
//                </p>
//             )}

//             <div className="flex flex-col gap-1 items-center justify-center mt-10 px-4">
//                <p className="text-black-500 mb-2">Wie heißt es?</p>
//                <input
//                   type="text"
//                   // value={""}
//                   // onChange={(e) => setText(e.target.value)}
//                   placeholder="Enter Ihr Name"
//                   className="w-full max-w-xs h-10 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
//                />
//             </div>
            
//          </div>

//          {/* Footer */}
//          <FooterComponent onBack={handleBack} isSubmit    />
//       </form>
//    );
// }
"use client";
import { useState, Fragment } from "react";
import { useRouter } from "next/navigation";
import { Listbox, Transition } from "@headlessui/react";
import { ChevronUpDownIcon, CheckIcon, XMarkIcon } from "@heroicons/react/24/solid";
import HeaderComponent from "@/components/layout/HeaderComponent";
import FooterComponent from "@/components/layout/FooterComponent";
import { langContent } from "@/lib/langContent";

const options = [
   "Kleintier",
   "Fisch",
   "Vogel",
   "Pferd",
   "Reptil",
   "Sonstige",
];

export default function HasDifferentPet() {
   const [selected, setSelected] = useState(null);
   const [query, setQuery] = useState("");
   const [error, setError] = useState(false);  // ← Add error state
   const [pet_name, setPetName] = useState(null);
   const router = useRouter();

   const lang = process.env.NEXT_PUBLIC_ACTIVE_LANGUAGE || "DE";
   const t = langContent[lang];

   const handleSubmit = (e) => {
      e.preventDefault();

 
      if (pet_name == "" || pet_name == null || pet_name == undefined) {
         setError(true);   // ← Show error if nothing selected
         return;
      }

      setError(false);  // ← Clear error if selected

      //sessionStorage.setItem("other_pet", selected);
      router.push("/food_purchase_location");
   };

   const handleBack = () => {
      router.push("/has_pet/other");
   };

   const filteredOptions =
      query === ""
         ? options
         : options.filter((item) =>
              item.toLowerCase().includes(query.toLowerCase())
           );

   return (
      <form
         onSubmit={handleSubmit}
         className="min-h-screen flex flex-col bg-[#f8f4ee] text-[#4A4A4A] pb-24"
      >
         <HeaderComponent progress={10} />

         {/* Answer Buttons */}
          <div className="flex flex-col gap-2 items-center justify-center mt-10 px-4">
             {error && (
               <p className="text-red-500 mb-2">
                  Bitte wählen Sie eine Option aus
               </p>
            )}

            <div className="flex flex-col gap-1 items-center justify-center mt-10 px-4">
               <p className="text-black-500 mb-2">Wie heißt es?</p>
               <input
                  type="text"
                  // value={""}
                   onChange={(e) => setPetName(e.target.value)}
                  placeholder="Enter Ihr Name"
                  className="w-full max-w-xs h-10 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
               />
            </div>
            
         </div>

          

         <FooterComponent onBack={handleBack}  isSubmit />
      </form>
   );
}

