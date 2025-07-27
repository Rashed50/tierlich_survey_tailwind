import React, { Suspense } from "react";
import SetNumberOfPetComponent from "@/components/pages/SetNumberOfPetComponent";

const page = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <SetNumberOfPetComponent />
        </Suspense>
    );
};

export default page;
