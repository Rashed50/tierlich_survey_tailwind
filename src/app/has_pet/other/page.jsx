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

export default function HasNotPet() {
   const [selected, setSelected] = useState(null);
   const [query, setQuery] = useState("");
   const [error, setError] = useState(false);  // ← Add error state
   const router = useRouter();

   const lang = process.env.NEXT_PUBLIC_ACTIVE_LANGUAGE || "DE";
   const t = langContent[lang];

   const handleSubmit = (e) => {
      e.preventDefault();

      if (!selected) {
         setError(true);   // ← Show error if nothing selected
         return;
      }

      setError(false);  // ← Clear error if selected

      sessionStorage.setItem("other_pet", selected);
      router.push("/food_purchase_location");
   };

   const handleBack = () => {
      router.push("/has_pet");
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

         <div className="text-center mt-10 px-4 text-xl font-semibold">
            {t.qs_other_pet || "Was für ein anderes Tier haben Sie?"}
         </div>

         {/* Error message */}
         {error && (
            <p className="text-red-500 text-center mb-2">
               Bitte wählen Sie eine Option aus
            </p>
         )}

         {/* Select Dropdown */}
         <div className="mt-10 px-6 max-w-xs mx-auto w-full">
            <Listbox
               value={selected}
               onChange={(value) => {
                  setSelected(value);
                  setError(false); // Clear error on new selection
               }}
            >
               <div className="relative mt-1">
                  <Listbox.Button className="relative w-full cursor-default rounded-md bg-[#8A7B70] py-3 pl-4 pr-12 text-left text-white text-lg font-semibold focus:outline-none flex items-center">
                     <span className="block truncate flex-grow">
                        {selected || "Bitte auswählen"}
                     </span>

                     {/* Container for both icons */}
                     <div className="flex items-center space-x-2 absolute right-3 top-1/2 -translate-y-1/2">
                        {/* X Icon to clear selection */}
                        {selected && (
                           <button
                              type="button"
                              aria-label="Clear selection"
                              onClick={(e) => {
                                 e.stopPropagation();
                                 setSelected(null);
                                 setQuery("");
                              }}
                              className="text-white hover:text-gray-300 focus:outline-none"
                           >
                              <XMarkIcon className="h-5 w-5" />
                           </button>
                        )}

                        {/* Dropdown Chevron */}
                        <ChevronUpDownIcon
                           className="h-5 w-5 text-white"
                           aria-hidden="true"
                        />
                     </div>
                  </Listbox.Button>

                  <Transition
                     as={Fragment}
                     leave="transition ease-in duration-100"
                     leaveFrom="opacity-100"
                     leaveTo="opacity-0"
                  >
                     <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-xl bg-white py-1 text-base shadow-lg ring-1 ring-black/10 focus:outline-none sm:text-sm z-50">
                        <div className="px-2 py-1">
                           <input
                              type="text"
                              placeholder="Suchen..."
                              value={query}
                              onChange={(e) => setQuery(e.target.value)}
                              className="w-full px-3 py-1.5 rounded-md border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#4A3A2D]"
                           />
                        </div>
                        {filteredOptions.length === 0 && (
                           <div className="px-4 py-2 text-gray-500">
                              Keine Optionen gefunden.
                           </div>
                        )}
                        {filteredOptions.map((item, idx) => (
                           <Listbox.Option
                              key={idx}
                              className={({ active }) =>
                                 `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                    active
                                       ? "bg-[#eee] text-[#4A3A2D]"
                                       : "text-gray-900"
                                 }`
                              }
                              value={item}
                           >
                              {({ selected }) => (
                                 <>
                                    <span
                                       className={`block truncate ${
                                          selected ? "font-medium" : "font-normal"
                                       }`}
                                    >
                                       {item}
                                    </span>
                                    {selected && (
                                       <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-[#4A3A2D]">
                                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                       </span>
                                    )}
                                 </>
                              )}
                           </Listbox.Option>
                        ))}
                     </Listbox.Options>
                  </Transition>
               </div>
            </Listbox>
         </div>

         <FooterComponent onBack={handleBack} isSubmit />
      </form>
   );
}
