"use client";
import { useState, useEffect } from "react";
import HeaderComponent from "@/components/layout/HeaderComponent";
import FooterComponent from "@/components/layout/FooterComponent";

import { langContent } from "@/lib/langContent";

export default function SelectableChoicesComponent({
    progress = 0,
    question = "Ask question",
    back,
    next,
    onAnswer,
    selectedValue = null,
}) {
    const [selected, setSelected] = useState(selectedValue);

    useEffect(() => {
        setSelected(selectedValue);
    }, [selectedValue]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (selected && onAnswer) {
            onAnswer(selected);
        }
        if (next) next();
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
            <div className="text-center mt-10 text-xl font-semibold">
                {typeof question === "string" ? (
                    <p>{question}</p>
                ) : (
                    question.map((line, index) => <p key={index}>{line}</p>)
                )}
            </div>

            {/* Options */}
            <div className="flex flex-col gap-3 max-w-md mx-auto w-full px-4 mt-10">
                {["1", "2", "3", "How ?"].map((opt, idx) => (
                    <button
                        key={idx}
                        type="button"
                        onClick={() => setSelected(opt)}
                        className={`w-full h-14 rounded-lg text-lg font-semibold hover:opacity-90 transition flex items-center justify-center ${getButtonStyle(opt)}`}
                    >
                        {opt}
                    </button>
                ))}
            </div>

            {/* Footer */}
            <FooterComponent onBack={back} isSubmit />
        </form>
    );
}
