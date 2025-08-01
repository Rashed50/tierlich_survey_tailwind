import React, { Suspense } from "react";
import MonthlySpentClient from "./MonthlySpentClient";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MonthlySpentClient />
    </Suspense>
  );
}
