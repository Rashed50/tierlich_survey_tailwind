import React, { Suspense } from "react";
import SetNumberOfPetClient from "./SetNumberOfPetClient";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SetNumberOfPetClient />
    </Suspense>
  );
}
